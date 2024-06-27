export interface Order {
  _id: string;
  userId: string;
  events: Array<{
    _id: string;
    eventId: {
      _id: string;
      title: string;
      imageUrls: string[];
      startTime: string;
    };
    tickets: Array<{
      ticketId: {
        _id: string;
        type: string;
      };
      quantity: number;
      _id: string;
    }>;
  }>;
  totalPrice: number;
  paymentStatus: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
}
