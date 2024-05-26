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

export type PopulatedTicket = {
    ticketId: {
        _id: string;
        type: string;
        price: number;
    };
    quantity: number;
};

export type PopulatedEvent = {
    eventId: {
        _id: string;
        title: string;
        startTime: string;
        endTime: string;
        imageUrls: string[];
    };
    tickets: PopulatedTicket[];
};

export type OrderDetailsByIdResponse = {
    order: {
        _id: string;
        userId: string;
        events: PopulatedEvent[];
        totalPrice: number;
        paymentStatus: string;
        firstName: string;
        lastName: string;
        email: string;
        paymentMethodId: string;
        paymentIntentId: string;
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
            country: string | null;
            line1: string | null;
            line2: string | null;
            postal_code: string | null;
            state: string | null;
        };
    };
    created: number;
};