import Stripe from "stripe"
import express, {Request, Response} from "express";
import verifyToken from "../middleware/auth";
import { ParamSchema, validationResult } from "express-validator";
import Order from "../models/order"

const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

const router = express.Router()


router.post("/:ticketId/bookings/payment-intent", verifyToken,async (req: Request, res: Response) => {
    // 1. totalPrice
    // 2. tickets (ticketId, quantity)
    // 3. userId
    const {numberOfTickets} = req.body;
    const ticketId = req.params.ticketId;

    const order = await Order.findById(ticketId);
    if (!order) {
        return res.status(400).json({message: "Order not found"});
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: order.totalPrice,
        currency: "usd",
        metadata: {
            ticketId,
            userId: req.userId,
        },
    });

    if (!paymentIntent.client_secret) {
        return res.status(500).json({message: "Error creating payment intent"});
    }

    const response = {
        paymentIntent: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalPrice: order.totalPrice,
    };
    res.send(response);

    


    
})

