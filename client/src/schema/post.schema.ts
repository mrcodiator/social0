import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const postSchema = z.object({
    content: z.string().min(1, "content is required").max(2000, "Post text is too long"),
    media:
        z.instanceof(File)
            .refine((file) => file === undefined || file.size <= MAX_UPLOAD_SIZE, {
                message: "'File size must be less than 3MB'"
            })
            .refine((file) => file === undefined || ACCEPTED_FILE_TYPES.includes(file.type), {
                message: 'File must be an Image'
            })
});

export const commentSchema = z.object({
    text: z.string().min(1, "Comment is required"),
})
