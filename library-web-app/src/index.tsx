// src/index.tsx

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppWrapper from "./components/AppWrapper";
import Home from "./components/Home";
import Login from "./components/Login";
import RegisterUser from "./components/UserRegister";
import RequestBook from "./components/RequestBook";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider
import BookDetails from "./components/BookDetails";
import Checkout from "./components/Checkout";
import { CartProvider } from "./context/CartContext";
import UserProfile from "./components/Profile";
import BookRequests from "./components/BookRequests";

const root = document.getElementById("root");

if (root) {
  const reactRoot = createRoot(root);
  reactRoot.render(
    <Router>
      <AuthProvider> {/* Wrap your routes with AuthProvider */}
        <CartProvider>
          <AppWrapper>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/add-request" element={<RequestBook />} />
              <Route path="/book/:id" element={<BookDetails />} /> {/* Add route for Book Details */}
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/book-requests" element={<BookRequests />} />
              {/* Add more routes as needed */}
            </Routes>
          </AppWrapper>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
