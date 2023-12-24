import { Request, Response } from 'express';
import NotificationService from '../services/NotificationService';

class NotificationController {
    static async sendEmailNotification(req: Request, res: Response): Promise<void> {
        try {
            // Extract necessary data from the request (e.g., userId)
            const { userId } = req.body;
            const token = req.header('Authorization')?.split(' ')[1];
            // Send email notification
            await NotificationService.sendEmailNotification(userId);

            res.status(200).json({ message: 'Email notification sent successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async sendInAppNotification(req: Request, res: Response): Promise<void> {
        try {
            // Extract necessary data from the request (e.g., userId)
            const { userId } = req.body;

            // Send in-app notification
            await NotificationService.sendInAppNotification(userId);

            res.status(200).json({ message: 'In-app notification sent successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default NotificationController;
