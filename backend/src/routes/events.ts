import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import User from "../models/user";
import Event, { EventType } from "../models/event"; // this is the model <-------
import Ticket from "../models/ticket";
import mongoose from "mongoose";
import Discount, { DiscountType } from "../models/discount";
import { joinLocation } from "../utils/joinLocation";

const router = express.Router();

router.post("/test", verifyToken, async (req: Request, res: Response) => {
  res.status(200).json({ message: "Test successful" });
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const now = new Date(); // Gets the current date and time
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Define an aggregation pipeline to find and process events
    const pipeline: mongoose.PipelineStage[] = [
      { $match: { startTime: { $gte: now } } },
      { $sort: { startTime: 1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "eventId",
          as: "tickets",
        },
      },
      { $unwind: "$tickets" },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          description: { $first: "$description" },
          startTime: { $first: "$startTime" },
          endTime: { $first: "$endTime" },
          venueId: { $first: "$venueId" },
          capacity: { $first: "$capacity" },
          postalCode: { $first: "$postalCode" },
          organizerId: { $first: "$organizerId" },
          location: { $first: "$location" },
          category: { $first: "$category" },
          eventType: { $first: "$eventType" },
          artistName: { $first: "$artistName" },
          imageUrls: { $first: "$imageUrls" },
          roomChatLink: { $first: "$roomChatLink" },
          minPrice: { $min: "$tickets.price" },
        },
      },
    ];

    const events = await Event.aggregate(pipeline);

    // Count total documents for pagination metadata
    const total = await Event.countDocuments({ startTime: { $gte: now } });

    res.status(200).json({
      events,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res
      .status(500)
      .json({ message: "Internal server error, unable to fetch events." });
  }
});

router.post("/", verifyToken, async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(400).json({ message: "User does not exists!" });
  }

  const {
    title,
    description,
    startTime,
    endTime,
    venueId,
    capacity,
    location,
    category,
    eventType,
    artistName,
    imageUrls,
    roomChatLink,
  } = req.body;

  if (
    !title ||
    !description ||
    !startTime ||
    !endTime ||
    !endTime ||
    !location ||
    !category ||
    !eventType ||
    !imageUrls
  ) {
    return res.status(400).json({
      message:
        "Missing required fields: Ensure all fields including title, description, start time, end time, location, category, artist name, image URLs are provided.",
    });
  }
  const existingEvent = await Event.findOne({ title, startTime, location });
  if (existingEvent) {
    return res.status(400).json({
      message:
        "An event with the same title, start time and location already exists!",
    });
  }
  const fullAddress = joinLocation(location);
  const event = new Event({
    title,
    description,
    startTime,
    endTime,
    venueId: venueId ? new mongoose.Types.ObjectId(venueId) : undefined,
    capacity,
    organizerId: user._id,
    location: {
      ...location,
      fullAddress,
    },
    category,
    eventType,
    artistName: artistName ? artistName : undefined,
    imageUrls,
    roomChatLink,
  });
  try {
    await event.save();
    return res.status(200).json(event);
  } catch (error) {
    console.error("Failed to create event:", error);
    return res
      .status(500)
      .json({ message: "Failed to create event due to an internal error" });
  }
});

router.post(
  "/:eventId/tickets",
  verifyToken,
  async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const { tickets } = req.body;

    if (!Array.isArray(tickets) || tickets.length === 0) {
      return res.status(400).json({
        message: "Missing required ticket details or tickets array is empty.",
      });
    }

    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found." });
      }

      for (const ticketData of tickets) {
        const { type, price, quantityAvailable, seatNumber, discount } =
          ticketData;

        if (!type || price == null || quantityAvailable == null) {
          return res
            .status(400)
            .json({ message: "Missing required ticket details." });
        }
        const isFree = price === 0 || price === 0.0 || price === 0.0;
        const ticket = new Ticket({
          eventId,
          status: "active",
          type,
          price,
          quantityAvailable,
          seatNumber,
          isFree,
        });

        await ticket.save();
        event.tickets.push(ticket._id);

        if (discount) {
          const {
            code,
            discount: amount,
            type,
            validUntil,
            usageLimit,
          } = discount;
          if (!code || !amount || !validUntil || !usageLimit) {
            return res
              .status(400)
              .json({ message: "Missing required discount details." });
          }
          let discountData: DiscountType = {
            eventId: new mongoose.Types.ObjectId(event._id),
            ticketId: ticket._id,
            code,
            validUntil,
            isActive: true,
            usageLimit,
            usedCount: 0,
          };
          if (type === "percentage") {
            discountData = { ...discountData, percentage: amount };
          } else if (type === "number") {
            discountData = { ...discountData, number: amount };
          }

          const createdDiscount = new Discount(discountData);
          await createdDiscount.save();
        }
      }

      await event.save();

      return res.status(201).json({
        message: "Tickets created successfully",
      });
    } catch (error) {
      console.error("Failed to create tickets:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete(
  "/:ticketId/deleteTicket",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const ticket = await Ticket.findById(req.query.ticketId);
      if (!ticket) {
        return res.status(404).send({ message: "Ticket not found" });
      }
      const event = await Event.findOneAndUpdate(
        { _id: ticket.eventId, organizerId: userId },
        { $pull: { tickets: req.query.ticketId } },
        { new: true } // Return the updated document
      );
      if (!event) {
        return res.status(404).send({
          message: "Event of this ticket not found/not created by this user",
        });
      }
      await Ticket.findByIdAndDelete(req.query.ticketId);
      res
        .status(200)
        .json({ message: "Ticket deleted successfully", deleted: ticket });
    } catch (error) {
      console.log("Fail to delete ticket", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);
router.delete(
  "/:eventId/deleteEvent",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const { eventId } = req.params; // Extract eventId from params
      console.log(eventId);
      // Find and delete the event
      const event = await Event.findOneAndDelete({
        organizerId: userId,
        _id: eventId,
      });

      if (!event) {
        return res
          .status(404)
          .json({ message: "Event not found/not created by this user" });
      }

      // Delete all tickets associated with the event
      await Ticket.deleteMany({ eventId });

      res
        .status(200)
        .json({ message: "Event deleted successfully", deleted: event });
    } catch (error) {
      console.log("Fail to delete event", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

router.patch(
  "/:ticketId/updateTicket",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      let ticket = await Ticket.findById(req.query.ticketId);
      if (!ticket) {
        return res.status(404).send({ message: "Ticket not found" });
      }
      const event = await Event.findOne({
        _id: ticket.eventId,
        organizerId: userId,
      });
      if (!event) {
        return res.status(404).send({
          message: "Event of this ticket not found/not created by this user",
        });
      }
      ticket = await Ticket.findByIdAndUpdate(req.query.ticketId, req.body, {
        new: true,
      });
      res
        .status(200)
        .json({ message: "Ticket updated successfully", updated: ticket });
    } catch (error) {
      console.log("Fail to update ticket", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

router.get("/:eventId/details", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    // Populate the 'tickets' field when fetching the event
    const event = await Event.findById(eventId)
      .populate({
        path: "organizerId",
        select: "username imageUrl",
      })
      .populate("tickets")
      .exec();

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/filter", async (req: Request, res: Response) => {
  try {
    let {
      sort,
      location,
      keyword,
      startTime,
      endTime,
      priceMin,
      priceMax,
      category,
      eventType,
    } = req.query;

    if (location == undefined) {
      location = "";
    }
    if (keyword == undefined) {
      keyword = "";
    }
    if (category == "All event categories" || category == undefined) {
      category = "";
    }

    if (eventType == "All event types" || eventType == undefined) {
      eventType = "";
    }
    const regexEventType = new RegExp(String(eventType), "i"); // Create a regular expression with the variable and make it case-insensitive
    const regexCategory = new RegExp(String(category), "i");
    const regexKeyword = new RegExp(String(keyword), "i");
    const regexLocation = new RegExp(String(location), "i");
    //if no endDate input, we let it be one day after startDate (so that we only filter by  event within the day)
    if (startTime && !endTime) {
      const date = new Date(String(startTime).split("T")[0]);
      // Add one day to the Date object
      date.setDate(date.getDate() + 1);
      // Convert the modified Date object back to a string
      endTime = date.toISOString();
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    const skip = (page - 1) * limit;

    console.log(location);

    const pipeline: mongoose.PipelineStage[] = [
      {
        $match: {
          $and: [
            {
              $or: [
                { description: { $regex: regexKeyword } },
                { title: { $regex: regexKeyword } },
                { "location.fullAddress": { $regex: regexKeyword } },

                { artistName: { $regex: regexKeyword } },
              ],
            },
            { "location.fullAddress": { $regex: regexLocation } },
            { eventType: { $regex: regexEventType } },
            { category: { $regex: regexCategory } },
          ],
        },
      },
      {
        $lookup: {
          from: "tickets",
          localField: "_id",
          foreignField: "eventId",
          as: "tickets",
        },
      },
      {
        $addFields: {
          minPrice: { $min: "$tickets.price" },
          maxPrice: { $max: "$tickets.price" },
        },
      },
      {
        $match: {
          $or: [
            {
              minPrice: {
                $gte: priceMin ? parseFloat(priceMin as string) : -Infinity,
                $lte: priceMax ? parseFloat(priceMax as string) : Infinity,
              },
            },
            {
              maxPrice: {
                $gte: priceMin ? parseFloat(priceMin as string) : -Infinity,
                $lte: priceMax ? parseFloat(priceMax as string) : Infinity,
              },
            },
            {
              $and: [
                {
                  minPrice: {
                    $lte: priceMin ? parseFloat(priceMin as string) : -Infinity,
                  },
                },
                {
                  maxPrice: {
                    $gte: priceMax ? parseFloat(priceMax as string) : Infinity,
                  },
                },
              ],
            },
          ],
        },
      },
    ];

    //if date is given, match by date as well
    if (startTime) {
      pipeline.push({
        $match: {
          $or: [
            {
              startTime: {
                $gte: new Date(String(startTime)),
                $lte: new Date(String(endTime)),
              },
            },
            {
              endTime: {
                $gte: new Date(String(startTime)),
                $lte: new Date(String(endTime)),
              },
            },
            {
              $and: [
                { startTime: { $lte: new Date(String(startTime)) } },
                { endTime: { $gte: new Date(String(endTime)) } },
              ],
            },
          ],
        },
      });
    }

    let eventMatchedAll = await Event.aggregate(pipeline);
    const total = eventMatchedAll.length;

    switch (sort) {
      case "Soonest":
        pipeline.push({ $sort: { startTime: 1 } }, { $sort: { endTime: 1 } });
        break;
      case "Latest":
        pipeline.push({ $sort: { startTime: -1 } }, { $sort: { endTime: -1 } });
        break;
      case "Price low to high":
        pipeline.push({ $sort: { minPrice: 1 } }, { $sort: { maxPrice: 1 } });
        break;
      case "Price high to low":
        pipeline.push({ $sort: { minPrice: -1 } }, { $sort: { maxPrice: -1 } });
        break;
      default:
        break;
        ``;
    }
    pipeline.push({ $skip: skip }, { $limit: limit });
    const eventMatched = await Event.aggregate(pipeline);

    res.status(200).json({
      eventMatched,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete(
  "/:eventId/deleteEvent",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const event = await Event.findOneAndDelete({
        $and: [{ organizerId: userId }, { _id: req.params.eventId }],
      });

      if (!event) {
        return res
          .status(404)
          .json({ message: "Event not found/not created by this user" });
      }
      await Ticket.deleteMany({ eventId: req.params.eventId });
      res
        .status(200)
        .json({ message: "Event deleted successfully", deleted: event });
    } catch (error) {
      console.log("Fail to delete event", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

router.put(
  "/:eventId/updateEvent",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      console.log("Request to update event:", req.params.eventId, req.body);

      // Extract location details from req.body
      const { city, postalCode, country, state } = req.body.location || {};

      // Construct the fullAddress field
      const fullAddress =
        `${city || ""}, ${state || ""}, ${postalCode || ""}, ${country || ""}`
          .trim()
          .replace(/\s*,\s*$/, "");

      // Update req.body with the constructed location object
      req.body.location = {
        ...req.body.location,
        fullAddress,
      };

      const event = await Event.findOneAndUpdate(
        { $and: [{ organizerId: req.userId }, { _id: req.params.eventId }] },
        req.body,
        { new: true }
      );

      if (!event) {
        return res
          .status(404)
          .json({ message: "Event not found/not created by this user" });
      }

      res
        .status(200)
        .json({ message: "Event updated successfully", updated: event });
    } catch (error) {
      console.error("Failed to update event:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//route to fetch all event created by the given user
router.get("/fetch", verifyToken, async (req: Request, res: Response) => {
  try {
    const event = await Event.find({ organizerId: req.userId });

    if (!event || event.length === 0) {
      return res
        .status(404)
        .json({ message: "Event not found/not created by this user" });
    }
    res.status(200).json({
      message: "Event created by this user fetched successfully",
      event: event,
    });
  } catch (error) {
    console.error("Failed to fetch event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
