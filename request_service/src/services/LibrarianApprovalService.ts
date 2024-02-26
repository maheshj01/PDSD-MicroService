// src/services/LibrarianApprovalService.ts
import pool from '../database/dbConfig';
import RequestRepository from '../repositories/RequestRepository';

const UPDATE_REQUEST_STATE_QUERY = 'UPDATE requests SET status = $1 WHERE id = $2 RETURNING *';


class LibrarianApprovalService {

    static async updateBookRequest(requestId: number, newState: 'approved' | 'rejected'): Promise<Request> {
        // Implement the logic to update the request state in the database
        const result = await pool.query(UPDATE_REQUEST_STATE_QUERY, [newState, requestId]);
        return result.rows[0];
    }
}

export default LibrarianApprovalService;
