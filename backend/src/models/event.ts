import moongose from 'mongoose';

export type EventType = {
    _id: string,
    tile: string,
    description: string,
    password: string,
    role: string,
    eventId: number,
    title: string,
    startTime: string,
    endTime: string,
    venueId: number,
    organizerId: number,
    categories: string[],
    artistName: string,
    imageUrls: string[],
    ticketPriceRange: { min: number, max: number },
    roomChatLink: string,
};

const eventSchema = new moongose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    venueId: { type: Number, required: true },
    organizerId: { type: Number, required: true },
    categories: [{ type: String, required: true }],
    artistName: { type: String, required: true },
    imageUrls: [{ type: String, required: true }],
    ticketPriceRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    roomChatLink: { type: String, required: true },
});

const Event = moongose.model<EventType>("Event", eventSchema);
export default Event;