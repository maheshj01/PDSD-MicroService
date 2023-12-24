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
}

export default EmailUtils;
