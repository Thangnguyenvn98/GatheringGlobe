import { Ticket } from "./ticket";

export interface EventType {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  venueId?: string;
  capacity?: number;
  organizerId: string;
  location: string;
  categories: string[];
  artistName: string;
  imageUrls: string[];
  tickets: Ticket[];
  roomChatLink?: string;
}
