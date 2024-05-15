export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalPrice: number;
    allTicketsDetails: any[];
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