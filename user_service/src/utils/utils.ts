import * as jwt from 'jsonwebtoken';

export function sanitizeInput(input: string): string {
    // Implement your custom sanitization logic here
    // Example: Replace any characters that are not alphanumeric
    return input.replace(/[^a-zA-Z0-9_]/g, '');
}

export const sanitizeEmail = (email: string): string | null => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        // Return the sanitized email
        return email.trim().toLowerCase();
    } else {
        return null; // Invalid email format
    }
};


export const sanitizePassword = (password: string): string | null => {
    // You can add additional password criteria or checks here
    // For example, minimum length, uppercase, lowercase, special characters, etc.

    if (password.length >= 8) {
        // Return the sanitized password
        return password.trim();
    } else {
        return null; // Password does not meet criteria
    }
};

export const sanitizePhoneNumber = (phoneNumber: string): string | null => {
    // Remove any non-numeric characters from the phone number
    const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // You can add additional phone number criteria or checks here
    // For example, minimum and maximum length, country code, etc.

    return sanitizedPhoneNumber;
};


const jwtSecret = process.env.JWT_SECRET || 'thisisadummysecretkey';

export const sanitizeJwtToken = (token: string): { valid: boolean; payload: any } => {
    try {
        // Verify the token's signature
        const decoded = jwt.verify(token, jwtSecret);

        // Optionally, you can perform additional checks on the decoded payload
        // For example, checking if the user is banned or has the necessary roles

        return { valid: true, payload: decoded };
    } catch (error) {
        console.error('Error during JWT token verification:', error);
        return { valid: false, payload: null };
    }
};