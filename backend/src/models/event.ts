import mongoose from 'mongoose';

export type EventType = {
    _id: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    venueId?: string;
    capacity?: number;
    organizerId: string;
    location: string;
    category: string;
    eventType: string;
    artistName: string;
    imageUrls: string[];
    tickets: mongoose.Types.ObjectId[]; // Reference to ticket IDs
    roomChatLink: string;
};

// Update the mongoose schema for Event
// Update the mongoose schema for Event
const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: false },
    capacity: { type: Number, required: false },
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    eventType: { type: String, required: true },
    artistName: { type: String, required: true },
    imageUrls: [{ type: String, required: true }],
    tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }], 
    roomChatLink: { type: String, required: false },
});

const Event = mongoose.model<EventType>("Event", eventSchema);
export default Event;

