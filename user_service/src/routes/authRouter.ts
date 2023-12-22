// authRouter.ts
import express from 'express';
import authController from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import { sanitizeJwtToken } from '../utils/utils';
const authRouter = express.Router();

// POST /auth/signup
authRouter.post('/register', authController.register);

// POST /auth/login
authRouter.post('/login', authController.login);

// Example of a protected route
// GET /auth/protected
authRouter.get('/protected', authMiddleware, (req, res) => {
    // This route is protected by the authMiddleware
    res.json({ message: 'This is a protected route' });
});

authRouter.post('/verify-token', authMiddleware, (req, res) => {
    // This route can be used by other microservices to verify the token
    res.json({ message: 'Token is valid' });
});

authRouter.post('/verify-role', authMiddleware, (req, res) => {
    const tokenFromHeader = req.header('Authorization')?.split(' ')[1];

    if (!tokenFromHeader) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const { valid, payload } = sanitizeJwtToken(tokenFromHeader);
    const userRoles = req.body.roles; // Assuming the roles are sent as an array in the request body

    if (userRoles && userRoles.includes(payload.role)) {
        res.json({ message: 'Token is valid' });
    } else {
        res.status(401).json({ message: 'You are not authorized to access this route' });
    }
});

export default authRouter;
