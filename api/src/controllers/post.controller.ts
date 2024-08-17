import { Request, Response } from "express";
import { errorMessages } from "../helper/errorMessage";
import { successMessages } from "../helper/successMessage";
import { sendResponse } from "../lib/response";
import { Post } from "../models/post.model";
import mongoose from "mongoose";
import { Notification } from "../models/notification.model";
import { User } from "../models/user.model";
import { io } from "..";

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post
            .find({})
            .populate({
                path: "user",
                select: "_id username name logo"
            })
            .populate({
                path: "likes.user",
                select: "_id username name logo"
            })
            .populate({
                path: "comments.user",
                select: "_id username name logo"
            })
            .sort({ createdAt: -1 });

        return sendResponse(res, successMessages.SUCCESS, posts);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export const createPost = async (req: Request, res: Response) => {
    try {
        const { content, media } = req.body;
        const newPost = await Post.create({ content, media, user: req.user?.id });

        // console.log(newPost);

        const followers = await User.findById(req.user?.id).populate("followers.user");

        if (followers) {
            // create notification for the followers
            for (const follower of followers?.followers) {
                await Notification.create({
                    user: follower?.user,
                    type: "like",
                    message: `@${req.user?.username} just posted a new post`,
                    action: newPost?._id,
                });
            }
        }

        return sendResponse(res, successMessages.POST_CREATED, newPost);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        const deletedPost = await Post.findOneAndDelete({ _id: id, user: userId });
        return sendResponse(res, successMessages.POST_DELETED, deletedPost);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content, media } = req.body;
        const updatedPost = await Post.findOneAndUpdate({ _id: id }, { content, media }, { new: true });
        return sendResponse(res, successMessages.POST_UPDATED, updatedPost);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export const getSinglePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const post = await Post
            .findOne({ _id: id })
            .populate({
                path: "user",
                select: "_id username name logo"
            })
            .populate({
                path: "likes.user",
                select: "_id username name logo"
            })
            .populate({
                path: "comments.user",
                select: "_id username name logo"
            });
        return sendResponse(res, successMessages.SUCCESS, post);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}


export const likePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Check if the post already has a like from this user
        const post = await Post.findOne({ _id: id, "likes.user": userObjectId });
        if (post) {
            return sendResponse(res, errorMessages.POST_ALREADY_LIKED);
        }

        // Add the like to the post
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $push: { likes: { user: userObjectId } } },
            { new: true }
        );
        // Check if the liker is not the post owner
        if (updatedPost?.user.toString() !== userId) {
            await Notification.create({
                user: updatedPost?.user,
                type: "like",
                message: `@${req.user?.username} liked your post`,
                action: updatedPost?._id,
            });

            // console.log("NEW NOTIFICATION: ", newNotification);

        }

        return sendResponse(res, successMessages.POST_LIKED, updatedPost);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
};

export const dislikePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        // console.log(id, userId);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const post = await Post.findOne({ _id: id, "likes.user": userObjectId });
        // console.log(post);

        if (!post) {
            return sendResponse(res, errorMessages.POST_NOT_LIKED);
        }

        const dislikedPost = await Post.findByIdAndUpdate(
            id,
            { $pull: { likes: { user: userObjectId } } },
            { new: true }
        );

        // delete notification
        const deletedNotification = await Notification.findOneAndDelete({
            action: id, // Match the post ID used in the likePost function
            user: post.user, // Match the user who received the notification
        });

        io.emit("delete-notification", deletedNotification?._id);

        // console.log("DELETED NOTIFICATION: ", deletedNotification);


        return sendResponse(res, successMessages.POST_DISLIKED, dislikedPost);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export const createComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        const { text } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return sendResponse(res, errorMessages.POST_NOT_FOUND);
        }

        const newComment = await Post.findByIdAndUpdate(
            { _id: id },
            { $push: { comments: { user: userId, text } } },
            { new: true }
        );

        // Check if the commenter is not the post owner
        if (post.user.toString() !== userId) {
            await Notification.create({
                user: post.user,
                type: "comment",
                message: `@${req.user?.username} commented on your post`,
                action: newComment?._id,
            });
        }

        return sendResponse(res, successMessages.COMMENT_CREATED, newComment);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { commentId } = req.body;
        const userId = req.user?.id

        // console.log(id, commentId, userId);

        // check if comment belongs to the user
        const comment = await Post.findOneAndUpdate(
            { _id: id, "comments._id": commentId, "comments.user": userId },
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        if (!comment) {
            return sendResponse(res, errorMessages.COMMENT_NOT_FOUND);
        }

        // delete notification
        const deletedNotification = await Notification.findOneAndDelete({
            action: comment._id,
            user: comment.user._id
        })

        // console.log("DELETED NOTIFICATION: ", deletedNotification);


        io.emit("delete-notification", deletedNotification?._id);

        return sendResponse(res, successMessages.COMMENT_DELETED, comment);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

