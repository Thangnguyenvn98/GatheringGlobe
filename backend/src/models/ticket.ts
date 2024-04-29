import mongoose from 'mongoose';

export type TicketType = {
    ticketId: number,
    eventId: number,
    seatNumber: string,
    price: number,
    status: string,
};

const ticketSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    seatNumber: { type: String, required: false },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    quantityAvailable: { type: Number, required: true }, // Track available tickets
});

const Ticket = mongoose.model<TicketType>("Ticket", ticketSchema);
export default Ticket;