import Stripe from "stripe"
import express, {Request, Response} from "express";
import verifyToken from "../middleware/auth";
import { ParamSchema, validationResult } from "express-validator";
import Order from "../models/order"
import { BookingType } from "../shared/types";

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
});

router.post("/:ticketId/bookings", verifyToken,async (req: Request, res: Response) => {
    try {
        const paymentIntentId = req.body.paymentIntentId;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);

        if(!paymentIntent) {
            return res.status(500).json({message: "Payment intent not found"});
        }
        if (paymentIntent.metadata.ticketId !== req.params.ticketId ||
            paymentIntent.metadata.userId !== req.userId) {
                return res.status(400).json({message: "Payment Intent Mismatch"});
            }

            if(paymentIntent.status !== "succeeded") {
                return res.status(400).json({message: `Payment intent not succeeded. Status: ${paymentIntent.status},
                `})
            }

            const newBooking: BookingType = {
                ...req.body, userId: req.userId,
            };

            const ticket = await Order.findOneAndUpdate({_id: req.params.ticketId},
                {$push: {bookings: newBooking}});
            
            if (!ticket) {
                return res.status(400).json({message: "Hotel not found"}); 
            }

            await ticket.save();
            res.status(200).send()


    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"});
    }
    
})

