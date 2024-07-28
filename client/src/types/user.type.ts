export interface RegisterUserType {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface User {
    _id: string;
    name?: string;
    email: string;
    username: string;
    password: string;
    location?: string;
    profession?: string;
    bio?: string;
    logo?: string;
    followers?: { user: User }[];
    isVerified: boolean;
    otp?: string;
    otpExpires?: Date;
}

export interface Followers {
    user: User;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

