import { Request, Response } from 'express';
import NotificationService from '../services/NotificationService';
import EmailUtils from '../utils/EmailUtils';

class NotificationController {
    static async sendEmailNotification(req: Request, res: Response): Promise<void> {
        try {
            console.log('Sending email notification');
            // Extract necessary data from the request (e.g., userId)
            const { user_id, book_id, due_date, message } = req.body;
            // Format date to yyyy/mm/dd hh:mm
            const formattedDate = EmailUtils.formatToCustomString(new Date(due_date), 'yyyy/mm/dd hh:mm');
            // Send email notification
            await NotificationService.sendEmailNotification(user_id, book_id, formattedDate);

            res.status(200).json({ message: 'Email notification sent successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async sendInAppNotification(req: Request, res: Response): Promise<void> {
        try {
            // Extract necessary data from the request (e.g., userId)
            const { user_id, book_id, due_date } = req.body;

            // Send in-app notification
            await NotificationService.sendInAppNotification(user_id, book_id, due_date);

            res.status(200).json({ message: 'In-app notification sent successfully' });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default NotificationController;
