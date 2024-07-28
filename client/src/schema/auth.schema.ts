import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).max(20, "Password must be less than 20 characters."),
})

export const signUpSchema = z.object({
    email: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }),
    username: z.string().min(4, {
        message: "Username must be at least 4 characters.",
    }).max(10, "Username must be less than 10 characters.")
        .refine((val) => /^[a-zA-Z0-9]+$/.test(val), {
            message: "Username can only contain letters and numbers",
        })
    ,
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).max(20, "Password must be less than 20 characters."),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).max(20, "Password must be less than 20 characters."),
    termAndConditions: z.boolean().default(false),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

export const forgotPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).max(20, "Password must be less than 20 characters."),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }).max(20, "Password must be less than 20 characters.")
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match.",
})

export const sendEmailSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
})

export const verifyOtpSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const editProfileSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters")
        .max(20, "Name must be less than 20 characters"),
    username: z.string().min(4, "Username must be at least 4 characters")
        .max(10, "Username must be less than 10 characters")
        .refine((val) => /^[a-zA-Z0-9]+$/.test(val), {
            message: "Username can only contain letters and numbers",
        }),
    bio: z.string().min(20, "Bio must be at least 20 characters")
        .max(2000, "Bio must be less than 2000 characters"),
    profession: z.string().min(4, "Please choose a profession")
        .max(20, "Profession must be less than 20 characters"),
    location: z.string().min(4, "Please choose a location")
        .max(50, "Location must be less than 50 characters"),
    logo: z.instanceof(File)
        .optional()
        .refine((file) => file === undefined || file.size <= MAX_UPLOAD_SIZE, {
            message: "'File size must be less than 3MB'"
        })
        .refine((file) => file === undefined || ACCEPTED_FILE_TYPES.includes(file.type), {
            message: 'File must be an Image'
        })
});


