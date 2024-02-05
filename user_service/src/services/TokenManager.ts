// src/services/TokenManager.ts
import jwt from 'jsonwebtoken';
import { QueryResult } from 'pg';
import Database from '../utils/Database';
import Token from '../models/Token';
import SessionManager from './SessionManager';
class TokenManager {
    private static TOKEN_EXPIRATION_DURATION = '24h';

    async generateToken(userId: number, userRole: string): Promise<Token> {
        try {
            const secret = process.env.JWT_SECRET as string;
            const tokenValue = jwt.sign({ userId, userRole }, secret, {
                expiresIn: TokenManager.TOKEN_EXPIRATION_DURATION,
            });

            // Expire old sessions for the given user ID
            await SessionManager.expireOldSessions(userId.toString());

            const expirationTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

            const insertTokenQuery = `
                INSERT INTO tokens (user_id, token_value, expiration_time)
                VALUES ($1, $2, $3)
                RETURNING token_id, user_id, token_value, expiration_time
            `;

            const values = [userId, tokenValue, expirationTime];

            const result: QueryResult = await Database.executeTransaction(insertTokenQuery, values);
            const row = result.rows[0];

            if (!row) {
                console.error('No row returned after inserting token into the database');
                throw new Error('Failed to generate token');
            }

            const token = new Token(
                row.token_id,
                row.user_id,
                row.token_value,
                row.expiration_time
            );

            return token;
        } catch (error) {
            console.error('Error generating token:', error);
            throw error;
        }
    }


    async validateToken(token: string): Promise<{ userId: number; userRole: string } | null> {
        try {
            const secret = process.env.JWT_SECRET as string;
            const decodedToken = jwt.verify(token, secret) as { userId: number; userRole: string };
            console.log("decoded=", decodedToken, "token=", token);
            // Validate if the token is still valid in the database (expiration_time > CURRENT_TIMESTAMP)
            const findUserByTokenQuery = `
                SELECT *
                FROM tokens
                WHERE token_value = $1 AND expiration_time > CURRENT_TIMESTAMP
            `;

            const values = [token];

            const result: QueryResult = await Database.executeQuery(findUserByTokenQuery, values);

            if (result.rows.length > 0) {
                return decodedToken;
            } else {
                console.log('token not found in database');
                return null;
            }
        } catch (error) {
            console.error('Error validating token:', error);
            return null;
        }
    }

    async deleteToken(token: string): Promise<void> {
        const deleteTokenQuery = 'DELETE FROM tokens WHERE token_value = $1';
        const values = [token];

        await Database.executeTransaction(deleteTokenQuery, values);
    }

}

export default new TokenManager();
