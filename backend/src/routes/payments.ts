import Stripe from "stripe"
import express, {Request, Response} from "express";
import verifyToken from "../middleware/auth";
import { ParamSchema, validationResult } from "express-validator";
import { BookingType } from "../shared/types";
import Event from "../models/event";
import Order, { OrderType } from "../models/order";
import User from "../models/user";
import Ticket from "../models/ticket";
import mongoose from "mongoose";

interface Ticket {
    ticketType: string;
    quantity: number;
    price: number;
  }
  
  interface CartItem {
    eventId: string;
    eventName: string;
    tickets: {
      [ticketId: string]: Ticket;
    };
  }
  
  interface CartRequest extends Request {
    body: {
      cartItems: CartItem[];
    };
  }


const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

const router = express.Router()


router.post("/bookings/payment-intent", verifyToken, async (req: CartRequest, res: Response) => {
    const { cartItems } = req.body;
  
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "No cart items provided." });
    }
  
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      let totalPrice = 0;
      const allTicketsDetails = [];
  
      for (const cartItem of cartItems) {
        const { eventId, tickets } = cartItem;
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ message: `Event ${eventId} not found.` });
        }
  
        for (const [ticketId, { quantity, price }] of Object.entries(tickets)) {
          const ticket = await Ticket.findById(ticketId);
          if (!ticket) {
            return res.status(404).json({ message: `Ticket ${ticketId} not found.` });
          }
          if (ticket.quantityAvailable < quantity) {
            return res.status(400).json({ message: `Not enough tickets available for ${ticketId}.` });
          }
          totalPrice += price * quantity;
          allTicketsDetails.push({ eventId, ticketId, quantity });
        }
      }
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice * 100, // Convert to cents
        currency: "usd",
        metadata: {
          userId: req.userId,
          allTicketsDetails: JSON.stringify(allTicketsDetails),
        },
      });
  
      if (!paymentIntent.client_secret) {
        return res.status(500).json({ message: "Error creating payment intent" });
      }
  
      res.send({
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        totalPrice,
        allTicketsDetails,
      });
    } catch (error) {
      console.error("Failed to create payment intent:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  

//   router.post("/bookings", verifyToken, async (req: CartRequest, res: Response) => {
//     const { paymentIntentId, allTicketsDetails } = req.body;
  
//     try {
//       const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
//       if (!paymentIntent) {
//         return res.status(400).json({ message: "Payment intent not found" });
//       }
//       if (paymentIntent.metadata.userId !== req.userId) {
//         return res.status(400).json({ message: "Payment Intent Mismatch" });
//       }
//       if (paymentIntent.status !== "succeeded") {
//         return res.status(400).json({ message: `Payment intent not succeeded. Status: ${paymentIntent.status}` });
//       }
  
//       const order = {
//         userId: new mongoose.Types.ObjectId(req.userId),
//         events: [],
//         totalPrice: paymentIntent.amount / 100,
//         paymentStatus: "completed",
//       };
  
//       const ticketUpdates = [];
  
//       for (const ticketDetail of allTicketsDetails) {
//         const { eventId, ticketId, quantity } = ticketDetail;
  
//         const ticket = await Ticket.findById(new mongoose.Types.ObjectId(ticketId));
//         if (!ticket) {
//           return res.status(404).json({ message: `Ticket ${ticketId} not found.` });
//         }
//         if (ticket.quantityAvailable < quantity) {
//           return res.status(400).json({ message: `Not enough tickets available for ${ticketId}.` });
//         }
  
//         ticket.quantityAvailable -= quantity;
//         ticketUpdates.push(ticket.save());
  
//         let eventOrder = order.events.find(event => event.eventId.toString() === eventId);
//         if (!eventOrder) {
//           eventOrder = {
//             eventId: new mongoose.Types.ObjectId(eventId),
//             tickets: [],
//           };
//           order.events.push(eventOrder);
//         }
//         eventOrder.tickets.push({ ticketId: new mongoose.Types.ObjectId(ticketId), quantity });
//       }
  
//       await Promise.all(ticketUpdates);
//       const newOrder = new Order(order);
//       await newOrder.save();
  
//       res.status(201).json({ message: "Order created successfully", order: newOrder });
//     } catch (error) {
//       console.error("Failed to create order:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   });
  

export default router
