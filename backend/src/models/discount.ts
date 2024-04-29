import mongoose from "mongoose";

export type DiscountType = {
    discountId: string,
    eventId: string,
    code: string,
    percentage: number,
    validUntil: string,
    isActive: boolean,
    usageLimit: number,
    usedCount: number,
    willExpire: boolean,
};

const discountSchema = new mongoose.Schema({  
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    code: { type: String, required: true },
    percentage: { type: Number, required: true },
    validUntil: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    usageLimit: { type: Number, required: true },
    usedCount: { type: Number, required: true },
    willExpire: { type: Boolean, required: true },
 });

  const Discount = mongoose.model<DiscountType>("Discount", discountSchema);
    export default Discount;