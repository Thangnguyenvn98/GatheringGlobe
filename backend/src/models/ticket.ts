import moongose from 'mongoose';

export type TicketType = {
    ticketId: number,
    eventId: number,
    seatNumber: string,
    price: number,
    status: string,
};

const ticketSchema = new moongose.Schema({
    eventId: { type: Number, required: true },
    seatNumber: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
});

const Ticket = moongose.model<TicketType>("Ticket", ticketSchema);
export default Ticket;