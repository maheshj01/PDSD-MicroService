// src/utils/emailUtils.ts
import nodemailer from 'nodemailer';

class EmailUtils {
  static async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      // Use environment variables to store sensitive information
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Use environment variable
          pass: process.env.EMAIL_PASSWORD, // Use environment variable or app-specific password
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER, // Use environment variable
        to,
        subject,
        text: body,
      };

      // Send email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}
export default EmailUtils;
