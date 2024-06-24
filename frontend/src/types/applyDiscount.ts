export type ApplyDiscountResponse = {
  message: string;
  newTotal: number;
  discountAmount: number;
  discountedTickets: DiscountedTicket[];
};

export type DiscountedTicket = {
  eventId: string;
  ticketId: string;
  originalPrice: number;
  discountPerTicket: number;
  newPrice: number;
  quantity: number;
  discountCode: string;
};
