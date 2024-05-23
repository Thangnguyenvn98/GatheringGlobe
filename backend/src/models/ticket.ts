import mongoose from 'mongoose';

export type TicketType = {
    _id: mongoose.Types.ObjectId,
    eventId: string,
    seatNumber?: string,
    price: number,
    status: string,
    quantityAvailable: number,
    type: string,
    isFree: boolean
};

const ticketSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    seatNumber: { type: String, required: false },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    quantityAvailable: { type: Number, required: true },
    type: { type: String, required: true},
    isFree: {type: Boolean, required: true, default:false}
});

const Ticket = mongoose.model<TicketType>("Ticket", ticketSchema);
export default Ticket;