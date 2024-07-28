import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { followSchema, IFollow } from './follow.model';

export interface IUser extends Document {
    name?: string;
    email: string;
    username: string;
    password: string;
    location?: string;
    profession?: string;
    bio?: string;
    logo?: string;
    isVerified: boolean;
    otp?: string;
    followers: IFollow[];
    otpExpires?: Date;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    profession: {
        type: String,
    },
    bio: {
        type: String
    },
    logo: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    followers: [followSchema],
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
}, {
    timestamps: true
});

// use pre to manage the hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

export const User = mongoose.model<IUser>('User', userSchema);
