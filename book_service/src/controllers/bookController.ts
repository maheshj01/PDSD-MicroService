// src/controllers/bookController.ts
import { Request, Response } from 'express';
import BookService from '../services/bookService';
import axios from 'axios';
import { Book } from '../models/Book';
class BookController {

    static async addBook(req: Request, res: Response): Promise<void> {
        try {
            const bookData: Book = req.body;

            // Basic validation
            if (!bookData.title || !bookData.author || !bookData.ISBN) {
                res.status(400).json({ error: 'Title, author, and ISBN are required fields' });
                return;
            }

            // Additional validation as needed

            // Call the corresponding methods from BookService
            const addedBook = await BookService.addBook(bookData);

            // Return the result
            res.status(201).json({ message: 'Book added successfully', book: addedBook });
        } catch (error) {
            console.error('Error in addBook:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const bookId = parseInt(req.params.id, 10);
            if (isNaN(bookId) || bookId <= 0) {
                res.status(400).json({ error: 'Invalid book ID' });
                return;
            }

            const updatedBookData: Book = req.body;

            // Basic validation
            if (!updatedBookData.title || !updatedBookData.author || !updatedBookData.ISBN) {
                res.status(400).json({ error: 'Title, author, and ISBN are required fields' });
                return;
            }

            // Additional validation as needed

            // Call the corresponding methods from BookService
            const updatedBook = await BookService.updateBook(bookId, updatedBookData);

            // Return the result
            res.json({ message: 'Book updated successfully', book: updatedBook });
        } catch (error) {
            console.error('Error in updateBook:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async searchBooks(req: Request, res: Response): Promise<void> {
        try {
            // Extract meaningful query parameters
            const { author, title, category } = req.query;
            // Call the corresponding method from BookService
            const books = await BookService.searchBooks({ title, author, category });

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
            const bookId = parseInt(req.params.bookId, 10);
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
        const bookId = parseInt(req.params.bookId, 10);
        const result = await BookService.updateCopies(bookId, 'remove');
        if (!result) {
            throw new Error('Error in updating copies on return');
        }
        res.status(200).json({ message: 'Copies updated successfully' });
    }

    static async updateCopiesOnHold(req: Request, res: Response): Promise<void> {
        const bookId = parseInt(req.params.bookId, 10);
        const result = await BookService.updateCopies(bookId, 'remove');
        if (!result) {
            throw new Error('Error in updating copies on return');
        }
        res.status(200).json({ message: 'Copies updated successfully' });
    }

    static async updateCopiesOnReturn(req: Request, res: Response): Promise<void> {
        const bookId = parseInt(req.params.bookId, 10);
        const result = await BookService.updateCopies(bookId, 'add');
        if (!result) {
            throw new Error('Error in updating copies on return');
        }
        res.status(200).json({ message: 'Copies updated successfully' });
    }


    static async placeHoldOnBook(req: Request, res: Response): Promise<void> {
        const bookId = parseInt(req.params.bookId, 10);
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
}

export default BookController;
