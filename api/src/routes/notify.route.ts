import { Router } from "express";
import { getNotifications, seenNotifications, seenSingleNotification } from "../controllers/notify.controller";

export const NotifyRouter = Router();

NotifyRouter.get("/", getNotifications);
NotifyRouter.put("/:id/seen", seenSingleNotification);
NotifyRouter.put("/seen-all", seenNotifications);