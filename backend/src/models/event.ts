import mongoose from 'mongoose';


export type EventType = {
    _id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    venueId?: string;  
    capacity?: number; 
    organizerId: string;
    location: string;
    categories: string[];
    artistName: string;
    imageUrls: string[];
    ticketPriceRange: {
        min: number;
        max: number;
    };
    roomChatLink: string;
};

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: false },
    capacity: { type: Number, required: false }, // Optional based on venue presence
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    location: {type: String, required: true},
    categories: [{ type: String, required: true }],
    artistName: { type: String, required: true },
    imageUrls: [{ type: String, required: true }],
    ticketPriceRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    roomChatLink: { type: String, required: false },
});

const Event = mongoose.model<EventType>("Event", eventSchema);
export default Event;