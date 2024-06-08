// import express, { Request, Response } from "express";
// import { WebhookReceiver } from "livekit-server-sdk";
// import Stream from "../models/stream"; // Ensure this path is correct

// const router = express.Router();

// const receiver = new WebhookReceiver(
//     process.env.LIVEKIT_API_KEY!,
//     process.env.LIVEKIT_API_SECRET!
// );

// router.post("/", async (req: Request, res: Response) => {
 
//     try {
//         const authorization = req.get('Authorization');
//         if (!authorization) {
//             return res.status(401).json({ message: "No authorization header" });
//         }

//         // Validate and decode the webhook event
//         const event = receiver.receive(req.body, authorization);

//         // Log the event for debugging
//         console.log("Webhook event received:", event);

//         // Process the event
//         if (event.event === "ingress_ended") {
//             console.log("Handling ingress_ended event");
//             await Stream.findOneAndUpdate({ ingressId: event.ingressInfo?.ingressId }, { isLive: false });
//         }

//         if (event.event === "ingress_started") {
//             console.log("Handling ingress_started event");
//             await Stream.findOneAndUpdate({ ingressId: event.ingressInfo?.ingressId }, { isLive: true });
//         }

//         res.status(200).send("OK");
//     } catch (error) {
//         console.error("Error processing webhook:", error);
//         res.status(500).json({ message: "Something went wrong!" });
//     }
// });

// export default router;
