// src/models/Book.ts

class Book {
    public id!: number;
    public title!: string;
    public author!: string;
    public category!: string;
    public ISBN!: string;
    public publicationDate!: Date;
    public availableCopies!: number;
    public location!: string;

    // Add other fields as needed

    constructor(
        id: number,
        title: string,
        author: string,
        category: string,
        ISBN: string,
        publicationDate: Date,
        availableCopies: number,
        location: string
        // Add other fields as needed
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.ISBN = ISBN;
        this.publicationDate = publicationDate;
        this.availableCopies = availableCopies;
        this.location = location;
        // Initialize other fields as needed
    }
}

export default Book;
