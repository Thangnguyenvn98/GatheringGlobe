import { EventType } from "../models/event";
import { OrderType } from "../models/order";
import { TicketType } from "../models/ticket";

type TicketDetails = {
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
    ticketId: TicketType;
    quantity: number;
  };
  
  export type PopulatedEvent = {
    eventId: EventType;
    tickets: PopulatedTicket[];
  };

  export type OrderDetailsByIdResponse = {
    order: Omit<OrderType, 'events'> & { events: PopulatedEvent[] };
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
    }
    created: number;
  }

