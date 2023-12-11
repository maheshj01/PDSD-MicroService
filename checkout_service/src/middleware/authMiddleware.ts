// middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userVerifyTokenUrl = `${process.env.USER_SERVICE_BASE_URL}/api/auth/verify-token`;
        const token = req.header('Authorization')?.split(' ')[1];

        const tokenVerificationResponse = await axios.post(userVerifyTokenUrl, {}, { headers: { Authorization: `Bearer ${token}` } });

        if (tokenVerificationResponse.status !== 200) {
            res.status(401).json({ error: 'Token verification failed' });
            return;
        }

        next();
    } catch (error) {
        console.error('Error in verifyToken:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
