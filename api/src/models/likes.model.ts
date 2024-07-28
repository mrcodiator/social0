import mongoose, { Document } from "mongoose";

export interface ILikes extends Document {
    user: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

export const likesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

export const Likes = mongoose.model<ILikes>("Likes", likesSchema);
