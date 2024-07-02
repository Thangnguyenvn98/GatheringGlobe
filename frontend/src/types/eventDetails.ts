import { LocationType } from "./event";

interface Organizer {
  _id: string;
  username: string;
  imageUrl: string;
}

interface Ticket {
  _id: string;
  eventId: string;
  price: number;
  status: string;
  quantityAvailable: number;
  type: string;
  isFree: boolean;
  __v: number;
}

export interface EventDetails {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  capacity: number;
  organizerId: Organizer;
  location: LocationType;
  category: string;
  eventType: string;
  artistName: string;
  imageUrls: string[];
  tickets: Ticket[];
  roomChatLink: string;
  __v: number;
}
