// src/services/SessionManager.ts
import Database from '../utils/Database';

class SessionManager {
    async expireOldSessions(userId: string): Promise<void> {
        try {
            // Expire old sessions for the given user ID
            const expireSessionsQuery = `
                UPDATE tokens
                SET expiration_time = CURRENT_TIMESTAMP
                WHERE user_id = $1 AND expiration_time > CURRENT_TIMESTAMP
            `;

            const values = [userId];

            await Database.executeQuery(expireSessionsQuery, values);
        } catch (error) {
            console.error('Error expiring old sessions:', error);
            throw new Error('Failed to expire old sessions');
        }
    }
}

export default new SessionManager();
