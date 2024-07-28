import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { errorMessages } from "../helper/errorMessage";
import { sendResponse } from "../lib/response";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key"; // Ensure to use an environment variable in production

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return sendResponse(res, errorMessages.UNAUTHORIZED);
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        req.user = { id: decoded.id as string, username: decoded.username as string };
        next();
    } catch (err) {
        return sendResponse(res, errorMessages.UNAUTHORIZED);
    }
};
