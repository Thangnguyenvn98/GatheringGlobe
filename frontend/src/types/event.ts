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
  location: LocationType;
  category: string;
  eventType: string;
  artistName: string;
  imageUrls: string[];
  tickets: TicketType[];
  roomChatLink?: string;
  minPrice?: number;
}

export interface LocationType {
  city: string;
  postalCode: string;
  country: string;
  state?: string;
  fullAddress?: string;
}
