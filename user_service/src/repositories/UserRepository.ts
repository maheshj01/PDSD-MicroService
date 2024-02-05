// src/repositories/UserRepository.ts

import User from '../models/User';
import Database from '../utils/Database';
import { hashPassword } from '../utils/PasswordUtils';

export class UserRepository {
    async storeUser(username: string, email: string, password: string, fullName: string, userRole: string, schoolId?: number): Promise<void> {
        try {
            // Hash the password before storing in the database
            const hashedPassword = await hashPassword(password);

            const insertQuery = `
        INSERT INTO users (username, email, password, full_name, user_role, school_id)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;

            await Database.executeQuery(insertQuery, [username, email, hashedPassword, fullName, userRole, schoolId]);
        } catch (error: any) {
            throw new Error(`Error storing user in the database: ${error.message}`);
        }
    }

    async retrieveUserById(userId: number): Promise<User | null> {
        try {
            const selectQuery = `
            SELECT * FROM users
            WHERE user_id = $1`;

            const result = await Database.executeQuery(selectQuery, [userId]);

            if (result.rowCount! > 0) {
                return result.rows[0];
            }

            return null;
        } catch (error: any) {
            throw new Error(`Error retrieving user by ID from the database: ${error.message}`);
        }
    }

    async retrieveUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
        const selectQuery = `
      SELECT * FROM users
      WHERE username = $1 OR email = $1
    `;

        const result = await Database.executeQuery(selectQuery, [usernameOrEmail]);

        if (result.rowCount! > 0) {
            return result.rows[0];
        }

        return null;
    }

    async updateUser(user: User): Promise<void> {
        try {
            const updateQuery = `
        UPDATE users
        SET username = $1, email = $2, full_name = $3, user_role = $4, school_id = $5, mailing_address = $6, phone_number = $7, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $8
      `;

            await Database.executeQuery(updateQuery, [
                user.username,
                user.email,
                user.fullName,
                user.userRole,
                user.schoolId,
                user.mailingAddress,
                user.phoneNumber,
                user.userId,
            ]);
        } catch (error: any) {
            throw new Error(`Error updating user in the database: ${error.message}`);
        }
    }

    async deleteUser(userId: number): Promise<void> {
        try {
            const deleteQuery = `
        DELETE FROM users
        WHERE user_id = $1
      `;

            await Database.executeQuery(deleteQuery, [userId]);
        } catch (error: any) {
            throw new Error(`Error deleting user from the database: ${error.message}`);
        }
    }
}
