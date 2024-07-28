import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from 'dotenv';
import { Request, Response } from 'express';
import { sendResponse } from '../lib/response';
import { successMessages } from '../helper/successMessage';
import { errorMessages } from '../helper/errorMessage';


configDotenv();

export async function uploadImage(req: Request, res: Response) {
    const file = req.file?.path;

    if (!file) {
        throw new Error('No file provided');
    }

    // console.log({ file });


    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        api_key: process.env.CLOUDINARY_API_KEY ?? "",
        api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
    });


    try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(file, {
            public_id: 'logo',
        });

        // console.log({ uploadResult });

        return sendResponse(res, successMessages.SUCCESS, { url: uploadResult.url });
    } catch (error) {
        console.error(error);
        return sendResponse(res, errorMessages.SERVER_ERROR);
    }
};

