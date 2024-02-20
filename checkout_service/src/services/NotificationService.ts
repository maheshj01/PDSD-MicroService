// src/services/NotificationService.ts

import axios from 'axios';

export class NotificationService {
    public async sendNotification(user_id: string, book_id: string, due_date: Date, message: string): Promise<void> {
        try {
            const notificationApiUrl = process.env.NOTIFICATION_SERVICE_BASE_URL + '/api/notification/send-email'; // Replace with the correct API endpoint
            const requestBody = {
                user_id,
                book_id,
                due_date,
                message,
            };

            await axios.post(notificationApiUrl, requestBody);

            console.log(`Notification sent successfully: ${message}`);
        } catch (error: any) {
            console.error(`Error sending notification: ${error.message}`);
            throw new Error('Failed to send notification. Please try again.');
        }
    }
}
