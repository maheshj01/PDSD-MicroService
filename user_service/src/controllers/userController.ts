// userController.ts
import express from 'express';
import userService from '../services/userService';

class UserController {
    async getAllUsers(req: express.Request, res: express.Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUserById(req: express.Request, res: express.Response) {
        const userId = parseInt(req.params.id, 10);

        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async createUser(req: express.Request, res: express.Response) {
        const newUser = req.body;
        console.log("creating new user", newUser);
        try {
            const user = await userService.createUser(newUser);
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async updateUser(req: express.Request, res: express.Response) {
        const userId = parseInt(req.params.id, 10);
        const updatedUser = req.body;

        try {
            const user = await userService.updateUser(userId, updatedUser);

            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async deleteUser(req: express.Request, res: express.Response) {
        const userId = parseInt(req.params.id, 10);

        try {
            const deletedUser = await userService.deleteUser(userId);

            if (!deletedUser) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.status(200).json({ message: 'User deleted successfully' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new UserController();
