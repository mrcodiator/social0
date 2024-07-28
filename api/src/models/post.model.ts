import mongoose, { Document } from "mongoose";
import { commentSchema, IComment } from "./comment.model";
import { ILikes, likesSchema } from "./likes.model";

export interface IPost extends Document {
    content: string;
    media: string;
    user: mongoose.Types.ObjectId;
    likes: ILikes[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [likesSchema],
    comments: [commentSchema],

}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema);


