// userService.ts
import pool from '../db';
import { sanitizeEmail, sanitizeInput, sanitizePassword, sanitizePhoneNumber } from '../utils/utils';
class UserService {
    async getAllUsers() {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }

    async getUserById(id: number) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    async createUser(user: any) {
        const { username, password, role, name, contact_email, contact_phone, mailing_address } = user;
        const result = await pool.query(
            'INSERT INTO users (username, password, role, name, contact_email, contact_phone, mailing_address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [sanitizeInput(username), sanitizePassword(password), sanitizeInput(role), name, sanitizeEmail(contact_email), sanitizePhoneNumber(contact_phone), mailing_address]
        );
        return result.rows[0];
    }

    async updateUser(id: number, updatedUser: any) {
        const { username, password, role, name, contact_email, contact_phone, mailing_address } = updatedUser;

        const result = await pool.query(
            'UPDATE users SET username = $1, password = $2, role = $3, name = $4, contact_email = $5, contact_phone = $6, mailing_address = $7 WHERE id = $8 RETURNING *',
            [sanitizeInput(username), sanitizePassword(password), sanitizeInput(role), name, sanitizeEmail(contact_email), sanitizePhoneNumber(contact_phone), mailing_address, id]
        );
        return result.rows[0];
    }

    async deleteUser(id: number) {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }

    async getUserByUsername(username: string) {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    }

}

export default new UserService();
