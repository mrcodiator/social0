import { ResponseMessages } from "../types/types";

export const successMessages: { [key: string]: ResponseMessages } = {
    USER_REGISTERED: {
        message: 'User registered successfully',
        success: true,
        status: 201,
    },
    USER_LOGGED_IN: {
        message: 'User logged in successfully',
        success: true,
        status: 200,
    },
    SUCCESS: {
        message: 'Success',
        success: true,
        status: 200,
    },
    OTP_VERIFIED: {
        message: 'OTP verified successfully',
        success: true,
        status: 200,
    },
    OTP_SENT: {
        message: 'OTP sent successfully',
        success: true,
        status: 200,
    },
    PASSWORD_CHANGED: {
        message: 'Password changed successfully',
        success: true,
        status: 200,
    },
    PROFILE_UPDATED: {
        message: 'Profile updated successfully',
        success: true,
        status: 200,
    },
    USER_DELETED: {
        message: 'User deleted successfully',
        success: true,
        status: 200,
    },
    POST_CREATED: {
        message: 'Post created successfully',
        success: true,
        status: 200,
    },
    POST_DELETED: {
        message: 'Post deleted successfully',
        success: true,
        status: 200,
    },
    POST_UPDATED: {
        message: 'Post updated successfully',
        success: true,
        status: 200,
    },
    POST_LIKED: {
        message: 'You liked the post!',
        success: true,
        status: 200,
    },
    POST_DISLIKED: {
        message: 'removed from the likes',
        success: true,
        status: 200,
    },
    COMMENT_CREATED: {
        message: 'Comment added!',
        success: true,
        status: 200,
    },
    COMMENT_DELETED: {
        message: 'Comment deleted!',
        success: true,
        status: 200,
    },
    COMMENT_UPDATED: {
        message: 'Comment updated successfully',
        success: true,
        status: 200,
    },

    FOLLOWED_USER: {
        message: 'User followed successfully',
        success: true,
        status: 200,
    },
    UNFOLLOWED_USER: {
        message: 'User unfollowed successfully',
        success: true,
        status: 200,
    },
    MARK_SEEN: {
        message: 'Notification marked as seen',
        success: true,
        status: 200,
    },

};
