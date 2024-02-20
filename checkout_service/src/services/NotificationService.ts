// src/services/NotificationService.ts

import axios from 'axios';

export enum NotificationType {
    RENEWAL = 'renewal',
    RETURN = 'return',
    DUE_DATE = 'due_date',
    CHECKOUT = 'checkout',
}
export class NotificationService {
    public async sendNotification(user_id: string, book_id: string, due_date: Date, type: NotificationType): Promise<void> {
        try {

            let message = '';
            switch (type) {
                case NotificationType.RENEWAL:
                    message = `You have successfully renewed the book with ID: ${book_id}.`;
                    break;
                case NotificationType.RETURN:
                    message = `You have successfully returned the book with ID: ${book_id}.`;
                    break;
                case NotificationType.DUE_DATE:
                    message = `The book with ID: ${book_id} is due on ${due_date}.`;
                    break;
                case NotificationType.CHECKOUT:
                    message = `You have successfully checked out the book with ID: ${book_id}.`;
                    break;
                default:
                    throw new Error('Invalid notification type');
            }

            const notificationApiUrl = process.env.NOTIFICATION_SERVICE_BASE_URL + '/api/notification/send-email'; // Replace with the correct API endpoint
            const requestBody = {
                user_id,
                book_id,
                due_date,
                message,
            };

            const resp = await axios.post(notificationApiUrl, requestBody);
            if (resp.status !== 200) {
                throw new Error('Failed to send notification');
            } else {
                console.log('Notification sent successfully');
            }
        } catch (error: any) {
            console.error(`Error sending notification: ${error.message}`);
            throw new Error('Failed to send notification. Please try again.');
        }
    }
}
