import mongoose from "mongoose";

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
});

const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;