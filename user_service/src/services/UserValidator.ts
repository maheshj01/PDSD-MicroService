// src/services/UserValidator.ts
import User from '../models/User';

class UserValidator {
    validateInput(user: User): boolean {
        if (!this.validateFullName(user.fullName)) {
            throw new Error('Invalid full name');
        }

        if (!this.validateUserRole(user.userRole)) {
            throw new Error('Invalid user role');
        }

        if (!this.validateEmail(user.email)) {
            throw new Error('Invalid email');
        }

        if (!this.validatePassword(user.passwordHash)) {
            throw new Error('Invalid password');
        }

        if (!this.validatePhoneNumber(user.phoneNumber)) {
            throw new Error('Invalid phone number');
        }

        if (!this.validateUsername(user.username)) {
            throw new Error('Invalid username');
        }

        return true;
    }

    validateFullName(fullName: string): boolean {
        // Implement full name validation logic
        // For example, ensuring that the full name is not empty
        return fullName.trim() !== '';
    }
    validateUserRole(userRole: string): boolean {
        // Implement user role validation logic
        return ['patron', 'staff', 'librarian'].includes(userRole);
    }

    validateEmail(email: string): boolean {
        // Implement email validation
        return /^[a-zA-Z0-9._%+-]+@umassd\.edu$/.test(email);
    }

    validatePassword(password: string): boolean {
        // Implement password validation
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
    }

    validatePhoneNumber(phoneNumber: string): boolean {
        // Implement phone number validation
        return /^\d{10}$/.test(phoneNumber);
    }
    validateUsername(username: string): boolean {
        // Implement username validation logic
        // For example, ensuring that the username is not empty and has valid characters
        const validUsernamePattern = /^[a-zA-Z0-9_-]+$/;
        return validUsernamePattern.test(username);
    }

    validateSchoolId(schoolId: number): boolean {
        // Implement school ID validation
        return schoolId >= 0 && schoolId <= 9999999999;
    }
}

export default new UserValidator();
