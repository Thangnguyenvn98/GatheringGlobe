import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import User from "../models/user";
import Event from "../models/event";

const router = express.Router();


router.get('/search', async (req:Request, res:Response) => {
  console.log(req.query)
  return res.status(200).json({message:"Test successfully"})
})




router.post("/", verifyToken, async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(400).json({ message: "User does not exists!" });
  }
  if (user.role !== "organizer") {
    return res
      .status(403)
      .json({ message: "Only organizers are allowed to create events." });
  }
  const {
    title,
    description,
    startTime,
    endTime,
    venueId,
    capacity,
    location,
    categories,
    artistName,
    imageUrls,
    ticketPriceRange,
    roomChatLink,
  } = req.body;

  if (
    !title ||
    !description ||
    !startTime ||
    !endTime ||
    !location ||
    !categories ||
    !artistName ||
    !imageUrls ||
    !ticketPriceRange
  ) {
    return res.status(400).json({
      message:
        "Missing required fields: Ensure all fields including title, description, start time, end time, location, categories, artist name, image URLs, ticket price range are provided.",
    });
  }
  const existingEvent = await Event.findOne({ title, startTime, location });
  if (existingEvent) {
    return res
      .status(400)
      .json({
        message:
          "An event with the same title, start time and location already exists!",
      });
  }
  const event = new Event({
    title,
    description,
    startTime,
    endTime,
    venueId,
    capacity,
    organizerId: user.id,
    location,
    categories,
    artistName,
    imageUrls,
    ticketPriceRange,
    roomChatLink,
  });
  try {
    await event.save();
    return res
      .status(201)
      .json({ message: "Event created successfully"});
  } catch (error) {
    console.error("Failed to create event:", error);
    return res
      .status(500)
      .json({ message: "Failed to create event due to an internal error" });
  }
});

router.post('/test', verifyToken, async (req: Request, res: Response) => {
  res.status(200).json({ message: "Test successful" });
})

export default router;
