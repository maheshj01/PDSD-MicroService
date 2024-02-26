import { Request, Response } from 'express';
import { NotificationManager } from '../services/NotificationManager';
import { EmailService } from '../services/EmailService';

class NotificationController {
    private notificationManager!: NotificationManager;

    constructor() {
        this.notificationManager = new NotificationManager();
    }

    async sendNotification(req: Request, res: Response): Promise<void> {
        try {
            console.log('Sending email notification');
            const { email, subject, body } = req.body;
            await EmailService.sendEmailNotification(email, subject, body);

            res.status(200).json({ message: 'Email notification sent successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async sendInAppNotification(req: Request, res: Response): Promise<void> {
        try {
            // Extract necessary data from the request (e.g., userId)
            const { user_id, book_id, due_date } = req.body;

            // Send in-app notification
            // await NotificationService.sendInAppNotification(user_id, book_id, due_date);

            res.status(200).json({ message: 'In-app notification sent successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async manageNotificationPreferences(req: Request, res: Response): Promise<void> {
        try {
            const { user_id, email_enabled, in_app_enabled } = req.body;
            await this.notificationManager.manageNotificationPreferences(user_id, email_enabled, in_app_enabled);
            if (this.notificationManager == undefined) {
                console.log('Notification Manager is null');
            }
            res.status(200).json({ message: 'Notification preferences updated successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default NotificationController;
