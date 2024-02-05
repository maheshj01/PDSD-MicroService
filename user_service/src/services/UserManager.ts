// src/controllers/UserManager.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserRepository from '../services/UserRepository';
import RoleManager from '../services/RoleManager';
import UserValidator from '../services/UserValidator';
import SessionManager from '../services/SessionManager';
import User from '../models/User';
import AuthenticationService from '../services/AuthenticationService';
class UserManager {

    async registerUser(req: Request, res: Response): Promise<void> {
        try {
            // Assume userRole is 'librarian' for registration (adjust based on your requirements)
            const { username, email, full_name, school_id, mailing_address, password, phone_number, user_role } = req.body;
            const newUser = new User({
                username: username,
                email: email,
                fullName: full_name,
                passwordHash: password,
                userRole: user_role,
                schoolId: school_id,
                mailingAddress: mailing_address,
                phoneNumber: phone_number,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            try {
                UserValidator.validateInput(newUser);
            } catch (error: any) {
                // Catch specific validation errors and send appropriate response
                res.status(400).json({ error: error.message });
                return;
            }
            // Validate and hash user-provided password
            const hashedPassword = await UserManager.validateAndHashPassword(password);
            newUser.passwordHash = hashedPassword!;
            if (!hashedPassword) {
                res.status(400).json({ error: 'Invalid password' });
                return;
            }
            // Store user in the database
            await UserRepository.storeUser(newUser);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error: any) {
            console.error('Error registering user:', error);
            if (error.code === '23505') {
                res.status(400).json({ error: error.detail });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    private static generateRandomPassword(): string {
        return Math.random().toString(36).slice(2);
    }

    private static async validateAndHashPassword(password: string): Promise<string | null> {
        // Validate password
        if (!UserValidator.validatePassword(password)) {
            return null;
        }

        // Hash password
        return await bcrypt.hash(password, 10);
    }

    async authenticateUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;

            // Validate input
            if (!username || !password) {
                res.status(400).json({ error: 'Username/email and password are required' });
                return;
            }

            // Authenticate user
            const sessionToken = await AuthenticationService.handleAuthentication(username, password);
            console.log('sessionToken:', sessionToken?.token_value);
            console.log('sessionToken userId:', sessionToken?.user_id);
            if (sessionToken) {
                res.status(200).json({ token: sessionToken });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    // loggedInUser is the user making the request
    async manageProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;

            const { username, mailing_address, phone_number } = req.body;

            // Retrieve user from the database
            const existingUser = await UserRepository.retrieveUserById(userId);

            if (!existingUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            // Update user properties
            existingUser.username = username || existingUser.username;
            existingUser.mailingAddress = mailing_address || existingUser.mailingAddress;
            existingUser.phoneNumber = phone_number || existingUser.phoneNumber;

            // Update user in the database
            await UserRepository.updateUser(existingUser);

            res.status(200).json({ message: 'User profile updated successfully' });
        } catch (error) {
            console.error('Error managing user profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;

            const user = await UserRepository.retrieveUserById(userId);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.status(200).json(user);
        } catch (error) {
            console.error('Error retrieving user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;

            const { username, email, full_name, school_id, mailing_address, password, phone_number, user_role } = req.body;

            // Retrieve user from the database
            const existingUser = await UserRepository.retrieveUserById(userId);

            if (!existingUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            // Update user properties
            existingUser.username = username || existingUser.username;
            existingUser.email = email || existingUser.email;
            existingUser.fullName = full_name || existingUser.fullName;
            existingUser.schoolId = school_id || existingUser.schoolId;
            existingUser.mailingAddress = mailing_address || existingUser.mailingAddress;
            existingUser.phoneNumber = phone_number || existingUser.phoneNumber;
            existingUser.userRole = user_role || existingUser.userRole;

            // Update user in the database
            await UserRepository.updateUser(existingUser);

            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async expireOldLogins(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            // Expire old logins
            SessionManager.expireOldSessions(userId);

            res.status(200).json({ message: 'Old logins expired successfully' });
        } catch (error) {
            console.error('Error expiring old logins:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async logout(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;

            // Expire current session
            SessionManager.expireOldSessions(userId);

            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Error logging out user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;

            const { currentPassword, newPassword } = req.body;

            // Retrieve user from the database
            const existingUser = await UserRepository.retrieveUserById(userId);

            if (!existingUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            // Validate current password
            const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.passwordHash);

            if (!isPasswordValid) {
                res.status(401).json({ error: 'Invalid current password' });
                return;
            }

            // Validate and hash new password
            const newPasswordHash = await UserManager.validateAndHashPassword(newPassword);

            if (!newPasswordHash) {
                res.status(400).json({ error: 'Invalid new password' });
                return;
            }

            // Update user password in the database
            existingUser.passwordHash = newPasswordHash;
            await UserRepository.updateUser(existingUser);

            res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            console.error('Error changing password:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new UserManager();
