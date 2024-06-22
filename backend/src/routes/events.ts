import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import User from "../models/user";
import Event, { EventType } from "../models/event"; // this is the model <-------
import Ticket from "../models/ticket";
import mongoose from "mongoose";

const router = express.Router();
//By using the model to find it
//You can stack finding an event basically calling it 4 times, first by location then startTime then endDate then keyword
//There a mongodb option to find event by date give startTime and endDate
//After found the model return the response something like    res.status(200).json(foundEvent);
router.get("/search", async (req: Request, res: Response) => {
  try {
    //get all the location, startDate, endDeate, keyword sent from front end
    let { locationChosen, startDate, endDate, keyword } = req.query;
    if (!keyword) {
      keyword = "";
    }
    if (!locationChosen) {
      locationChosen = "";
    }
    const regexKeyword = new RegExp(String(keyword), "i"); // Create a regular expression with the variable and make it case-insensitive
    const regexLocation = new RegExp(String(locationChosen), "i");
    //find matching data
    let event;
    //if no given date range, we look for event that start on or after today
    if (!startDate) {
      let date = new Date(); //let startDate be the date today
      startDate = date.toISOString();
      //let endDate be really far away so that it fetch all the event we currently have from today
      date = new Date(3000, 1, 1);
      endDate = date.toISOString();
    }
    //if no endDate input, we let it be one day after startDate (so that we only search for event within the day)
    if (!endDate) {
      const date = new Date(String(startDate).split("T")[0]);
      // Add one day to the Date object
      date.setDate(date.getDate() + 1);
      // Convert the modified Date object back to a string
      endDate = date.toISOString();
    }
    //the event has to have the correct location, the wanted keyword in either the title or the description, and the time range overlapsed with the given time range
    event = await Event.find({
      $and: [
        { location: { $regex: regexLocation } },
        {
          $or: [
            { description: { $regex: regexKeyword } },
            { title: { $regex: regexKeyword } },
            { location: { $regex: regexKeyword } },
          ],
        },
        {
          $or: [
            {
              startTime: {
                $gte: new Date(String(startDate)),
                $lte: new Date(String(endDate)),
              },
            },
            {
              endTime: {
                $gte: new Date(String(startDate)),
                $lte: new Date(String(endDate)),
              },
            },
            {
              $and: [
                { startTime: { $lte: new Date(String(startDate)) } },
                { endTime: { $gte: new Date(String(endDate)) } },
              ],
            },
          ],
        },
      ],
    })
      .populate("tickets")
      .exec();
    //if no matching event found
    if (event.length === 0) {
      //set the response and return so that it will set the status and would not run the part after the if statement
      return res.status(201).json({ message: "Event not found" }); //not sure when this message is used
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Failed to fetch event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const now = new Date(); // Gets the current date and time
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Define an aggregation pipeline to find and process events
    const pipeline: mongoose.PipelineStage[] = [
      { $match: { startTime: { $lte: now } } },
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
    const total = await Event.countDocuments({ startTime: { $lte: now } });

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
  const event = new Event({
    title,
    description,
    startTime,
    endTime,
    venueId: venueId ? new mongoose.Types.ObjectId(venueId) : undefined,
    capacity,
    organizerId: user._id,
    location,
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
    const tickets = req.body.tickets;

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

      const createdTickets = [];

      for (const ticketData of tickets) {
        const { type, price, quantityAvailable, seatNumber, status, isFree } =
          ticketData;

        if (
          !type ||
          price == null ||
          !quantityAvailable ||
          !status ||
          isFree == null
        ) {
          return res
            .status(400)
            .json({ message: "Missing required ticket details." });
        }
        if (isFree && price !== 0) {
          return res
            .status(400)
            .json({ message: "Free tickets must have a price of 0." });
        }

        const ticket = new Ticket({
          eventId,
          type,
          price,
          quantityAvailable,
          seatNumber,
          status,
          isFree,
        });

        await ticket.save();
        event.tickets.push(ticket._id);
        createdTickets.push(ticket);
      }

      await event.save();

      return res.status(201).json({
        message: "Tickets created successfully",
        tickets: createdTickets,
      });
    } catch (error) {
      console.error("Failed to create tickets:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/test", verifyToken, async (req: Request, res: Response) => {
  res.status(200).json({ message: "Test successful" });
});

router.get("/:eventId/details", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    // Populate the 'tickets' field when fetching the event
    const event = await Event.findById(eventId).populate("tickets").exec();

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

    const pipeline: mongoose.PipelineStage[] = [
      { $match:{
          $and: [
            {
              $or: [
                { description: { $regex: regexKeyword } },
                { title: { $regex: regexKeyword } },
                { location: { $regex: regexKeyword } },
                { artistName: { $regex: regexKeyword } }
              ],
            },
            { location: { $regex: regexLocation } },
            { eventType: { $regex: regexEventType } },
            { category: { $regex: regexCategory } },
          ],
        }},
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
          maxPrice: { $max: "$tickets.price" }
        }
      },
      { $match:{
        $or: [
          {
            minPrice: {
              $gte: priceMin? parseFloat(priceMin as string): -Infinity,
              $lte: priceMax? parseFloat(priceMax as string): Infinity,
            },
          },
          {
            maxPrice: {
              $gte: priceMin? parseFloat(priceMin as string): -Infinity,
              $lte: priceMax? parseFloat(priceMax as string): Infinity,
            },
          },
          {
            $and: [
              { minPrice: { $lte: priceMin? parseFloat(priceMin as string): -Infinity } },
              { maxPrice: { $gte: priceMax? parseFloat(priceMax as string): Infinity } },
            ],
          },
        ],
      }},
    ];

    //if date is given, match by date as well
    if (startTime){
      pipeline.push({ $match :
        {
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
      })
    }
    
    let eventMatchedAll = await Event.aggregate(pipeline);
    const total = eventMatchedAll.length

    switch (sort) {
      case "Soonest":
        pipeline.push(
          { $sort: 
            {startTime: 1}
          },
          { $sort: 
            {endTime: 1}
          }
        )
        break;
      case "Latest":
        pipeline.push(
          { $sort: 
            {startTime: -1}
          },
          { $sort: 
            {endTime: -1}
          }
        )
        break;
      case "Price low to high":
        pipeline.push(
          { $sort: 
            {minPrice: 1}
          },
          { $sort: 
            {maxPrice: 1}
          }
        )
        break;
      case "Price high to low":
        pipeline.push(
          { $sort: 
            {minPrice: -1}
          },
          { $sort: 
            {maxPrice: -1}
          }
        )
        break;      
      default:
        break;
  ``}
    pipeline.push(
      { $skip: skip },
      { $limit: limit },
    )
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

export default router;
