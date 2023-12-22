// src/services/LibrarianService.ts

import axios from 'axios';
import { Book } from '../models/Book';

class LibrarianService {
    // private static readonly BOOKS_SERVICE_BASE_URL = process.env.BOOKS_SERVICE_BASE_URL;

    static async addBook(bookData: Book): Promise<Book> {
        const bookServiceUrl = process.env.BOOKS_SERVICE_BASE_URL;
        try {
            const response = await axios.post(`${bookServiceUrl}/api/librarian/books`, bookData);

            if (response.status === 201) {
                return response.data.book;
            } else {
                throw new Error('Failed to add book');
            }
        } catch (error) {
            console.error('Error in LibrarianService.addBook:', error);
            throw error;
        }
    }

    static async updateBook(bookId: number, bookData: Book): Promise<Book | null> {
        try {
            const bookServiceUrl = process.env.BOOKS_SERVICE_BASE_URL;
            const response = await axios.put(`${bookServiceUrl}/api/librarian/books/${bookId}`, bookData);
            console.log("response:", response);
            if (response.status === 200) {
                return response.data.book;
            } else if (response.status === 404) {
                throw new Error('Book not found');
            } else {
                throw new Error('Failed to update book');
            }
        } catch (error) {
            console.error('Error in LibrarianService.updateBook:', error);
            throw error;
        }
    }
}

export default LibrarianService;
