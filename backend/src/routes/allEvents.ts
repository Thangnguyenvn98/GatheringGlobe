import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import User from "../models/user";
import Event, { EventType } from "../models/event"; // this is the model <-------
import Ticket from "../models/ticket";
import mongoose from "mongoose";

const router = express.Router();
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({ message: "User not exists!" });
    }

    // const events = await Event.find({ organizerId: req.userId });
    const events = await Event.find({ organizerId: user._id })
      .populate("tickets")
      .exec();

    if (!events) {
      return res.status(400).json({ message: "Events not exist!" });
    }

    // for (const event of events) {
    //   const tickets = await Ticket.find({ eventId: event._id });

    //   event.tickets = tickets.map((ticket) => ticket._id);
    // }

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Failed to pull all events due to internal server error",
    });
  }
});
export default router;
