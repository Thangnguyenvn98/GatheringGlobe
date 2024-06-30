import mongoose from "mongoose";
import Order from "../models/order";

const isTicketUsed = async (
  orderId: string,
  ticketId: string,
  index: number
) => {
  const order = await Order.findOne({
    _id: orderId as unknown as mongoose.Types.ObjectId,
  });
  if (!order) {
    return false;
  }
  for (const event of order.events) {
    for (const ticket of event.tickets) {
      if (
        ticket.ticketId.equals(ticketId as unknown as mongoose.Types.ObjectId)
      ) {
        return ticket.ticketUsed.includes(index);
      }
    }
  }
};

export const useTicket = async (
  orderId: string,
  ticketId: string,
  index: number
) => {
  if (!ticketId || !orderId) {
    return false;
  }
  const used = await isTicketUsed(orderId, ticketId, index);
  if (used) {
    return false;
  }
  const order = await Order.findOne({
    _id: orderId as unknown as mongoose.Types.ObjectId,
  });
  if (!order) {
    return false;
  }
  for (const event of order.events) {
    for (const ticket of event.tickets) {
      if (
        ticket.ticketId.equals(ticketId as unknown as mongoose.Types.ObjectId)
      ) {
        ticket.ticketUsed.push(index);
        await order.save();
        return true;
      }
    }
  }
};
