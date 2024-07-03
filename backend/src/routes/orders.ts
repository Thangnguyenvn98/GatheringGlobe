import { joinLocation } from "./../utils/joinLocation";
import Stripe from "stripe";
import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Order, { OrderType } from "../models/order";
import User from "../models/user";
import Ticket from "../models/ticket";
import mongoose from "mongoose";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import createPDF, { OrderData } from "../utils/pdf/PdfDocument";
import fs from "fs";
import DiscountApplication from "../models/discountTicketOrder";
import { OrderDetailsResponse } from "../types/orderDetailsResponse";
import Discount from "../models/discount";
import { useTicket } from "../utils/useTicket";
import Event from "../models/event";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.post(
  "/create-order",
  verifyToken,
  async (req: Request, res: Response) => {
    const { paymentIntentId, firstName, lastName, email } = req.body;
    if (!paymentIntentId || !firstName || !lastName || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    try {
      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);
      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment intent not found" });
      }
      if (paymentIntent.metadata.userId !== req.userId) {
        return res.status(400).json({ message: "Payment Intent Mismatch" });
      }
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
        });
      }
      const paymentMethodId =
        typeof paymentIntent.payment_method === "string"
          ? paymentIntent.payment_method
          : paymentIntent.payment_method?.id;
      if (!paymentMethodId) {
        return res.status(400).json({ message: "Payment ID is required" });
      }
      const order: OrderType = {
        _id: new mongoose.Types.ObjectId().toString(),
        userId: new mongoose.Types.ObjectId(req.userId),
        events: [],
        totalPrice: paymentIntent.amount / 100,
        paymentStatus: "completed",
        firstName,
        lastName,
        email,
        paymentMethodId,
        paymentIntentId: paymentIntent.id,
      };

      const ticketUpdates = [];
      const ticketQRCodeDataList = [];

      for (const ticketDetail of JSON.parse(
        paymentIntent.metadata.allTicketsDetails
      )) {
        const { eventId, ticketId, quantity } = ticketDetail;

        const ticket = await Ticket.findById(
          mongoose.Types.ObjectId.createFromHexString(ticketId)
        );
        if (!ticket) {
          return res
            .status(404)
            .json({ message: `Ticket ${ticketId} not found.` });
        }
        if (ticket.quantityAvailable < quantity) {
          return res
            .status(400)
            .json({ message: `Not enough tickets available for ${ticketId}.` });
        }

        ticket.quantityAvailable -= quantity;
        ticketUpdates.push(ticket.save());

        let eventOrder = order.events.find(
          (event) => event.eventId.toString() === eventId
        );
        if (!eventOrder) {
          eventOrder = {
            eventId: mongoose.Types.ObjectId.createFromHexString(eventId),
            tickets: [],
          };
          order.events.push(eventOrder);
        }
        eventOrder.tickets.push({
          ticketId: mongoose.Types.ObjectId.createFromHexString(ticketId),
          quantity,
          ticketUsed: [],
        });
        // Generate QR code data for each ticket
        for (let i = 0; i < quantity; i++) {
          const qrCodeData = {
            orderId: order._id.toString(),
            eventId: eventId,
            ticketId: ticketId,
            index: i + 1, // To differentiate multiple tickets
          };
          const qrCodeString = JSON.stringify(qrCodeData);
          console.log(qrCodeString);
          const qrCodeBase64 = await QRCode.toDataURL(qrCodeString);
          ticketQRCodeDataList.push({
            eventId,
            ticketId,
            qrCodeBase64,
            index: i + 1,
          });
        }
      }
      console.log(ticketQRCodeDataList);

      await Promise.all(ticketUpdates);
      const newOrder = new Order(order);
      await newOrder.save();

      const populatedOrder = await Order.findById(newOrder._id)
        .select("-events._id -events.tickets._id")
        .populate({
          path: "events.eventId",
          model: "Event",
          select: "title imageUrls location startTime endTime", // Fields we want to populate to get
        })
        .populate({
          path: "events.tickets.ticketId",
          model: "Ticket",
          select: "type price",
        })
        .exec();

      if (!populatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      const orderObject = populatedOrder.toObject() as OrderData;

      const completeOrderData = {
        orderData: {
          _id: orderObject._id.toString(),
          events: orderObject.events.map((event) => ({
            eventId: {
              _id: event.eventId._id.toString(),
              title: event.eventId.title,
              startTime: event.eventId.startTime,
              endTime: event.eventId.endTime,
              location: event.eventId.location,
              imageUrls: event.eventId.imageUrls,
            },
            tickets: event.tickets.map((ticket) => ({
              ticketId: {
                _id: ticket.ticketId._id.toString(),
                type: ticket.ticketId.type,
                price: ticket.ticketId.price,
              },
              quantity: ticket.quantity,
            })),
          })),
          totalPrice: orderObject.totalPrice,
          firstName: orderObject.firstName,
          lastName: orderObject.lastName,
          email: orderObject.email,
          createdAt: orderObject.createdAt,
          qrCodes: ticketQRCodeDataList, // Add QR codes list
        },
      };

      const discountApplication = await DiscountApplication.findOne({
        paymentIntentId: order.paymentIntentId,
      });

      if (discountApplication) {
        completeOrderData.orderData.events =
          completeOrderData.orderData.events.map((event) => {
            return {
              ...event,
              tickets: event.tickets.map((ticket) => {
                // Find the discount for this specific ticket if it exists
                const discount = discountApplication.discountedTickets.find(
                  (dt) =>
                    dt.eventId.toString() === event.eventId._id.toString() &&
                    dt.ticketId.toString() === ticket.ticketId._id.toString()
                );

                // If a discount is found, update the ticket price; otherwise, leave it as is
                if (discount) {
                  return {
                    ...ticket,
                    ticketId: {
                      ...ticket.ticketId,
                      originalPrice: discount.originalPrice,
                      price: discount.newPrice, // updating to the new discounted price
                      discountCode: discount.discountCode,
                    },
                  };
                } else {
                  return ticket;
                }
              }),
            };
          });
      }

      const filePath = `${__dirname}/ticket.pdf`;

      const result = await createPDF(completeOrderData, filePath);

      // Send email with QR code
      const transporter = nodemailer.createTransport({
        host: "smtp.mailersend.net",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: orderObject.email,
        subject: "Your Ticket",
        html: `<p>Dear ${orderObject.firstName} ${orderObject.lastName},</p>
               <p>Thank you for your order. Here is your ticket:</p>
               <p>Order ID: ${orderObject._id}</p>
               `,
        attachments: [
          {
            filename: "Tickets.pdf",
            path: filePath,
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      fs.unlinkSync(filePath);

      res.status(201).json(orderObject._id);
    } catch (error) {
      console.error("Failed to create order:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  try {
    const order = await Order.findById(id)
      .select("-events._id -events.tickets._id")
      .populate({
        path: "events.eventId",
        model: "Event",
        select: "title imageUrls startTime endTime organizerID",
        populate: {
          path: "organizerId",
          model: "User",
          select: "username email",
        },
      })
      .populate({
        path: "events.tickets.ticketId",
        model: "Ticket",
        select: "type price",
      })
      .exec();
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      order.paymentIntentId
    );
    if (!paymentIntent) {
      return res.status(404).json({ message: "Payment intent not found" });
    }
    const paymentMethod = await stripe.paymentMethods.retrieve(
      order.paymentMethodId
    );
    if (!paymentMethod) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    if (!paymentMethod.card) {
      return res
        .status(400)
        .json({ message: "Payment method does not contain card details" });
    }
    let response: OrderDetailsResponse = {
      order: order.toObject(),
      paymentMethod: {
        id: paymentMethod.id,
        brand: paymentMethod.card.brand,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year,
        last4: paymentMethod.card.last4,
      },
      billing_details: {
        address: paymentMethod.billing_details.address || {
          city: null,
          country: null,
          line1: null,
          line2: null,
          postal_code: null,
          state: null,
        },
      },
      created: paymentIntent.created,
      discountedTickets: [],
    };

    const discountApplication = await DiscountApplication.findOne({
      paymentIntentId: order.paymentIntentId,
    });

    if (discountApplication) {
      const discountedTickets = discountApplication.discountedTickets.map(
        (discount) => ({
          eventId: discount.eventId.toString(),
          ticketId: discount.ticketId.toString(),
          originalPrice: discount.originalPrice,
          discountPerTicket: discount.discountPerTicket,
          newPrice: discount.newPrice,
          quantity: discount.quantity,
          discountCode: discount.discountCode,
        })
      );
      for (const discount of discountedTickets) {
        const discountObject = await Discount.findOne({
          code: discount.discountCode,
          ticketId: discount.ticketId,
          eventId: discount.eventId,
        });
        if (discountObject) {
          const usedCount = discount.quantity;
          discountObject.usedCount += usedCount;
          await discountObject.save();
        }
      }
      response = {
        ...response,
        discountedTickets: discountedTickets,
      };
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Failed to fetch order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const totalOrders = await Order.countDocuments({ userId: req.userId });

    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select("-paymentIntentId -paymentMethodId -updatedAt -__v")
      .skip(skip)
      .limit(limit)
      .populate({
        path: "events.eventId",
        model: "Event",
        select: "title imageUrls startTime", // Fields we want to populate to get
      })
      .populate({
        path: "events.tickets.ticketId",
        model: "Ticket",
        select: "type ",
      })
      .exec();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      pagination: {
        totalOrders,
        page,
        totalPages,
        limit,
      },
      orders,
    });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/order-by-qr/:qrCodeId/event/:eventId",
  verifyToken,
  async (req: Request, res: Response) => {
    const { qrCodeId, eventId } = req.params;
    try {
      const order = await Order.findById(qrCodeId);
      const eventIdOrganize = await Event.findById(eventId);
      if (!order) {
        return res
          .status(404)
          .json({ message: "Order not found or payment is not completed." });
      }
      if (!eventIdOrganize) {
        return res.status(404).json({ message: "There is no organizer" });
      }
      if (eventId !== eventIdOrganize._id.toString()) {
        return res
          .status(403)
          .json({ message: "The organizer does not have this event" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order by QR code:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Route to update ticket quantity for a specific order
router.post(
  "/update-ticket-used",
  verifyToken,
  async (req: Request, res: Response) => {
    const { orderId, eventId, ticketId, index } = req.body;

    if (!eventId || !ticketId || index === undefined) {
      return res.status(400).json({
        message: "Missing required fields: eventId, ticketId, or quantity",
      });
    }

    try {
      // Find the order by ID
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const usedSuccessfully = await useTicket(
        orderId,
        ticketId,
        index as number
      );
      if (!usedSuccessfully) {
        return res.status(400).json({ message: "Ticket already used" });
      }
      res.status(200).json({ message: "Ticket is verified!" });
    } catch (error) {
      console.error("Failed to update ticket quantity:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
