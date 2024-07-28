import { Request, Response } from "express";
import { IUser, User } from "../models/user.model";
import { sendResponse } from "../lib/response";
import { errorMessages } from "../helper/errorMessage";
import { successMessages } from "../helper/successMessage";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { Post } from "../models/post.model";
import { sendEmailService } from "../services/email";

configDotenv();

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        // remove the current user from the list
        const users = await User
            .find({ _id: { $ne: userId } })
            .populate("followers.user")
            .select("-password")
            .sort({ createdAt: -1 });
        return sendResponse(res, successMessages.SUCCESS, users);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        // find existing user with email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("email already exists");
            return sendResponse(res, errorMessages.USER_ALREADY_EXISTS);
        }

        // find existing user with username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            console.log("username already exists");

            return sendResponse(res, errorMessages.USERNAME_ALREADY_EXISTS);
        }

        // create new user
        const user = new User({ email, username, password });
        await user.save();

        return sendResponse(res, successMessages.USER_REGISTERED);

    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.INTERNAL_SERVER_ERROR);
    }
};

export const checkUniqueUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return sendResponse(res, errorMessages.USERNAME_ALREADY_EXISTS);
        }
        return sendResponse(res, successMessages.SUCCESS);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        // console.log({ SECRET_KEY });

        const { email, password } = req.body;

        // console.log(email, password);

        const user = await User.findOne({ email });

        if (!user) {
            return sendResponse(res, errorMessages.INVALID_CREDENTIALS);
        }

        // compare password
        const match = await compare(password, user.password as string);
        if (!match) {
            return sendResponse(res, errorMessages.INCORRECT_PASSWORD);
        }

        if (user.isVerified === false) {
            return sendResponse(res, errorMessages.USER_NOT_VERIFIED, { verify: false });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1d' });

        // Include token in the response
        return sendResponse(res, successMessages.USER_LOGGED_IN, { token });

    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User
            .findById(req.user?.id)
            .populate("followers.user")
            .select("-password");
        return sendResponse(res, successMessages.SUCCESS, user);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;

        // console.log(username);


        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return sendResponse(res, errorMessages.USER_NOT_FOUND);
        }

        const posts = await Post.find({ user: user._id })
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

        const data = { user, posts }

        return sendResponse(res, successMessages.SUCCESS, data);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
};

export async function sendEmail(req: Request, res: Response) {
    try {
        const { email } = req.body;
        if (!email) {
            return sendResponse(res, errorMessages.INVALID_CREDENTIALS);
        }

        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(res, errorMessages.USER_NOT_FOUND);
        }

        // generate OTP
        // generate a random 6-digit number as OTP
        let otp;
        do {
            otp = Math.floor(100000 + Math.random() * 900000);
        } while (await User.exists({ otp }));

        // set otpExpires to 10 minutes from the current time
        // Date.now() gives the current time in milliseconds
        // 10 * 60 * 1000 gives the number of milliseconds in 10 minutes
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        // update otp and otpExpires in the user document and save it
        user.otp = otp.toString();
        await user.save();

        // console.log(user);

        // const send = await sendEmailService({ email: email, otp: user.otp });

        // if (!send) {
        //     return sendResponse(res, errorMessages.SERVER_ERROR);
        // }

        return sendResponse(res, successMessages.OTP_SENT);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export async function verifyOtp(req: Request, res: Response) {
    try {
        const { otp } = req.body;
        // console.log(otp);

        const user = await User.findOne({ otp: otp });

        // console.log(user);

        if (!user) {
            return sendResponse(res, errorMessages.USER_NOT_FOUND);
        }
        if (!otp || user.otp !== otp) {
            return sendResponse(res, errorMessages.INVALID_OTP);
        }
        if (user?.otpExpires && user.otpExpires < new Date()) {
            return sendResponse(res, errorMessages.OTP_EXPIRED);
        }

        // remove otp and otpExpires from the user document
        user.otp = undefined;
        user.otpExpires = undefined;

        user.isVerified = true;
        await user.save();

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1d' });

        // Include token in the response
        return sendResponse(res, successMessages.OTP_VERIFIED, { token });
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export async function changePassword(req: Request, res: Response) {
    try {
        const id = req.user?.id;

        // console.log({ userId: id });

        const { password } = req.body;

        const user = await User.findOne({ _id: id });

        if (!user) {
            return sendResponse(res, errorMessages.USER_NOT_FOUND);
        }

        // hash the password
        // const hashedPassword = await hash(password, 10);
        user.password = password;
        await user.save();

        return sendResponse(res, successMessages.PASSWORD_CHANGED);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}

export async function editProfile(req: Request, res: Response) {
    try {
        const id = req.user?.id;
        const { name, username, location, profession, bio, logo } = req.body;

        // console.log(req.body);

        const user = await User.findOne({ _id: id });

        if (!user) {
            return sendResponse(res, errorMessages.USER_NOT_FOUND);
        }

        // username validation
        if (user.username !== username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return sendResponse(res, errorMessages.USERNAME_ALREADY_EXISTS);
            }
        }

        const newUser = await User.findOneAndUpdate(
            { _id: id },
            { name, username, location, profession, bio, logo },
        )

        await newUser?.save();

        return sendResponse(res, successMessages.PROFILE_UPDATED);
    } catch (error) {
        console.log(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
}
