import Stripe from "stripe"
import express, {Request, Response} from "express";
import verifyToken from "../middleware/auth";
import Event from "../models/event";
import User from "../models/user";
import Ticket from "../models/ticket";

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
      paymentIntentId?: string;
    };
  }

  interface CartCheckoutConfirm extends Request {
    body: {
      paymentIntentId: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }




const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

const router = express.Router()


router.post("/bookings/payment-intent", verifyToken, async (req: CartRequest, res: Response) => {
  console.log("-----------------")
  console.log("Payment intent CREATINGGGGGG RUNNINGGGGGGGG")
  console.log("-----------------")
  const { cartItems, paymentIntentId } = req.body;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "No cart items provided." });
  }

  try {
      const user = await User.findById(req.userId);
      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }
      const eventIds = cartItems.map((item) => item.eventId);
    const events = await Event.find({ _id: { $in: eventIds } });

    if (events.length !== eventIds.length) {
      return res.status(404).json({ error: "One or more events not found." });
    }

    const eventMap = new Map(events.map((event) => [event._id.toString(), event]));

    let totalPrice = 0;
    const allTicketsDetails = [];

    for (const cartItem of cartItems) {
      const { eventId, tickets } = cartItem;
      const event = eventMap.get(eventId);

      if (!event) {
        return res.status(404).json({ error: `Event ${eventId} not found.` });
      }

      const ticketIds = Object.keys(tickets);
      const ticketDocs = await Ticket.find({ _id: { $in: ticketIds } });

      if (ticketDocs.length !== ticketIds.length) {
        return res.status(404).json({ error: "One or more tickets not found." });
      }

      const ticketMap = new Map(ticketDocs.map((ticket) => [ticket._id.toString(), ticket]));

      for (const [ticketId, { quantity }] of Object.entries(tickets)) {
        if (quantity <= 0) {
          return res.status(400).json({ error: `Invalid quantity for ticket ${ticketId}.` });
        }

        const ticket = ticketMap.get(ticketId);

        if (!ticket) {
          return res.status(404).json({ error: `Ticket ${ticketId} not found.` });
        }

        if (ticket.quantityAvailable < quantity) {
          return res.status(400).json({ error: `Not enough tickets available for ${ticketId}.` });
        }

        totalPrice += ticket.price * quantity;
        allTicketsDetails.push({ eventId, ticketId, quantity });
      }
    }

    totalPrice = Math.round(totalPrice * 100); // Convert to cents and round to the nearest integer

      let paymentIntent;
      if (paymentIntentId) {
        // Retrieve existing PaymentIntent
        paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.amount !== totalPrice) {
          // Update the PaymentIntent amount if different
          paymentIntent = await stripe.paymentIntents.update(paymentIntentId, { amount: totalPrice });
        }
      } else {
        // Create a new PaymentIntent if no ID is provided
        paymentIntent = await stripe.paymentIntents.create({
          amount: totalPrice, // Convert to cents
          currency: "usd",
          metadata: {
            userId: req.userId,
            allTicketsDetails: JSON.stringify(allTicketsDetails),
          },
        });
      }
  
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

export default router
