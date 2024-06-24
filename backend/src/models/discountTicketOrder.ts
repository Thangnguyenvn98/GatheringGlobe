import mongoose from "mongoose";

const discountedTicketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPerTicket: {
    type: Number,
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  discountCode: {
    type: String,
    required: true,
  },
});

const discountTicketApplied = new mongoose.Schema({
  paymentIntentId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  discountedTickets: [discountedTicketSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DiscountApplication = mongoose.model(
  "DiscountApplication",
  discountTicketApplied
);
export default DiscountApplication;
