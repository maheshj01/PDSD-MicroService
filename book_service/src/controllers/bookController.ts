// src/controllers/BookController.ts
import { Request, Response } from 'express';
import BookService from '../services/BookService';
import Book from '../models/BookModel';

class BookController {

    addBook = async (req: Request, res: Response): Promise<void> => {
        const bookDetails = req.body as Book;
        try {
            const result = await BookService.addBook(bookDetails);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding book:', error);
            res.status(500).json({ error: 'Failed to add new book' });
        }
    };

    searchBooks = async (req: Request, res: Response): Promise<void> => {
        const searchParams = req.query;

        try {
            const result = await BookService.searchBooks(searchParams);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error searching books:', error);
            res.status(500).json({ error: 'Failed to search for books' });
        }
    };
}

export default BookController;
