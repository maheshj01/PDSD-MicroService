// src/middleware/roleMiddleware.ts

import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const userVerifyRoleUrl = `${process.env.USER_SERVICE_BASE_URL}/api/auth/verify-role`;

export const verifyUserRole = async (token: string, roles: string[]): Promise<boolean> => {
    try {
        const response = await axios.post(
            userVerifyRoleUrl,
            { roles }, // Send an array of roles
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.status === 200;
    } catch (error) {
        console.error('Error verifying user role:', error);
        return false;
    }
};

export const roleMiddleware = (roles: string | string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userRoles = Array.isArray(roles) ? roles : [roles];
        const isAnyRoleValid = await verifyUserRole(token, userRoles);

        if (isAnyRoleValid) {
            next();
        } else {
            return res.status(403).json({ error: 'Access denied. Insufficient privileges.' });
        }
    };
};
