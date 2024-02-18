// src/repositories/BookRepository.ts
import BookModel from '../models/BookModel';

class BookRepository {
    private books: BookModel[];

    constructor() {
        this.books = [];
    }

    addBook(book: BookModel): void {
        this.books.push(book);
    }

    searchBooks(criteria: string): BookModel[] {
        // Implement search logic based on criteria (title, author, etc.)
        // For simplicity, returning all books here
        return this.books;
    }
}

export default BookRepository;
