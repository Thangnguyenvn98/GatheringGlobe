import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import User from "../models/user";
import Block from "../models/block";
import { RoomServiceClient } from "livekit-server-sdk";


const router = express.Router();
const roomService = new RoomServiceClient(process.env.LIVEKIT_API_URL!,process.env.LIVEKIT_API_KEY!,process.env.LIVEKIT_API_SECRET!);


router.get("/:userId", verifyToken, async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const otherUser = await User.findById(userId);
  
      if (!otherUser) {
        return res.status(400).json({ message: 'User not found', isBlocked: false });
      }
  
      // If user is authenticated
      if (req.userId) {
        const self = await User.findById(req.userId);
        if (!self) {
          return res.status(400).json({ message: 'Authenticated user not found', isBlocked: false });
        }
  
        if (otherUser._id.toString() === self._id.toString()) {
          return res.status(400).json({ message: 'Cannot block yourself', isBlocked: false });
        }
  
        const existingBlock = await Block.findOne({
          blockerId: otherUser._id,
          blockedId: self._id,
        });
  
        if (existingBlock) {
          return res.status(200).json({ message: 'User is blocked', isBlocked: true });
        } else {
          return res.status(200).json({ message: 'User is not blocked', isBlocked: false });
        }
      }
  
      // If user is a guest
      return res.status(200).json({ message: 'Guest access, not blocked', isBlocked: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!", isBlocked: false });
    }
  });

router.post("/user", verifyToken, async (req: Request, res: Response) => {
    try {
        const {id} = req.body;
       
        const self = await User.findById(req.userId);

        if (!self) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (self?._id.toString() === id) {
                return res.status(400).json({ message: 'Cannot block yourself' });
        }

        try {
            const otherUser = await User.findById(id);
    
            if (!otherUser) {
                return res.status(400).json({ message: 'User not found' });
            }
            const existingBlock = await Block.findOne({ blockerId: self?._id, blockedId: otherUser._id  });
            if (existingBlock) {
                return res.status(400).json({ message: 'User already blocked' });
            }
            const block = new Block({
                blockerId: self?._id,
                blockedId: otherUser._id
            });
            await block.save();
            await  block.populate("blockedId");
    
            res.status(201).json({ block });
        }catch {
            // user is a guest
        }
    
        
    

        try {
            await roomService.removeParticipant(self?._id.toString() || '', id)
        }catch {
            // This mean user is not in the room
        }
       

        
    } catch (error) {
        res.status(400).json({ message: "Something went wrong!" });
    }
})

router.delete("/user/unblock/:userId", verifyToken, async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const self = await User.findById(req.userId);

        if (self?._id.toString() === id) {
            return res.status(400).json({ message: 'Cannot unblock yourself' });
        }

        const otherUser = await User.findById(id);

        if (!otherUser) {
            return res.status(400).json({ message: 'User not found' });
        }
        const existingBlock = await Block.findOne({ blockerId: self?._id, blockedId: otherUser._id  });
        if (!existingBlock) {
            return res.status(400).json({ message: 'User is not blocked' });
        }
        const unblock = existingBlock.populate("blockedId");
        await existingBlock.deleteOne();
     

        res.status(200).json({ unblock });

        
    } catch (error) {
        res.status(400).json({ message: "Something went wrong!" });
    }
})


export default router