// authController.ts
import { Request, Response } from 'express';
import authService from '../services/authService';
import User from '../models/User';
class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { username, password, role, name, school_id, contact_email, contact_phone, mailing_address } = req.body;
            // Check if required fields are provided

            const userModel = new User(username, password, role, name, school_id, contact_email, contact_phone, mailing_address);
            const errors = userModel.validate();
            if (errors.length > 0) {
                return res.status(400).json({ "Missing required fields": errors[0] });
            }

            // Call the authService to sign up the user
            const user = await authService.signUp(username, password, role, name, contact_email, school_id, contact_phone, mailing_address);

            // Check if the username is already taken
            if (!user) {
                return res.status(409).json({ error: 'Username already exists' });
            }

            // Return the newly registered user
            res.status(201).json({ user });
        } catch (error: any) {
            console.error(error);

            // Handle other errors with a generic message
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
