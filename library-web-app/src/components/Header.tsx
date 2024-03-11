// src/components/Header.tsx

import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="left-section">
        <h1>Welcome to the Library</h1>
        <p>Explore our collection of books</p>
      </div>
      <div className="right-section">
        <Menu
          trigger={<button className="account-button">Account</button>}
        >
          <Link to="/profile">Profile</Link>
          <Link to="/register-user">Register User</Link>
          <Link to="/add-request-book">Add/Request Book</Link>
          <Link to="/signout">Sign Out</Link>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
