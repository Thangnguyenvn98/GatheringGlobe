import mongoose from "mongoose";

export interface DiscountType {
  eventId: mongoose.Types.ObjectId;
  ticketId: mongoose.Types.ObjectId;
  code: string;
  percentage?: number;
  number?: number;
  validUntil: Date;
  isActive: boolean;
  usageLimit: number;
  usedCount: number;
}

const discountSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
  code: { type: String, required: true },
  percentage: { type: Number, required: false },
  number: { type: Number, required: false },
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, required: true, default: true },
  usageLimit: { type: Number, required: true },
  usedCount: { type: Number, required: true },
});

discountSchema.pre("save", function (next) {
  if (this.percentage && this.number) {
    return next(new Error('Only one of "percentage" or "number" can be set.'));
  }
  if (!this.percentage && !this.number) {
    return next(new Error('One of "percentage" or "number" must be set.'));
  }
  next();
});

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
