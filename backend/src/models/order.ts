import mongoose, {Schema, Document} from "mongoose";
import { BookingType } from "../shared/types";

export type TicketType = {
  ticketId: Schema.Types.ObjectId,
  quantity: number,
  price: number // Assuming each ticket has a price
};

export type OrderType = Document & {
  orderId: number,
  userId: number,
  eventId: number,
  purchaseDate: string,
  tickets: TicketType[], // Array of TicketType
  totalPrice: number,
};

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: {type: String, required:true},
  lastName: {type: String, required:true},
  email: {type: String, required: true},
  checkIn: {type: Date, required: true},
  userId: {type: String, required: true},
  totalPrice: {type: Number, required: true},

})

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    tickets: [{
      ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'},
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
  }],
    totalPrice: { type: Number, required: true },
    bookings: [bookingSchema],
});

const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;