// src/services/bookService.ts
import { QueryResult } from 'pg';
import { pool } from '../config/config';
import Book from '../models/Book';

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

    static async placeHoldOnBook(bookId: number): Promise<void> {
        const query = 'UPDATE books SET available_copies = available_copies - 1 WHERE id = $1';
        const values = [bookId];
        await pool.query(query, values);
    }

    // Add more methods as needed for specific book-related operations

    // Example:
    // static async addBook(book: Book): Promise<void> {
    //   // Implement addBook logic
    // }

    // static async updateBook(book: Book): Promise<void> {
    //   // Implement updateBook logic
    // }

    // static async deleteBook(id: number): Promise<void> {
    //   // Implement deleteBook logic
    // }
}

export default BookService;