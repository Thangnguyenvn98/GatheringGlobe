import mongoose from "mongoose";

export type OrderType = {
  _id: string;
  userId: mongoose.Types.ObjectId;
  events: {
    eventId: mongoose.Types.ObjectId;
    tickets: {
      ticketId: mongoose.Types.ObjectId;
      quantity: number;
      ticketUsed: number[];
    }[];
  }[];
  totalPrice: number;
  paymentStatus: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentMethodId: string;
  paymentIntentId: string;
};

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    events: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
          required: true,
        },
        tickets: [
          {
            ticketId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Ticket",
              required: true,
            },
            originalPrice: { type: Number, required: false },
            newPrice: { type: Number, required: false },
            quantity: { type: Number, required: true },
            ticketUsed: {
              type: [Number],
              default: [],
            },
          },
        ],
      },
    ],
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    paymentMethodId: { type: String, required: true },
    paymentIntentId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;
