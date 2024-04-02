// src/components/BookDetails.tsx

import React, { useEffect, useState } from "react";
import { Book } from "../interfaces/Book";
import { Link, useParams } from "react-router-dom";
import config from "../config";
import "./BookDetails.css";

interface BookDetailsProps {
    book?: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {

    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [bookDetails, setBookDetails] = useState<Book>({} as Book); // Initialize with an empty object
    const API_URL = config.booksServiceBaseUrl + '/api/books';

    useEffect(() => {
        // Fetch book details only if book prop is not provided
        console.log("BookDetails: book", book);
        if (!book) {
            fetchBookDetails(id!);
        } else {
            setBookDetails(book);
        }
    }, [id, book]);

    const fetchBookDetails = async (bookId: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/search?id=${bookId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch book details");
            }
            const data: Book[] = await response.json();
            if (data.length === 0) {
                throw new Error("Book not found");
            }
            setBookDetails(data[0]); // Assuming the first book in the response is the one we want
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            console.error("Error fetching book details:", error);
        }
    };

    if (loading) {
        return <p className="loading-message">Loading book details...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }
    const bookCover =
        "https://content.wepik.com/statics/90897927/preview-page0.jpg";
    return (
        <div className="book-details-container">
            <div className="book-details-grid">
                <div>
                    <img src={bookCover} alt={bookDetails.title} className="book-details-cover" />
                </div>
                <div className="book-details-info">
                    <h2 className="book-details-title">{bookDetails.title}</h2>
                    <p><strong>Author:</strong> {bookDetails.author}</p>
                    {bookDetails.category && <p><strong>Category:</strong> {bookDetails.category}</p>}
                    {bookDetails.isbn && <p><strong>ISBN:</strong> {bookDetails.isbn}</p>}
                    {bookDetails.publication_date && <p><strong>Publication Date:</strong> {bookDetails.publication_date}</p>}
                    <p><strong>Available Copies:</strong> {bookDetails.available_copies}</p>
                    <p><strong>Total Copies:</strong> {bookDetails.total_copies}</p>
                    {bookDetails.location && <p><strong>Location:</strong> {bookDetails.location}</p>}
                    <p><strong>Created At:</strong> {bookDetails.created_at}</p>
                    <p><strong>Updated At:</strong> {bookDetails.updated_at}</p>
                    <button className="book-details-button">Add to Cart</button>
                    <Link to="/" className="back-to-home-link">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
