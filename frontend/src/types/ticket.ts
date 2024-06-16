export interface TicketType {
  _id: string;
  eventId: string;
  seatNumber?: string;
  price: number;
  quantityAvailable: number;
  type: string;
  isFree: boolean;
}
