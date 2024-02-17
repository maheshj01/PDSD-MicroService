class BookDetails {
    id: number;
    title: string;
    author: string;
    category: string;
    isbn: string;
    publicationDate: Date;
    availableCopies: number;
    totalCopies: number;
    location: string;

    constructor(bookData: Partial<BookDetails>) {
        this.id = bookData.id || 0;
        this.title = bookData.title || '';
        this.author = bookData.author || '';
        this.category = bookData.category || '';
        this.isbn = bookData.isbn || '';
        this.publicationDate = bookData.publicationDate || new Date();
        this.availableCopies = bookData.availableCopies || 0;
        this.totalCopies = bookData.totalCopies || 0;
        this.location = bookData.location || '';
    }
}

export default BookDetails;
