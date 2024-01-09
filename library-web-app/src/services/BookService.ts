// src/services/BookService.ts

import axios, { AxiosResponse } from 'axios';
import { Book } from "../interfaces/Book"; // Import the Book interface

const BASE_URL = process.env.BOOKS_SERVICE_BASE_URL || 'http://localhost:3001';
console.log('BASE_URL', BASE_URL);
if (!BASE_URL) {
    throw new Error('BOOKS_SERVICE_BASE_URL is not defined in the environment file.');
}

const handleRequest = async <T>(
    request: Promise<AxiosResponse<T>>
): Promise<T> => {
    try {
        const response = await request;
        return response.data;
    } catch (error) {
        console.error('Error in BookService:', error);
        throw error;
    }
};

const BookService = {
    searchBooks: async (): Promise<Book[]> => {
        return handleRequest(axios.get<Book[]>(`${BASE_URL}/books`));
    },

    viewBookDetails: async (bookId: string): Promise<Book> => {
        return handleRequest(axios.get<Book>(`${BASE_URL}/books/${bookId}`));
    },

    placeHoldOnBook: async (bookId: string): Promise<void> => {
        return handleRequest(axios.post<void>(`${BASE_URL}/books/${bookId}/hold`));
    },

    updateCopiesOnCheckout: async (bookId: string): Promise<void> => {
        return handleRequest(axios.put<void>(`${BASE_URL}/books/${bookId}`));
    },

    // Add more methods as needed based on your BookService API
};

export default BookService;
