import { User } from "../models/user.model";
import { sendResponse } from "../lib/response";
import { successMessages } from "../helper/successMessage";
import { errorMessages } from "../helper/errorMessage";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Notification } from "../models/notification.model";

export const followUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        // check if user is following
        const user = await User.findOne({ _id: id, "followers.user": userId });
        if (user) {
            return sendResponse(res, errorMessages.USER_ALREADY_FOLLOWING);
        }

        // check if user follow himself
        if (id === userId) {
            return sendResponse(res, errorMessages.CANT_FOLLOW_SELF);
        }

        // add follower
        const newFollower = await User.findOneAndUpdate(
            { _id: id },
            { $push: { followers: { user: userId } } },
            { new: true }
        );

        await Notification.create({
            user: id,
            type: "follow",
            message: `@${req.user?.username} started following you`,
            action: req.user?.username,
        })

        return sendResponse(res, successMessages.FOLLOWED_USER, newFollower);

    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export const removeFollower = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        // check if user is following
        const user = await User.findOne({ _id: id, "followers.user": userId });
        if (!user) {
            return sendResponse(res, errorMessages.USER_NOT_FOLLOWING);
        }

        // remove follower
        const newFollower = await User.findOneAndUpdate(
            { _id: id },
            { $pull: { followers: { user: userId } } },
            { new: true }
        );

        await Notification.create({
            user: id,
            type: "follow",
            message: `@${req.user?.username} unfollowed you`,
            action: req.user?.username,
        })

        return sendResponse(res, successMessages.UNFOLLOWED_USER, newFollower);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export const getFollowers = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("followers.user");
        return sendResponse(res, successMessages.SUCCESS, user?.followers);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export const getFollowing = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const users = await User.find({ 'followers.user': new mongoose.Types.ObjectId(id) });
        return sendResponse(res, successMessages.SUCCESS, users);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}
