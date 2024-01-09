// src/components/Home.tsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookService from "../services/BookService";
import { Book } from "../interfaces/Book";
import "./Home.css";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch books from BookService API
    BookService.searchBooks()
      .then((response) => {
        setBooks(response);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching books. Please try again later.");
        setLoading(false);
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const bookCover =
  "https://content.wepik.com/statics/90897927/preview-page0.jpg";
  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome to the Library</h1>
        <p>Explore our collection of books</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={clearSearch}>Clear</button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="books-container">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={bookCover} alt={book.title} />
              <div className="book-details">
                <p className="book-title">{book.title}</p>
                <p className="book-author">by {book.author}</p>
                {/* Add more book details as needed */}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="login-container">
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
