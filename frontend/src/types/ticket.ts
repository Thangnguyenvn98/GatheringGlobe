import { EventType } from "./event";

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
  isFree: boolean;
  title: EventType;
}
