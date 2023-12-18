import { Request, Response, NextFunction } from 'express';

export const checkUserRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.body.role;  // Assuming you have a user object in the request with a "role" property

        if (userRole === requiredRole) {
            next();
        } else {
            res.status(403).json({ error: 'Access denied. Insufficient privileges.' });
        }
    };
};