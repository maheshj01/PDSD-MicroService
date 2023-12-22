// src/controllers/LibrarianController.ts

import { Request, Response } from 'express';
import LibrarianService from '../services/LibrarianService';
import { Book } from '../models/Book';

class LibrarianController {
    static async addBook(req: Request, res: Response): Promise<void> {
        try {
            const bookData: Book = req.body;

            // Validate inputs
            if (!LibrarianController.validateBookData(bookData)) {
                res.status(400).json({ error: 'Invalid input data for adding a book' });
                return;
            }

            const addedBook = await LibrarianService.addBook(bookData);
            res.status(201).json({ message: 'Book added successfully', book: addedBook });
        } catch (error) {
            console.error('Error in addBook:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const bookId = parseInt(req.params.bookId, 10);
            const bookData: Book = req.body;
            // Validate inputs
            if (isNaN(bookId) || !LibrarianController.validateBookData(bookData)) {
                res.status(400).json({ error: 'Invalid input data for updating a book' });
                return;
            }

            const updatedBook = await LibrarianService.updateBook(bookId, bookData);
            if (updatedBook) {
                res.json({ message: 'Book updated successfully', book: updatedBook });
            } else {
                res.status(404).json({ error: 'Book not found' });
            }
        } catch (error) {
            console.error('Error in updateBook:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Validate book data
    private static validateBookData(bookData: Book): boolean {
        return (
            !!bookData.title &&
            !!bookData.author &&
            (bookData.category === undefined || typeof bookData.category === 'string') &&
            (bookData.ISBN === undefined || typeof bookData.ISBN === 'string') &&
            (bookData.publicationDate === undefined || typeof bookData.publicationDate === 'string' || bookData.publicationDate instanceof Date) &&
            (bookData.availableCopies === undefined || typeof bookData.availableCopies === 'number') &&
            (bookData.totalCopies === undefined || typeof bookData.totalCopies === 'number') &&
            (bookData.location === undefined || typeof bookData.location === 'string')
        );
    }
}

export default LibrarianController;
