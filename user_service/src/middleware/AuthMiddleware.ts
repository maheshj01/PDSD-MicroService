// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import TokenManager from '../services/TokenManager';

const authMiddleware = (allowedRoles: string[] = []) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: 'Unauthorized: No token provided' });
            return;
        }

        const decodedToken = await TokenManager.validateToken(token);
        if (!decodedToken) {
            res.status(401).json({ error: 'Unauthorized: Invalid token' });
            return;
        }

        // Check if user has required roles
        if (allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.userRole)) {
            res.status(403).json({ error: 'Forbidden: Insufficient role permissions' });
            return;
        }

        next();
    };
};

export default authMiddleware;
