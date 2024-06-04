import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";

import User from "../models/user";
import Stream from "../models/stream";


const router = express.Router();

router.get('/',verifyToken, async (req: Request, res: Response) => {
    const { userId } = req.query;
    try {
        const user= await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let stream;
        const existingStream = await Stream.findOne({ userId: user._id });
        if (existingStream) {
            stream = existingStream;
        } else {
            stream = new Stream({ userId: user._id, name: `${user.username}'s stream` });
            await stream.save();
            user.stream = stream._id;
            await user.save();
        }
        res.status(200).json(stream);

    } catch (error) {
        console.error("Error fetching stream:", error);
        res.status(500).json({ message: "Error fetching stream" });
    }
}
);

router.put('/:streamId', verifyToken, async (req: Request, res: Response) => {
    const { streamId } = req.params;
    const { name, thumbnailUrl } = req.body;
  
    try {
      const stream = await Stream.findById(streamId);
      if (!stream) {
        return res.status(404).json({ message: "Stream not found" });
      }
      console.log(req.body)
      
      if (name !== undefined) { 
        stream.name = name; 
    }

    // Allow thumbnailUrl to be updated to null to "delete" it or any other value
    if (thumbnailUrl !== undefined) { 
        stream.thumbnailUrl = thumbnailUrl; 
    }
  
      await stream.save();
      res.status(200).json(stream);
    } catch (error) {
      console.error("Error editing stream:", error);
      res.status(500).json({ message: "Error editing stream" });
    }
  });

export default router;