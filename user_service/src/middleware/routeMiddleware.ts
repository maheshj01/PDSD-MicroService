import { Request, Response, NextFunction } from 'express';
import { sanitizeJwtToken } from '../utils/utils';

const jwtSecret = process.env.JWT_SECRET || 'thisisadummysecretkey';

// add a middleware to allow certain routes to be accessed only by admins

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const tokenFromHeader = req.header('Authorization')?.split(' ')[1];

    if (!tokenFromHeader) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const { valid, payload } = sanitizeJwtToken(tokenFromHeader);

    if (valid) {
        // Token is valid, and you can use the payload in your logic
        console.log('Valid token payload:', payload);

        // Optionally, you can set decoded information directly on req.locals or req.session
        // req.locals.user = payload;
        // req.session.user = payload;

        // check if the user is an admin
        if (payload.role === 'admin') {
            next();
        } else {
            res.status(401).json({ message: 'You are not authorized to access this route' });
        }
    } else {
        // Token is invalid or expired
        console.log('Invalid token');
        res.status(401).json({ message: 'Invalid token' });
    }
}