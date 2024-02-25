// src/controllers/BookController.ts
import { Request, Response } from 'express';
import BookService from '../services/BookService';
import Book from '../models/BookModel';

class BookController {
    public addBook = async (req: Request, res: Response): Promise<void> => {
        const bookDetails = req.body as Book;
        try {
            const result = await BookService.addBook(bookDetails);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error adding book:', error);
            res.status(500).json({ error: 'Failed to add new book' });
        }
    };

    public searchBooks = async (req: Request, res: Response): Promise<void> => {
        const searchParams = req.query;
        try {
            const result = await BookService.searchBooks(searchParams);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error searching books:', error);
            res.status(500).json({ error: 'Failed to search for books' });
        }
    };

    // New route to update availableCopies when a book is checked out
    public updateCopies(req: Request, res: Response): void {
        const { action, bookId } = req.body;
        try {
            const result = BookService.updateCopies(bookId, action);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error updating available copies:', error);
            res.status(500).json({ error: 'Failed to update available copies' });
        }

    }
}

export default BookController;
