import mongoose from "mongoose";
import { io } from "..";


export interface INotification extends mongoose.Document {
    user: mongoose.Types.ObjectId
    type: "like" | "comment" | "follow";
    action: string;
    message: string
    seen?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface INewNotification {
    user: mongoose.Types.ObjectId;
    type: "like" | "comment" | "follow";
    action: string;
    message: string;
    seen?: boolean;
}

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["like", "comment", "follow"]
    },
    message: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    },
    action: {
        type: String,
        required: true
    }

}, { timestamps: true });

notificationSchema.post("save", function (doc) {
    io.emit("notification", doc)
})


export const Notification = mongoose.model<INotification>("Notification", notificationSchema)