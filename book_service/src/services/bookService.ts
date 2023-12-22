// src/services/bookService.ts
import { QueryResult } from 'pg';
import { pool } from '../config/config';
import Book from '../models/Book';
import axios from 'axios';

class BookService {

    static async addBook(book: Book): Promise<Book> {
        try {
            // Basic input validation
            if (!book.title || !book.author || !book.ISBN) {
                throw new Error('Title, author, and ISBN are required fields');
            }

            // Additional validation as needed

            // Using parameterized queries to prevent SQL injection
            const result = await pool.query(
                'INSERT INTO books (title, author, category, isbn, publication_date, available_copies, total_copies, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [
                    book.title,
                    book.author,
                    book.category,
                    book.ISBN,
                    book.publicationDate,
                    book.availableCopies,
                    book.totalCopies,
                    book.location,
                ]
            );

            // Ensure the result.rows[0] is not null before returning
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error('Failed to add new book');
            }
        } catch (error) {
            console.error('Error in addBook:', error);
            throw error; // Rethrow the error to be caught by the controller
        }
    }

    static async updateBook(bookId: number, updatedBookData: Book): Promise<Book> {
        try {
            // Basic input validation
            if (!updatedBookData.title || !updatedBookData.author || !updatedBookData.ISBN) {
                throw new Error('Title, author, and ISBN are required fields');
            }

            // Additional validation as needed

            const result = await pool.query(
                'UPDATE books SET title = $1, author = $2, category = $3, isbn = $4, publication_date = $5, available_copies = $6, total_copies = $7, location = $8 WHERE id = $9 RETURNING *',
                [
                    updatedBookData.title,
                    updatedBookData.author,
                    updatedBookData.category,
                    updatedBookData.ISBN,
                    updatedBookData.publicationDate,
                    updatedBookData.availableCopies,
                    updatedBookData.totalCopies,
                    updatedBookData.location,
                    bookId,
                ]
            );

            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error('Failed to update the book');
            }
        } catch (error) {
            console.error('Error in updateBook:', error);
            throw error; // Rethrow the error to be caught by the controller
        }
    }


    static async searchBooks(params: any): Promise<Book[]> {
        try {
            // Construct a dynamic query based on the provided parameters
            const { author, title, category } = params;
            const queryParams: string[] = [];
            const queryValues: any[] = [];

            let paramIndex = 1;

            if (title) {
                queryParams.push(`title ILIKE $${paramIndex}`);
                queryValues.push(`%${title}%`);
                paramIndex++;
            }

            if (author) {
                queryParams.push(`author ILIKE $${paramIndex}`);
                queryValues.push(`%${author}%`);
                paramIndex++;
            }

            if (category) {
                queryParams.push(`category ILIKE $${paramIndex}`);
                queryValues.push(`%${category}%`);
                paramIndex++;
            }
            const query = `
            SELECT *
            FROM books
            ${queryParams.length > 0 ? 'WHERE ' + queryParams.join(' AND ') : ''}
          `;

            const result: QueryResult = await pool.query(query, queryValues);

            return result.rows.map(
                (row) =>
                    new Book(
                        row.id,
                        row.title,
                        row.author,
                        row.category,
                        row.isbn,
                        row.publication_date,
                        row.available_copies,
                        row.total_copies,
                        row.location
                    )
            );
        } catch (error) {
            console.error('Error in searchBooks:', error);
            throw error;
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
                row.total_copies,
                row.location
            );
        }

        return null;
    }

    static async updateCopies(bookId: number, action: 'add' | 'remove'): Promise<boolean> {
        try {
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
                `UPDATE books SET available_copies = CASE WHEN available_copies > 0 AND $2 = 'remove'
                 THEN available_copies - 1
                 WHEN available_copies >= 0 AND $2 = 'add'
                 THEN available_copies + 1
                 ELSE 0
                 END
                 WHERE id = $1 RETURNING *`,
                [bookId, action]
            );

            if (result.rows.length > 0) {
                // Update successful
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