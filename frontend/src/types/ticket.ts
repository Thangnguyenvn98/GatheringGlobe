import { EventType } from "./event";

export interface TicketType {
  _id: string;
  eventId: string;
  seatNumber?: string;
  price: number;
  status: string;
  quantityAvailable: number;
  type: string;
  isFree: boolean;
  title: EventType;
}
