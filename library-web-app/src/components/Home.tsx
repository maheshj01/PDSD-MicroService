// src/components/Home.tsx

import React, { useEffect, useState } from "react";
import _ from "lodash"; // Import lodash
import BookService from "../services/BookService";
import { Book } from "../interfaces/Book";
import Header from "./Header";
import SearchBar from "./SearchBar";
import BookDisplay from "./BookDisplay";
import "./Home.css";

const Home: React.FC = () => {
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

  const handleSearch = _.debounce(
    async (term: string, category?: keyof Book) => {
      try {
        setLoading(true);
        const results = await BookService.searchBooksByCategory(term, category!);
        setBooks(results);
        setLoading(false);
      } catch (error) {
        setError("Error searching books. Please try again later.");
        setLoading(false);
        console.error("Error searching books:", error);
      }
    },
    600
  );
  return (
    <div className="home-container">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <BookDisplay books={books} />}
    </div>
  );
};

export default Home;
