import mongoose from "mongoose";

export type TicketType = {
  _id: mongoose.Types.ObjectId;
  eventId: string;
  eventTitle: string;
  seatNumber?: string;
  price: number;
  status: string;
  endTime: string;
  startTime: string;
  quantityAvailable: number;
  type: string;
  isFree: boolean;
};

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  ticketName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  seatNumber: { type: String, required: false },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  type: { type: String, required: true },
  endTime: { type: Date, required: true },
  startTime: { type: Date, required: true },
});

const Ticket = mongoose.model<TicketType>("Ticket", ticketSchema);
export default Ticket;
