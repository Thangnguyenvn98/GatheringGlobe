import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import User from "../models/user";

const router = express.Router();

router.post("/", verifyToken, async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(400).json({ message: "User does not exists!" });
  }
  const { name, date, location, description } = req.body;
  if (!name || !date || !location) {
    return res
      .status(400)
      .json({
        message:
          "Missing required fields: name, date, and location are required.",
      });
  }
//   const existingEvent = await Event.findOne({
//     name: name,
//     date: date,
//     owner: user.id,
//   });
//   if (existingEvent) {
//     return res
//       .status(400)
//       .json({
//         message: "An event with the same name and date already exists!",
//       });
//   }
//   const event = new Event({
//     name: name,
//     date: date,
//     location: location,
//     description: description,
//     owner: user.id,
//   });

//   await event.save();
  return res.status(201).json({message:"Test successfully"});
});

export default router;
