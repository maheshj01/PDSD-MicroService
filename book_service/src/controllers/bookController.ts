// src/controllers/bookController.ts
import { Request, Response } from 'express';
import BookService from '../services/bookService';
import axios from 'axios';
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

    static async updateCopiesOnCheckout(req: Request, res: Response): Promise<void> {
        try {
            const bookId = parseInt(req.params.bookId, 10);
            if (isNaN(bookId) || bookId <= 0) {
                res.status(400).json({ error: 'Invalid book ID' });
                return;
            }

            // Call the corresponding method from BookService to update copies
            const updateResult = await BookService.updateCopiesOnCheckout(bookId);

            if (updateResult) {
                res.json({ message: 'Copies updated successfully' });
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            console.error('Error in updateCopiesOnCheckout:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async placeHoldOnBook(bookId: number): Promise<void> {
        try {
            // Make API call to CheckoutService to place a hold on the book
            const checkoutServiceBaseUrl = process.env.CHECKOUT_SERVICE_BASE_URL;
            if (!checkoutServiceBaseUrl) {
                throw new Error('CheckoutService base URL is not defined');
            }

            await axios.post(`${checkoutServiceBaseUrl}/api/${bookId}/place-hold`);
        } catch (error) {
            console.error('Error in placeHoldOnBook:', error);
            throw error; // Rethrow the error for centralized error handling
        }
    }

    // This method is called by CheckoutService to update the number of copies on hold for a book
    static async updateCopiesOnHold(req: Request, res: Response): Promise<void> {
        try {
            // Validate and sanitize user input
            const bookId = parseInt(req.params.bookId, 10);
            if (isNaN(bookId) || bookId <= 0) {
                res.status(400).json({ error: 'Invalid checkout ID' });
                return;
            }

            // Call corresponding methods from BookService
            await BookService.updateCopiesOnHold(bookId);

            // Return success
            res.json({ message: 'Copies on hold updated successfully' });
        } catch (error) {
            console.error('Error in updateCopiesOnHold:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default BookController;
