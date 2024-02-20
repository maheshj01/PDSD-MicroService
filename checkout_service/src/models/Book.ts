
export interface Book {
    bookId: string;
    title: string;
    author: string;
    category: string;
    isbn: string;
    publicationDate: Date;
    availableCopies: number;
    totalCopies: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
}