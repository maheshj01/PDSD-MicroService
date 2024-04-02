// src/components/Header.tsx

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import MenuOptions from "./MenuOptions";
import { getUserRole } from "../utils/authUtils";
import "./Header.css";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  const handleMenuClick = (menuItem: string, path: string) => {
    // console.log(`Menu item clicked: ${menuItem} role: ${userRole} path: ${path}`);
    switch (menuItem) {
      case "Profile":
      case "Register User":
        break;
      case "Add/Request Book":
        break;
      case "Sign Out":
        // Handle logic for signing out, e.g., clear local storage, etc.
        localStorage.removeItem("token");
        // navigate("/login");
        break;
      default:
      // Handle other menu items if needed
    }
  };

  const { userData } = useAuth();

  return (
    <div className="header">
      <div className="left-section">
        <h1 className="header-title">PDSD Library</h1>
        <p className="header-subtitle">Explore our collection of books</p>
      </div>
      <div className="">
        <p>
          {userData?.fullName}
        </p>
        <p>
          ({userData?.userRole})
        </p>
      </div>
      <div className="right-section">
        {userRole && (
          <Menu trigger={<FontAwesomeIcon icon={faUser} />}>
            <MenuOptions userRole={userRole} onMenuClick={handleMenuClick} />
          </Menu>
        )}
      </div>
    </div >
  );
};

export default Header;
