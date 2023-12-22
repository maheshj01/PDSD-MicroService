// src/controllers/LibrarianUserController.ts

import { Request, Response } from 'express';
import UserModel from '../models/User';
import UserService from '../services/UserService';

class LibrarianUserController {

    static async registerUser(req: Request, res: Response): Promise<void> {
        try {
            // Extract user information from the request body
            const {
                username,
                role,
                name,
                school_id,
                contact_email,
                contact_phone,
                mailing_address
            } = req.body;

            // Generate a default password for the user (you may want to implement a more secure method)
            const password = LibrarianUserController.generateDefaultPassword();

            // Validate user input using UserModel
            const newUser = new UserModel(username, password, role, name, school_id, contact_email, contact_phone, mailing_address);

            // Check if user input is valid
            if (!newUser.isValid()) {
                res.status(400).json({ error: 'Invalid user information. Please provide all required fields.' });
                return;
            }
            // Make a request to the User Service to register the new user
            const response = await UserService.registerUser(newUser);

            // Check the response status from the User Service
            if (response.status === 201) {
                res.status(201).json({ message: 'User successfully registered', userData: response.data });
            } else {
                res.status(response.status).json({ error: 'Failed to register user', userData: response.data });
            }
        } catch (error: any) {
            // Handle errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async editUser(req: Request, res: Response): Promise<void> {
        try {
            // Extract updated user information from the request body
            const {
                username,
                role,
                name,
                password,
                school_id,
                contact_email,
                contact_phone,
                mailing_address
            } = req.body;

            // Validate user input using UserModel
            const updatedUser = new UserModel(username, password, role, name, school_id, contact_email, contact_phone, mailing_address);
            // if (!updatedUser.isEditValid()) {
            //     res.status(400).json({ error: 'Invalid user information' });
            //     return;
            // }

            // Extract user ID from the request parameters
            const userId = req.params.userId;
            const response = await UserService.editUser(userId, updatedUser);

            // Check the response status from the User Service
            if (response.status === 200) {
                res.status(200).json({ message: 'User details updated successfully' });
            } else {
                res.status(500).json({ error: 'Failed to update user details' });
            }
        } catch (error: any) {
            // Handle errors
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    private static generateDefaultPassword(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let password = '';

        for (let i = 0; i < 12; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }

        return password;
    }
}

export default LibrarianUserController;
