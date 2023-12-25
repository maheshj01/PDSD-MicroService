// src/services/notificationService.ts
import axios from 'axios';
import EmailUtils from '../utils/EmailUtils';
import UserService from './UserService';

class NotificationService {
    // ... (other methods)

    static async sendEmailNotification(userId: number, bookId: number, dueDate: String): Promise<void> {
        try {
            // Fetch user information using the User Service API
            const userData = await UserService.getUserById(userId);

            // Fetch book information using the Book Service API
            const bookData = await UserService.getBookById(bookId);

            // Get email content with due_date
            const emailContent = EmailUtils.getEmailContent(userData.name, bookData.title, dueDate);
            const subject = `Reminder: Return of Borrowed Book due on ${dueDate}`;
            // Send email notification
            await EmailUtils.sendEmail(userData.contact_email, subject, emailContent);
        } catch (error: any) {
            console.error(error);
            throw new Error('Error sending email notification');
        }
    }

    static async sendInAppNotification(userId: number, bookId: number, dueDate: String): Promise<void> {
        try {
            // Fetch user information using the User Service API
            // Fetch user information using the User Service API
            const userData = await UserService.getUserById(userId);

            // Fetch book information using the Book Service API
            const bookData = await UserService.getBookById(bookId);

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
                const date = EmailUtils.formatToCustomString(new Date(item.due_date), 'yyyy/mm/dd hh:mm');
                await this.sendEmailNotification(item.user_id, item.book_id, date);
                await this.sendInAppNotification(item.user_id, item.book_id, date);
            }

        } catch (error: any) {
            console.error(error);
            throw new Error('Error processing due date notifications');
        }
    }
}

export default NotificationService;
