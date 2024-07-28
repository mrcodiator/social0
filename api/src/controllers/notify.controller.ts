import { Request, Response } from "express"
import { sendResponse } from "../lib/response";
import { errorMessages } from "../helper/errorMessage";
import { Notification } from "../models/notification.model";
import { successMessages } from "../helper/successMessage";
import mongoose from "mongoose";

export async function getNotifications(req: Request, res: Response) {
    try {
        const id = req.user?.id;
        // console.log(id);

        const notifications = await Notification.find({ user: id }).sort({ createdAt: -1 });

        // console.log(notifications);

        return sendResponse(res, successMessages.SUCCESS, notifications);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export async function seenNotifications(req: Request, res: Response) {
    try {
        const id = req.user?.id;
        await Notification.updateMany({ user: id }, { seen: true });
        return sendResponse(res, successMessages.MARK_SEEN);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export async function seenSingleNotification(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await Notification.updateOne({ _id: id }, { seen: true });
        return sendResponse(res, successMessages.MARK_SEEN);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}
