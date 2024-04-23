import mongoose from "mongoose";


type PopulatedOwner = {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
}

export type RoomType = {
    _id:string;
    name:string;
    owner: PopulatedOwner | string;
    members:string[];
    blockedList:string[];
}

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    blockedList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

const Room = mongoose.model<RoomType>('Room',RoomSchema)
export default Room