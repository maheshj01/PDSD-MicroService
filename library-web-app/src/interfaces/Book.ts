// src/interfaces/Book.ts

export interface Book {
    id: number;
    title: string;
    author: string;
    category?: string;
    isbn?: string;
    publication_date?: string;
    available_copies: number;
    total_copies: number;
    location?: string;
    created_at: string;
    updated_at: string;
    // Add more fields as needed
}
