// src/controllers/bookController.ts
import { Request, Response } from 'express';
import BookService from '../services/bookService';

class BookController {
    static async searchBooks(req: Request, res: Response): Promise<void> {
        try {
            // Extract meaningful query parameters
            const { title, id, category } = req.query;

            // Call the corresponding method from BookService
            const books = await BookService.searchBooks({ title, id, category });

            // Return the result
            res.json(books);
        } catch (error) {
            console.error('Error in searchBooks:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async viewBookDetails(req: Request, res: Response): Promise<void> {
        try {
            // Validate and sanitize user input
            const bookId = parseInt(req.params.id, 10);
            if (isNaN(bookId) || bookId <= 0) {
                res.status(400).json({ error: 'Invalid book ID' });
                return;
            }

            // Call corresponding methods from BookService
            const book = await BookService.getBookById(bookId);

            // Return the result
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            console.error('Error in viewBookDetails:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async placeHoldOnBook(req: Request, res: Response): Promise<void> {
        try {
            // Validate and sanitize user input
            const bookId = parseInt(req.params.id, 10);
            if (isNaN(bookId) || bookId <= 0) {
                res.status(400).json({ error: 'Invalid book ID' });
                return;
            }

            // Call corresponding methods from BookService
            await BookService.placeHoldOnBook(bookId);

            // Return success
            res.json({ message: 'Hold placed successfully' });
        } catch (error) {
            console.error('Error in placeHoldOnBook:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Add more controller methods as needed
}

export default BookController;
