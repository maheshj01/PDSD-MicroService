// src/models/BookModel.ts
class BookModel {
    id: string;
    title: string;
    author: string;
    category: string;
    isbn: string;
    publication_year: number;
    available_copies: number;
    total_copies: number;
    location: string;

    constructor(
        id: string,
        title: string,
        author: string,
        category: string,
        isbn: string,
        publication_year: number,
        available_copies: number,
        total_copies: number,
        location: string
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.isbn = isbn;
        this.publication_year = publication_year;
        this.available_copies = available_copies;
        this.total_copies = total_copies;
        this.location = location;
    }
}

export default BookModel;
