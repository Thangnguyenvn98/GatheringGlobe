type DiscountedTicket = {
  eventId: string;
  ticketId: string;
  originalPrice: number;
  discountPerTicket: number;
  newPrice: number;
  quantity: number;
  discountCode: string;
};

export type OrderDetailsByIdResponse = {
  order: {
    _id: string;
    userId: string;
    totalPrice: number;
    paymentStatus: string;
    paymentMethodId: string;
    paymentIntentId: string;
    firstName: string;
    lastName: string;
    email: string;
    events: Array<{
      _id: string;
      eventId: {
        _id: string;
        title: string;
        startTime: string;
        endTime: string;
        imageUrls: string[];
        organizerId: {
          username: string;
          email: string;
        };
      };
      tickets: Array<{
        ticketId: {
          _id: string;
          price: number;
          type: string;
        };
        quantity: number;
        _id: string;
      }>;
    }>;
    __v: number;
  };

  paymentMethod: {
    id: string;
    brand: string;
    exp_month: number;
    exp_year: number;
    last4: string;
  };

  billing_details: {
    address: {
      city: string | null;
      country: string;
      line1: string | null;
      line2: string | null;
      postal_code: string;
      state: string | null;
    };
  };

  created: number;
  testId: string;
  discountedTickets: DiscountedTicket[];
};
