import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import { createIngress, createStreamerToken } from "../utils/livekit/livekit";
import { AccessToken, IngressInput } from "livekit-server-sdk";
import User from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 } from "uuid";
import Block from "../models/block";

const router = express.Router();

router.get(
  "/streamer-token",
  verifyToken,
  async (req: Request, res: Response) => {
    console.log("-----STREAMER TOKEN------");
    console.log(req.query);
    console.log("-------------------");
    const { hostIdentity } = req.query;
    const userId = req.userId;
    console.log(userId);

    if (!hostIdentity) {
      return res.status(400).json({ message: "Missing user identity" });
    }
    const self = await User.findById(userId);
    const host = await User.findById(hostIdentity);
    if (!host) {
      return res.status(400).json({ message: "Invalid host identity" });
    }

    const isHost = self?._id.toString() === host._id.toString();

    if (!isHost) {
      return res.status(400).json({ message: "Unauthorized" });
    }
    try {
      const token = await createStreamerToken(
        self._id.toString() as string,
        host.username as string
      );
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error creating streamer token:", error);
      res.status(500).json({ message: "Error creating streamer token" });
    }
  }
);

router.get("/viewer-token", async (req: Request, res: Response) => {
  let self;
  const authToken = req.cookies["auth_token"];
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    console.log("USER ID", req.userId);
    const viewer = await User.findById(req.userId);
    self = {
      id: viewer?._id.toString(),
      username: viewer?.username,
    };
  } catch {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = {
      id,
      username,
    };
  }

  const { hostIdentity } = req.query;
  const host = await User.findById(hostIdentity);
  if (!host) {
    return res.status(400).json({ message: "Invalid host identity" });
  }

  if (req.userId) {
    const isBlocked = await Block.findOne({
      blockerId: host._id.toString(),
      blockedById: self.id,
    });

    if (isBlocked) {
      return res
        .status(400)
        .json({ message: "User is blocked", isBlocked: true });
    }
  }

  const isHost = self.id === host._id.toString();

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    }
  );

  token.addGrant({
    room: host._id as string,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  const returnToken = await Promise.resolve(token.toJwt());

  return res.status(200).json({ token: returnToken });
});

router.get(
  "/create-ingress",
  verifyToken,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const { ingressType } = req.query;

    try {
      const ingress = await createIngress(
        user._id,
        ingressType as unknown as IngressInput,
        user.username
      );
      res.status(200).json({ ingress });
    } catch (error) {
      console.error("Error creating ingress:", error);
      res.status(500).json({ message: "Error creating ingress" });
    }
  }
);

export default router;
