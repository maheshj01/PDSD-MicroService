// src/components/Header.tsx

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import MenuOptions from "./MenuOptions";
import { getUserRole } from "../utils/authUtils";
import "./Header.css";
import AuthService from "../services/AuthService";

const Header: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  const handleMenuClick = (menuItem: string) => {
    switch (menuItem) {
      case "Profile":
        // Handle logic for Profile click
        console.log("Profile clicked!");
        break;
      case "Register User":
        // Handle logic for Register User click
        console.log("Register User clicked!");
        break;
      case "Add/Request Book":
        // Handle logic for Add/Request Book click
        console.log("Add/Request Book clicked!");
        break;
      case "Sign Out":
        // Handle logic for Sign Out click
        AuthService.signout();
        break;
      default:
        // Handle other menu items if needed
        console.log("Unknown menu item clicked!");
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <h1 className="header-title">PDSD Library</h1>
        <p className="header-subtitle">Explore our collection of books</p>
      </div>
      <div className="right-section">
        {userRole && (
          <Menu trigger={<FontAwesomeIcon icon={faUser} />}>
            <MenuOptions userRole={userRole} onMenuClick={handleMenuClick} />
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Header;
