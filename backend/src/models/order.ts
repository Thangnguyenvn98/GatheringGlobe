import mongoose from "mongoose";

export type OrderType = {
  _id: string;
  userId: mongoose.Types.ObjectId;
  events: {
    eventId: mongoose.Types.ObjectId;
    tickets: {
      ticketId: mongoose.Types.ObjectId;
      quantity: number;
    }[];
  }[];
  totalPrice: number;
  paymentStatus: string;
};

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  events: [
    {
      eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
      tickets: [
        {
          ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
          quantity: { type: Number, required: true },
        },
      ],
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, required: true, enum: ['pending', 'completed', 'failed'], default: 'pending' },
});

const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;
