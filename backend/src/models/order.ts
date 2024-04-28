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
    userId: { type: Number, required: true },
    eventId: { type: Number, required: true },
    purchaseDate: { type: String, required: true },
    tickets: [{ type: Number, required: true }],
    totalPrice: { type: Number, required: true },
});

const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;