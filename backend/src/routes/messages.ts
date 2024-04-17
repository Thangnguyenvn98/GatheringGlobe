import express, { Request, Response } from "express";
import Message from "../models/message";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.get("/:roomId", verifyToken, async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const cursor = parseInt(req.query.cursor as string, 10) || 0; // Default to page 1 if not specified
  const limit = 10; // Number of items per page
  if (!roomId) {
    return res.status(400).json({ message: "Room ID is required!" });
  }
  try {
    const messages = await Message.find({ room: roomId })
      .sort({ createdAt: -1 })
      .skip(cursor)
      .limit(limit + 1);

    const hasNextPage = messages.length > limit;
    const nextCursor = hasNextPage ? cursor + limit : undefined;

    res.json({
      messages: messages.slice(0, limit),
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Error fetching messages");
  }
});

export default router;
