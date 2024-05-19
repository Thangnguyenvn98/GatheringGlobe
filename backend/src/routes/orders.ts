import Stripe from "stripe";
import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Event from "../models/event";
import Order, { OrderType } from "../models/order";
import User from "../models/user";
import Ticket from "../models/ticket";
import mongoose from "mongoose";

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
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
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
        });
      }

      await Promise.all(ticketUpdates);
      const newOrder = new Order(order);
      await newOrder.save();

      res.status(201).json(newOrder._id);
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
      .populate({
        path: "events.eventId",
        model: "Event",
        select: "title imageUrls startTime endTime", // Fields we want to populate to get
      })
      .populate({
        path: "events.tickets.ticketId",
        model: "Ticket",
        select: "type price", 
      });
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
    const response = {
      order,
      paymentMethod: {
        id: paymentMethod.id,
        brand: paymentMethod.card.brand,
        exp_month: paymentMethod.card.exp_month,
        exp_year: paymentMethod.card.exp_year,
        last4: paymentMethod.card.last4,
      },
      billing_details: {
        address: paymentMethod.billing_details.address,
      },
      created: paymentIntent.created,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Failed to fetch order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
