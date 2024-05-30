import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import {
  createIngress,
  createStreamerToken,
  createViewerToken,
  resetIngresses,
} from "../utils/livekit/livekit";
import { IngressInput } from "livekit-server-sdk";

const router = express.Router();

router.get(
  "/streamer-token",
  verifyToken,
  async (req: Request, res: Response) => {
    console.log("-----STREAMER TOKEN------");
    console.log(req.query);
    console.log("-------------------");
    const { roomName } = req.query;

    if (!roomName) {
      return res
        .status(400)
        .json({ message: "Missing slug or identity parameter" });
    }
    try {
      const token = await createStreamerToken(roomName as string);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error creating streamer token:", error);
      res.status(500).json({ message: "Error creating streamer token" });
    }
  }
);

router.get(
  "/viewer-token",
  verifyToken,
  async (req: Request, res: Response) => {
    const { roomName, identity } = req.query;
    console.log("-----VIEWER TOKEN------");
    console.log(req.query);
    console.log("-------------------");
    if (!roomName || !identity) {
      return res
        .status(400)
        .json({ message: "Missing slug or identity parameter" });
    }
    try {
      const token = await createViewerToken(
        roomName as string,
        identity as string
      );
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error creating viewer token:", error);
      res.status(500).json({ message: "Error creating viewer token" });
    }
  }
);

router.get(
  "/create-ingress",
  verifyToken,
  async (req: Request, res: Response) => {
    const { roomName, ingressType } = req.query;
    try {
      const ingress = await createIngress(
        roomName as string,
        ingressType as unknown as IngressInput
      );
      res.status(200).json({ ingress });
    } catch (error) {
      console.error("Error creating ingress:", error);
      res.status(500).json({ message: "Error creating ingress" });
    }
  }
);

router.get("/reset-ingresses", async (req, res) => {
  try {
    await resetIngresses();
    res.status(200).json({ message: "Ingresses reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Resetting ingress" });
  }
});

export default router;
