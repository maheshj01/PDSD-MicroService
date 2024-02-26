import EmailUtils from "../utils/EmailUtils";
import UserService from "./UserService";

export class EmailService {
    async sendDueNotification(userId: string, bookId: string, dueDate: String): Promise<void> {
        try {
            if (!userId || !bookId || !dueDate) {
                throw new Error('Invalid input data');
            }
            // Fetch user information using the User Service API
            const userData = await UserService.getUserById(userId);

            // Fetch book information using the Book Service API
            const bookData = await UserService.getBookById(bookId);

            // Get email content with due_date
            const emailContent = EmailUtils.getBookDueEmailContent(userData.fullName, bookData.title, dueDate);
            const subject = `Reminder: Return of Borrowed Book due on ${dueDate}`;
            // Send email notification
            await EmailUtils.sendEmail(userData.email, subject, emailContent);
        } catch (error: any) {
            console.error(error);
            throw new Error('Error sending email notification');
        }
    }

    static async sendEmailNotification(email: string, subject: string, body: string): Promise<void> {
        try {
            // Send email notification
            await EmailUtils.sendEmail(email, subject, body);
        }
        catch (error: any) {
            console.error(error);
            throw new Error('Error sending email notification');
        }
    }

}