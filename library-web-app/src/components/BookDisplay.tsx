// src/components/BookDisplay.tsx

import React from "react";
import { Book } from "../interfaces/Book";
import './BookDisplay.css';
import { Link } from "react-router-dom";
interface BookDisplayProps {
  books: Book[];
}

const BookDisplay: React.FC<BookDisplayProps> = ({ books }) => {
  const bookCover =
    "https://content.wepik.com/statics/90897927/preview-page0.jpg";

  return (
    <div className="books-container">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <Link to={`/book/${book.id}`} className="book-link">
            <img src={bookCover} alt={book.title} />
            <div className="book-details">
              <p className="book-title">{book.title}</p>
              <p className="book-category">({book.category})</p>
              <p className="book-author">by {book.author}</p>
              {/* Add more book details as needed */}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookDisplay;
