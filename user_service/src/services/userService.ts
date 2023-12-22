// userService.ts
import pool from '../db';
import { sanitizeEmail, sanitizeInput, sanitizePassword, sanitizePhoneNumber, sanitizeSchoolId } from '../utils/utils';
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
        const { username, password, role, name, school_id, contact_email, contact_phone, mailing_address } = user;
        const result = await pool.query(
            'INSERT INTO users (username, password, role, name, school_id, contact_email, contact_phone, mailing_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [sanitizeInput(username), sanitizePassword(password), sanitizeInput(role), name, sanitizeSchoolId(school_id), sanitizeEmail(contact_email), sanitizePhoneNumber(contact_phone), mailing_address]
        );
        return result.rows[0];
    }

    async updateUser(id: number, updatedUser: any) {
        const fieldsToUpdate: string[] = [];
        const values: any[] = [];
        console.log('Updating user s', id, updatedUser);
        var count = 1;
        // Extract fields from the updatedUser object and construct the SET clause dynamically
        if (updatedUser.username) {
            fieldsToUpdate.push('username = $' + count);
            count++;
            values.push(sanitizeInput(updatedUser.username));
        }
        if (updatedUser.password && updatedUser.password.length > 0) {
            fieldsToUpdate.push('password = $' + count);
            count++;
            values.push(sanitizePassword(updatedUser.password));
        }
        if (updatedUser.role) {
            fieldsToUpdate.push('role = $' + count);
            count++;
            values.push(sanitizeInput(updatedUser.role));
        }
        if (updatedUser.school_id) {
            fieldsToUpdate.push('school_id = $' + count);
            count++;
            values.push(sanitizeSchoolId(updatedUser.school_id));
        }
        if (updatedUser.name) {
            fieldsToUpdate.push('name = $' + count);
            count++;
            values.push(updatedUser.name);
        }
        if (updatedUser.contact_email) {
            fieldsToUpdate.push('contact_email = $' + count);
            count++;
            values.push(sanitizeEmail(updatedUser.contact_email));
        }
        if (updatedUser.contact_phone) {
            fieldsToUpdate.push('contact_phone = $' + count);
            count++;
            values.push(sanitizePhoneNumber(updatedUser.contact_phone));
        }
        if (updatedUser.mailing_address) {
            fieldsToUpdate.push('mailing_address = $' + count);
            count++;
            values.push(updatedUser.mailing_address);
        }
        console.log('fieldsToUpdate', fieldsToUpdate);
        console.log('values', values);
        // Construct the dynamic SQL query
        const updateQuery = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = $${values.length + 1} RETURNING *`;

        // Execute the query with dynamic values
        const result = await pool.query(updateQuery, [...values, id]);

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
