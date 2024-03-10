// src/components/SearchBar.tsx

import React, { useState, ChangeEvent } from "react";
import { Book } from "../interfaces/Book";

interface SearchBarProps {
  onSearch: (term: string, category?: keyof Book) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<keyof Book | undefined>(undefined);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term, searchCategory);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const category = event.target.value as keyof Book;
    setSearchCategory(category);
    onSearch(searchTerm, category);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchCategory(undefined);
    onSearch("", undefined);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleClear}>Clear</button>
      </div>

      {/* Add radio buttons for categories */}
      <div className="radio-container">
        <label>
          <input
            type="radio"
            value="title"
            checked={searchCategory === "title"}
            onChange={handleCategoryChange}
          />
          Title
        </label>
        <label>
          <input
            type="radio"
            value="author"
            checked={searchCategory === "author"}
            onChange={handleCategoryChange}
          />
          Author
        </label>
        <label>
          <input
            type="radio"
            value="category"
            checked={searchCategory === "category"}
            onChange={handleCategoryChange}
          />
          Category
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
