// src/models/BookModel.ts
class BookModel {
    id: string;
    title: string;
    author: string;
    category: string;
    isbn: string;
    publicationDate: Date;
    availableCopies: number;
    totalCopies: number;
    location: string;

    constructor(
        id: string,
        title: string,
        author: string,
        category: string,
        isbn: string,
        publicationDate: Date,
        availableCopies: number,
        totalCopies: number,
        location: string
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.isbn = isbn;
        this.publicationDate = publicationDate;
        this.availableCopies = availableCopies;
        this.totalCopies = totalCopies;
        this.location = location;
    }
}

export default BookModel;
