import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";
import userRoutes from "./routes/users";
import messageRoutes from "./routes/messages";
import roomRoutes from "./routes/rooms";
import eventRoutes from "./routes/events";
import paymentRoutes from "./routes/payments";
import orderRoutes from "./routes/orders";
import livekitRoutes from "./routes/livekit";
import allEventRoutes from "./routes/allEvents";
import streamRoutes from "./routes/stream";
import blockRoutes from "./routes/blocks";
import discountRoutes from "./routes/discounts";
import chatBotRoutes from "./routes/chatBotRoutes";
import Oauth from "./routes/oauth"
import RequestOauth from "./routes/request"
import { Server } from "socket.io";
import http from "http";
import Room from "./models/room";
import Message from "./models/message";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
import { WebhookReceiver } from "livekit-server-sdk";
import Stream from "./models/stream";

dotenv.config();

const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("MongoDB conected succesfully for GatheringGlobe"));

const app = express();
const server = http.createServer(app);
const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});
app.use("/api/request", RequestOauth);
app.use("/api/oauth", Oauth);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/allEvents", allEventRoutes);
app.use("/api/livekit", livekitRoutes);
app.use("/api/authRoutes", authRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/chatbot", chatBotRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/block", blockRoutes);
app.use(
  "/api/webhooks/livekit",
  express.raw({ type: "application/webhook+json" })
);
app.post("/api/webhooks/livekit", async (req, res) => {
  try {
    const body = req.body;

    const authorization = req.get("Authorization");
    if (!authorization) {
      return res.status(400).json({ message: "No authorization header" });
    }

    const event = await receiver.receive(body, authorization);
    if (event.event === "ingress_ended") {
      await Stream.updateOne(
        { ingressId: event.ingressInfo?.ingressId },
        { $set: { isLive: false } }
      );
    }
    if (event.event === "ingress_started") {
      await Stream.updateOne(
        { ingressId: event.ingressInfo?.ingressId },
        { $set: { isLive: true } }
      );
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
});
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      uploadthingId: process.env.UPLOADTHING_APP_ID,
      uploadthingSecret: process.env.UPLOADTHING_SECRET,
    },
  })
);

io.on("connection", async (socket) => {
  console.log(`A user connected ${socket.id}`);

  socket.on("join_room", async (data) => {
    const { username, userId, roomId } = data;
    console.log("------------------------------------------------");
    console.log(socket.rooms);
    console.log("join_room");
    console.log(roomId);

    if (!socket.rooms.has(roomId)) {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
      console.log(socket.rooms);
      console.log("------------------------------------------------");

      const room = await Room.findById(roomId);
      if (room && !room.members.includes(userId)) {
        await Room.updateOne(
          { _id: roomId },
          { $addToSet: { members: userId } }
        );

        socket.to(roomId).emit("receive_message", {
          message: `${username} has joined the chat room`,
          username: "CHATBOT",
          createdAt: new Date().toISOString(),
        });

        if (room.owner?.toString() !== userId) {
          socket.emit("receive_message", {
            message: `Welcome ${username}`,
            username: "CHATBOT",
            createdAt: new Date().toISOString(),
          });
        }
      }
    } else {
      console.log(`Socket ${socket.id} is already in room ${roomId}`);
      console.log(socket.rooms);
      console.log("------------------------------------------------");
    }
  });

  socket.on("send_message", async (messageData) => {
    const message = new Message({
      username: messageData.username,
      avatar: messageData.avatar,
      room: messageData.room,
      message: messageData.message,
      imageUrl: messageData.imageUrl,
    });

    const savedMessage = await message.save();
    const roomId = savedMessage.room.toString();
    io.to(roomId).emit("receive_message", savedMessage);
  });

  socket.on("disconnecting", () => {});

  socket.on("leave_room", (data) => {
    socket.leave(data.room);
    // Handle any additional logic needed when a user leaves a room
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/test", (req: Request, res: Response) => {
  return res.json({ message: "Testing Hello " });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
