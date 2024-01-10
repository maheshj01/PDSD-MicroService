// src/components/SearchBar.tsx

import React, { useState, ChangeEvent } from "react";
import { Book } from "../interfaces/Book";

interface SearchBarProps {
  onSearch: (term: string, category: keyof Book) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<keyof Book>("title"); // Default category

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value, searchCategory);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchCategory(event.target.value as keyof Book);
    onSearch(searchTerm, event.target.value as keyof Book);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={() => onSearch("", "title")}>Clear</button>

      {/* Add radio buttons for categories */}
      <div>
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
