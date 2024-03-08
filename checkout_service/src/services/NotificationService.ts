// src/services/NotificationService.ts

import axios from 'axios';

export enum NotificationType {
    RENEWAL = 'renewal',
    RETURN = 'return',
    DUE_DATE = 'due_date',
    CHECKOUT = 'checkout',
}

export class NotificationService {
    public async sendNotification(
        user_id: string,
        book_id: string,
        due_date: Date | null,
        type: NotificationType
    ): Promise<boolean> {
        try {
            let message = '';
            let user = null;

            // Fetch user details from User service
            const userApiUrl = process.env.USER_SERVICE_BASE_URL + `/api/user/${user_id}`; // Replace with the correct API endpoint
            console.log('Fetching user details...', userApiUrl);
            const userResp = await axios.get(userApiUrl);

            if (userResp.status === 200) {
                user = userResp.data;
                console.log('User details:', user);
            } else {
                throw new Error('Failed to fetch user details');
            }

            switch (type) {
                case NotificationType.RENEWAL:
                    message = `Dear ${user.fullName}, you have successfully renewed the book with ID: ${book_id}.`;
                    break;
                case NotificationType.RETURN:
                    message = `Dear ${user.fullName}, you have successfully returned the book with ID: ${book_id}.`;
                    break;
                case NotificationType.DUE_DATE:
                    message = `Dear ${user.fullName}, the book with ID: ${book_id} is due on ${due_date}.`;
                    break;
                case NotificationType.CHECKOUT:
                    message = `Dear ${user.fullName}, you have successfully checked out the book with ID: ${book_id}.`;
                    break;
                default:
                    throw new Error('Invalid notification type');
            }

            const notificationApiUrl = process.env.NOTIFICATION_SERVICE_BASE_URL + '/api/notifications/send-email'; // Replace with the correct API endpoint
            const requestBody = {
                email: user.email,
                subject: 'Library Notification',
                body: message,
            };

            console.log('Sending notification...', notificationApiUrl);
            const resp = await axios.post(notificationApiUrl, requestBody);

            if (resp.status !== 200) {
                throw new Error('Failed to send notification');
            } else {
                console.log('Notification sent successfully');
            }

            return true;
        } catch (error: any) {
            console.error(`Error sending notification: ${error.message}`);
            throw new Error('Failed to send notification. Please try again.');
        }
    }
}
