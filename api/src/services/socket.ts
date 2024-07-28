import { Request, Response, NextFunction } from "express";
import { Server } from "socket.io";

// Initialize Socket.io
const io = new Server();

// Middleware to attach io instance to the request object
export const attachSocketIo = (req: Request, res: Response, next: NextFunction) => {
    req.io = io;
    next();
};