import mongoose, { Document } from "mongoose";

export interface IFollow extends Document {
    user: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

export const followSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

export const Follow = mongoose.model<IFollow>("Follow", followSchema)