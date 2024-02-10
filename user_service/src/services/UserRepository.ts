// src/services/UserRepository.ts
import Database from '../utils/Database';
import User from '../models/User';
import { QueryResult } from 'pg';

class UserRepository {
    async deleteAllUsers(): Promise<void> {
        try {
            const deleteAllQuery = 'DELETE FROM users';
            await Database.executeQuery(deleteAllQuery, []);
        }
        catch (error: any) {
            throw new Error(`Failed to delete users: ${error.message}`);
        }
    }

    async storeUser(user: User): Promise<void> {
        const insertUserQuery = `
      INSERT INTO users
      (username, email, password, full_name, user_role, school_id, mailing_address, phone_number, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;

        const values = [
            user.username,
            user.email,
            user.password,
            user.fullName,
            user.userRole,
            user.schoolId,
            user.mailingAddress,
            user.phoneNumber,
            user.createdAt,
            user.updatedAt,
        ];

        console.log('values:', values);

        await Database.executeQuery(insertUserQuery, values);
    }

    async retrieveUserById(userId: string): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const values = [userId];

        const result: QueryResult = await Database.executeQuery(query, values);

        if (result.rows.length > 0) {
            return this.mapRowToUser(result.rows[0]);
        }
        return null;
    }

    async updateUser(user: User): Promise<void> {
        try {
            const updateUserQuery = `
            UPDATE users
            SET username = $1, email = $2, full_name = $3, user_role = $4, 
            school_id = $5, mailing_address = $6, phone_number = $7, updated_at = $8
            WHERE user_id = $9
          `;

            const values = [
                user.username,
                user.email,
                user.fullName,
                user.userRole,
                user.schoolId,
                user.mailingAddress,
                user.phoneNumber,
                new Date(),
                user.userId,
            ];

            await Database.executeQuery(updateUserQuery, values);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async updatePassword(userId: number, newPassword: string): Promise<boolean> {
        console.log('Updating password for user:', userId);
        const updatePasswordQuery = 'UPDATE users SET password = $1 WHERE user_id = $2';
        const values = [newPassword, userId];

        const result = await Database.executeQuery(updatePasswordQuery, values);
        if (result.rowCount === 0) {
            console.error('Error updating password');
            return false;
        } else {
            console.log('Password updated successfully');
            return true;
        }

    }

    async deleteUser(userId: number): Promise<void> {
        const deleteUserQuery = 'DELETE FROM users WHERE user_id = $1';
        const values = [userId];

        await Database.executeQuery(deleteUserQuery, values);
    }

    async retrieveUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
        const selectQuery = `
            SELECT *
            FROM users
            WHERE username = $1 OR email = $1`;

        const values = [usernameOrEmail];

        try {
            const result: QueryResult = await Database.executeQuery(selectQuery, values);

            if (result.rows.length > 0) {
                return this.mapRowToUser(result.rows[0]);
            }

            return null;
        } catch (error) {
            console.error('Error retrieving user by username or email:', error);
            throw error;
        }
    }

    private mapRowToUser(row: any): User {
        return new User({
            userId: row.user_id,
            username: row.username,
            email: row.email,
            password: row.password,
            fullName: row.full_name,
            userRole: row.user_role,
            schoolId: row.school_id,
            mailingAddress: row.mailing_address,
            phoneNumber: row.phone_number,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        });
    }
}

export default new UserRepository();
