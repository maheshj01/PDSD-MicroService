// src/middleware/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import TokenManager from '../services/TokenManager';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Token not provided' });
    }

    try {
        const userId = await TokenManager.validateToken(token);

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        // Attach user ID to the request for further processing in route handlers
        (req as any).userId = userId;

        next();
    } catch (error) {
        console.error('Error during token validation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
