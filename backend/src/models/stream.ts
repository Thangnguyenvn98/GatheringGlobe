import mongoose from "mongoose";

const streamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ingressId: { type: String, required: false },
    serverUrl: { type: String, required: false },
    streamKey: { type: String, required: false },
    thumbnailUrl: { type: String, required: false },
    isLive: { type: Boolean, required: true, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
    },
    usedOBS: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Stream = mongoose.model("Stream", streamSchema);
export default Stream;
