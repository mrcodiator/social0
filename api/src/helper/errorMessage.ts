import { ResponseMessages } from "../types/types";


export const errorMessages: { [key: string]: ResponseMessages } = {
    USER_NOT_FOUND: {
        message: 'User not found',
        success: false,
        status: 404,
    },
    INVALID_CREDENTIALS: {
        message: 'Invalid credentials',
        success: false,
        status: 401,
    },
    USER_ALREADY_EXISTS: {
        message: 'User already exists',
        success: false,
        status: 409,
    },
    USERNAME_ALREADY_EXISTS: {
        message: 'Username already exists',
        success: false,
        status: 409,
    },
    SERVER_ERROR: {
        message: 'Something went wrong',
        success: false,
        status: 500,
    },
    INCORRECT_PASSWORD: {
        message: 'Incorrect password! please try again',
        success: false,
        status: 401,
    },
    INVALID_OTP: {
        message: 'Invalid OTP',
        success: false,
        status: 401,
    },
    OTP_EXPIRED: {
        message: 'OTP expired',
        success: false,
        status: 401,
    },
    UNAUTHORIZED: {
        message: 'Unauthorized',
        success: false,
        status: 401,
    },
    SESSION_EXPIRED: {
        message: 'Session expired',
        success: false,
        status: 401,
    },
    USER_NOT_VERIFIED: {
        message: 'Please verify your account',
        success: false,
        status: 401,
    },
    POST_ALREADY_LIKED: {
        message: 'Post already liked',
        success: false,
        status: 401,
    },
    COMMENT_NOT_FOUND: {
        message: 'Comment not found',
        success: false,
        status: 404,
    },
    USER_ALREADY_FOLLOWING: {
        message: 'User already following',
        success: false,
        status: 401,
    },
    CANT_FOLLOW_SELF: {
        message: 'Cant follow yourself',
        success: false,
        status: 401,
    },
}