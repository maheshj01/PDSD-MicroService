// src/services/notificationService.ts
import axios from 'axios';
import EmailUtils from '../utils/EmailUtils';

class NotificationService {
    // ... (other methods)

    static async sendEmailNotification(userId: number,): Promise<void> {
        try {
            const token = process.env.ADMIN_LOGIN_TOKEN;
            const headers = { Authorization: `Bearer ${token}` };
            // Fetch user information using the User Service API
            const userResponse = await axios.get(`${process.env.USER_SERVICE_BASE_URL}/api/users/${userId}`,
                { headers }
            );
            const userData = userResponse.data;

            // Use the email template
            const subject = 'Due Date Approaching';
            const body = `Dear ${userData.name},\n\nYour due date is approaching. Please return the borrowed item soon.`;

            // Send email notification
            await EmailUtils.sendEmail(userData.contact_email, subject, body);
        } catch (error: any) {
            console.error(error);
            throw new Error('Error sending email notification');
        }
    }

    static async sendInAppNotification(userId: number): Promise<void> {
        try {
            // Fetch user information using the User Service API
            const userResponse = await axios.get(`${process.env.USER_SERVICE_BASE_URL}/api/users/${userId}`);
            const userData = userResponse.data;

            // Send in-app notification
            // Implement in-app notification logic

        } catch (error: any) {
            console.error(error);
            throw new Error('Error sending in-app notification');
        }
    }

    static async processDueDateNotifications(): Promise<void> {
        try {
            // Fetch overdue items from Checkout Service API
            const overdueItemsResponse = await axios.get(`${process.env.CHECKOUT_SERVICE_BASE_URL}/api/checkouts/reports/overdue-items`);
            const overdueItems = overdueItemsResponse.data;

            // Process overdue items and send notifications
            for (const item of overdueItems) {
                await this.sendEmailNotification(item.user_id);
                await this.sendInAppNotification(item.user_id);
            }

        } catch (error: any) {
            console.error(error);
            throw new Error('Error processing due date notifications');
        }
    }
}

export default NotificationService;
