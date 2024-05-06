export type PaymentIntentResponse = {
    paymentIntentId: string;
    clientSecret: string;
    totalPrice: number;
}

export type BookingType = {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string,
    checkIn: Date;
    totalPrice: number;
    bookings: BookingType[];
}