// src/services/requestService.ts
import pool from '../database/dbConfig';
import Request from '../models/Request';

class RequestService {
  static async submitRequest(user_id: number, book_title: string, book_author: string, justification: string): Promise<Request> {
    // Implement the logic to insert the request into the database
    const result = await pool.query(
      'INSERT INTO requests (user_id, book_title, book_author, justification) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, book_title, book_author, justification]
    );
    return result.rows[0];
  }

  // Add other service methods as needed
}

export default RequestService;
