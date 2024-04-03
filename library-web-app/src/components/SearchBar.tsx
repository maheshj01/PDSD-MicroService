import React, { useState, ChangeEvent } from "react";
import { Book } from "../interfaces/Book";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (term: string, category?: keyof Book) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<keyof Book | undefined>(
    "title"
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term, searchCategory);
  };

  const handleCategoryChange = (
    event: ChangeEvent<HTMLInputElement>,
    category: keyof Book
  ) => {
    setSearchCategory(category);
    if (searchTerm) {
      onSearch(searchTerm, category);
    }
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
          className="search-input"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="clear-button" onClick={handleClear}>
          Clear
        </button>
      </div>

      {/* Add radio buttons for categories */}
      <div className="radio-container">
        <label>
          <input
            type="radio"
            value="title"
            checked={searchCategory === "title"}
            onChange={(e) => handleCategoryChange(e, "title")}
          />
          Title
        </label>
        <label>
          <input
            type="radio"
            value="author"
            checked={searchCategory === "author"}
            onChange={(e) => handleCategoryChange(e, "author")}
          />
          Author
        </label>
        <label>
          <input
            type="radio"
            value="category"
            checked={searchCategory === "category"}
            onChange={(e) => handleCategoryChange(e, "category")}
          />
          Category
        </label>
      </div>
    </div>
  );
};

export default SearchBar;
