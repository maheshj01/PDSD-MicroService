// src/services/bookService.ts
import { QueryResult } from 'pg';
import { pool } from '../config/config';
import Book from '../models/Book';
import axios from 'axios';

class BookService {
    static async searchBooks(params: any): Promise<Book[]> {
        try {
            // Construct a dynamic query based on the provided parameters
            const { title, id, category } = params;
            const queryParams: string[] = [];
            const queryValues: any[] = [];

            if (title) {
                queryParams.push('title ILIKE $1');
                queryValues.push(`%${title}%`);
            }

            if (id) {
                queryParams.push('id = $2');
                queryValues.push(id);
            }

            if (category) {
                queryParams.push('category ILIKE $3');
                queryValues.push(`%${category}%`);
            }

            const query = `
            SELECT *
            FROM books
            ${queryParams.length > 0 ? 'WHERE ' + queryParams.join(' OR ') : ''}
          `;

            const result: QueryResult = await pool.query(query, queryValues);

            return result.rows.map(
                (row) =>
                    new Book(
                        row.id,
                        row.title,
                        row.author,
                        row.category,
                        row.ISBN,
                        row.publication_date,
                        row.available_copies,
                        row.location
                    )
            );
        } catch (error) {
            console.error('Error in searchBooks:', error);
            throw error; // Rethrow the error for centralized error handling
        }
    }

    static async getBookById(id: number): Promise<Book | null> {
        const query = 'SELECT * FROM books WHERE id = $1';
        const values = [id];
        const result: QueryResult = await pool.query(query, values);

        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Book(
                row.id,
                row.title,
                row.author,
                row.category,
                row.ISBN,
                row.publication_date,
                row.available_copies,
                row.location
            );
        }

        return null;
    }

    static async updateCopies(bookId: number, action: 'add' | 'remove'): Promise<boolean> {
        try {
            console.log("service bookId:", typeof bookId);
            // Ensure bookId is a positive integer
            if (!Number.isInteger(bookId) || bookId <= 0) {
                console.error('Invalid bookId provided for updateCopies');
                return false;
            }

            console.log("service action:", action, 'bookId:', bookId);

            // Check if the book exists
            const checkBook = await pool.query('SELECT available_copies FROM books WHERE id = $1', [bookId]);

            if (checkBook.rows.length === 0) {
                console.error('Book not found for updateCopies');
                return false;
            }

            // Determine the operation based on the action parameter
            const operation = action === 'add' ? '+' : '-';

            // Perform the necessary database update
            const result = await pool.query(
                `UPDATE books SET available_copies = CASE WHEN available_copies > 0 THEN available_copies ${operation} 1 ELSE 0 END WHERE id = $1 RETURNING *`,
                [bookId]
            );

            if (result.rows.length > 0) {
                // Update successful
                console.log('Copies updated successfully');
                return true;
            } else {
                // Unexpected scenario, possibly a database issue
                console.error('Unexpected issue in updateCopies');
                return false;
            }
        } catch (error) {
            console.error('Error in updateCopies:', error);
            return false;
        }
    }

}

export default BookService;