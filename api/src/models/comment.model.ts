import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
    text: string
    user: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

export const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true })

export const Comments = mongoose.model<IComment>("Comment", commentSchema)