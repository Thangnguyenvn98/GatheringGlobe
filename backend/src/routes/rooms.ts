import express, { Request, Response } from "express";
import Room from "../models/room";
import verifyToken from "../middleware/auth";
import User from "../models/user";
import Message from "../models/message";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(400).json({ message: "User does not exists!" });
  }

  try {
    const rooms = await Room.find().populate("owner", "username");

    // Sort rooms to have user-owned rooms first
    const sortedRooms = rooms.sort((a: any, b: any) => {
      const isAOwner = a.owner?._id.toString() === user._id.toString() ? -1 : 1;
      const isBOwner = b.owner?._id.toString() === user._id.toString() ? -1 : 1;
      return isAOwner - isBOwner;
    });

    res.status(200).json(sortedRooms);
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:roomId", verifyToken, async (req: Request, res: Response) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId)
      .populate("members", "username")
      .populate("owner", "username"); // Add this line

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error("Failed to fetch room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", verifyToken, async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(400).json({ message: "User does not exists!" });
  }
  const existingRoom = await Room.findOne({
    name: req.body.name,
    owner: user.id,
  });
  if (existingRoom) {
    return res.status(400).json({ message: "Room name already exists!" });
  }
  const room = new Room({ name: req.body.name, owner: user.id });
  await room.save();
  return res.status(200).json(room);
});

router.put("/:roomId", verifyToken, async (req: Request, res: Response) => {
  const { roomId } = req.params;

  const { name } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { name },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Failed to fetch room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:roomId", verifyToken, async (req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    await Message.deleteMany({ room: roomId });

    // Then delete the room itself
    await room.deleteOne();

    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    console.error("Failed to fetch room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
