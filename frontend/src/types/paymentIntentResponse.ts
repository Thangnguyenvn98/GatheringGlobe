export type TicketDetails = {
  ticketId: string;
  ticketType: string;
  price: number;
  quantity: number;
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalPrice: number;
  allTicketsDetails: TicketDetails[];
};
