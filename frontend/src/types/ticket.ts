import { EventType } from "react-hook-form";

export interface TicketType {
  _id: string;
  ticketName: EventType;
  eventId: string;
  seatNumber?: string;
  price: number;
  startTime: string;
  endTime: string;
  quantityAvailable: number;
  type: string;
}
