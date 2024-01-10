// src/components/Header.tsx

import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="left-section">
        <h1>Welcome to the Library</h1>
        <p>Explore our collection of books</p>
      </div>
      <div className="right-section">
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
