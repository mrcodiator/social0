import { Response } from 'express';
import { ResponseMessages } from '../types/types';

export const sendResponse = (res: Response, message: ResponseMessages, data?: any) => {
    return res.status(message.status).json({
        status: message.status,
        success: message.success,
        message: message.message,
        data: message.success ? data : undefined,
    });
};
