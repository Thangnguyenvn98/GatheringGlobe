import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";
import userRoutes from "./routes/users";
import messageRoutes from "./routes/messages";
import roomRoutes from "./routes/rooms";
import eventRoutes from './routes/events'
import paymentRoutes from './routes/payments'
import orderRoutes from './routes/orders'
import livekitRoutes from './routes/livekit'
import { Server } from "socket.io";
import http from "http";
import Room from "./models/room";
import Message from "./models/message";
import dotenv from 'dotenv';
import { log } from "handlebars";
import authRoutes from "./routes/authRoutes";


dotenv.config();

const PORT = process.env.PORT || 5050;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("MongoDB conected succesfully for GatheringGlobe"));

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

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

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/orders",orderRoutes)
app.use("/api/livekit",livekitRoutes)
app.use("/api/authRoutes",authRoutes);
app.use("/api/orders",orderRoutes);


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
