// middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import axios, { AxiosError } from 'axios';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userVerifyTokenUrl = `${process.env.USER_SERVICE_BASE_URL}/api/auth/verify-token`;
        const token = req.header('Authorization')?.split(' ')[1];

        const tokenVerificationResponse = await axios.post(userVerifyTokenUrl, {}, { headers: { Authorization: `Bearer ${token}` } });

        if (tokenVerificationResponse.status !== 200) {
            res.status(401).json({ error: 'Token verification failed', details: tokenVerificationResponse.data });
            return;
        }

        next();
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                const code = axiosError.response.status;
                let details: unknown = axiosError.response.data;

                // Type guard to check if details is an object
                if (typeof details === 'object' && details !== null) {
                    // Assuming details is an object with an 'error' property
                    const message = (details as { error?: string }).error || 'Internal Server Error';
                    res.status(code).json({ error: message, details });
                } else {
                    // Fallback if details is not an object
                    res.status(code).json({ error: 'Internal Server Error', details });
                }
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
