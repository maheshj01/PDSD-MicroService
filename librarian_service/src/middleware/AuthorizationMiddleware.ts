import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

class AuthorizationMiddleware {
    static checkLibrarianPrivileges() {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const token = req.headers.authorization?.split(' ')[1];

                // Validate input
                if (!token) {
                    res.status(400).json({ error: 'Token is required' });
                    return;
                }

                // Call the authenticateUserByRole API from UserService
                const roleCheckResponse = await axios.post(process.env.USER_SERVICE_BASE_URL + '/api/user/authenticate-by-role', {
                    token,
                    requiredRole: 'librarian', // Change this to the required role
                });

                if (roleCheckResponse.status === 200) {
                    // User has the required role, proceed to the next middleware or route
                    next();
                } else {
                    res.status(403).json({ error: 'User does not have the required role' });
                }
            } catch (error) {
                console.error('Error checking librarian privileges:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        };
    }
}

export default AuthorizationMiddleware;
