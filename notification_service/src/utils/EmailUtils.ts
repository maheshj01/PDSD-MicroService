// src/utils/emailUtils.ts
import nodemailer from 'nodemailer';

class EmailUtils {

  static async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      // Ensure that environment variables are set for email configuration
      const emailConfig = {
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      };
      console.log('Email config:', emailConfig);
      console.log(to, subject, body);

      // Sanitize input to prevent CRLF injection
      to = to.replace(/[\r\n]+/g, ''); // Remove any newline characters
      subject = subject.replace(/[\r\n]+/g, '');
      body = body.replace(/[\r\n]+/g, '');

      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport(emailConfig);

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: body,
      };

      // Send email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Error sending email');
    }
  }

  static getEmailContent(userName: string, bookTitle: string, dueDate: String): string {
    return `Dear ${userName},\n\nWe hope this message finds you well. As the due date for the book "${bookTitle}" approaches (Due Date: ${dueDate}), we kindly remind you to return it at your earliest convenience. Your prompt attention to this matter is greatly appreciated. Thank you.`;
  }

  static formatToCustomString(date: Date, format: string): string {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

}

export default EmailUtils;
