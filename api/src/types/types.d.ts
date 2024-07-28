import mongoose from "mongoose";
import { IUser } from "../models/user.model";
import { Server as SocketIOServer } from 'socket.io';
export interface User {
    name: string;
    username: string;
    imageUrl?: string;
    email: string;
    password: string;
}

export interface ResponseMessages {
    message: string,
    success: boolean,
    status: number
}


declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string;
            username: string;
        };
        io: SocketIOServer;
    }
}

export interface ICreateNotification {
    user: mongoose.Types.ObjectId;
    type: "like" | "comment" | "follow";
    action: string;
    message: string;
    seen?: boolean;
}

