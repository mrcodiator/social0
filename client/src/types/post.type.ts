import { User } from "./user.type";

export interface Post {
    _id: string;
    content: string;
    media: string;
    user: User;
    likes: Likes[];
    comments: Comments[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Comments {
    _id: string;
    text: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface Likes {
    user: User;
}