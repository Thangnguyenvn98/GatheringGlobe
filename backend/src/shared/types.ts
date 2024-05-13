export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalPrice: number;
}

export type TicketType = {
    _id: string;
    userId: string;
    eventId: string; // Assuming eventId refers to the ID of the event
    seatNumber: string;
    price: number;
    status: string;
    quantityAvailable: number;
    bookings: BookingType[];
    
}

export type BookingType = {
    _id: string;
    ticketId: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string,
    checkIn: Date;
    totalPrice: number;
}
export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };