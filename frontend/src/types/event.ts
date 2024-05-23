import { TicketType } from "./ticket";

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
  category: string;
  eventType: string;
  artistName: string;
  imageUrls: string[];
  tickets: TicketType[];
  roomChatLink?: string;
}
