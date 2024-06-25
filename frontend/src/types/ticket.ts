export interface TicketType {
  _id: string;
  eventId: string;
  seatNumber?: string;
  price: number;
  quantityAvailable: number;
  status: string;
  type: string;
  isFree: boolean;
}
