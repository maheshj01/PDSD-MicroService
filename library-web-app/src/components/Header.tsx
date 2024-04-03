// src/components/Header.tsx

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Import the cart icon
import Menu from "./Menu";
import MenuOptions from "./MenuOptions";
import { getUserRole } from "../utils/authUtils";
import "./Header.css";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AuthService from "../services/AuthService";

const Header: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState<number>(0); // State to keep track of cart items count
  const { clearCart } = useCart();
  useEffect(() => {
    setUserRole(getUserRole());
    // Fetch cart items count from localStorage or your state management library
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      const items = JSON.parse(cartItems);
      setCartItemCount(items.length);
    }
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
        AuthService.signout();
        clearCart();
        // navigate("/login");
        break;
      default:
      // Handle other menu items if needed
    }
  };

  const { userData } = useAuth();
  const { cart } = useCart();
  return (
    <div className="header">
      <div className="left-section">
        <h1 className="header-title">PDSD Library</h1>
        <p className="header-subtitle">Explore our collection of books</p>
      </div>
      <div className="">
        <p>{userData?.fullName}</p>
        <p>({userData?.userRole})</p>
      </div>
      <div className="right-section">
        <div className="cart-icon-container">
          <Link to="/checkout" className="cart-link">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            <span className="cart-item-count">{cartItemCount}</span>
            {cart.length > 0 && (
              <span className="cart-item-count">{cart.length}</span>
            )}
          </Link>
        </div>
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
