// authController.ts
import { Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
    async signup(req: Request, res: Response) {
        try {
            const { username, password, role, name, contact_email, contact_phone, mailing_address } = req.body;

            const user = await authService.signUp(username, password, role, name, contact_email, contact_phone, mailing_address);

            if (!user) {
                return res.status(409).json({ error: 'Username already exists' });
            }

            res.status(201).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const token = await authService.logIn(username, password);

            if (!token) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new AuthController();
