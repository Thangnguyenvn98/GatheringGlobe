import mongoose from "mongoose";
import { BookingType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: {type: String, required:true},
  lastName: {type: String, required:true},
  email: {type: String, required: true},
  checkIn: {type: Date, required: true},
  userId: {type: String, required: true},
  totalPrice: {type: Number, required: true},

})




export type OrderType = {
orderId: number   ,
  userId: number,                 
  eventId: number,                    
  purchaseDate: string             
  tickets:  number[],                    
  totalPrice: number, 

};

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    tickets: [{
      ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'},
      quantity: { type: Number, required: true }
  }],
    totalPrice: { type: Number, required: true },
    bookings: [bookingSchema],
});

const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;