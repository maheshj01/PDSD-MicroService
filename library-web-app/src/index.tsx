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

const root = document.getElementById("root");

if (root) {
  const reactRoot = createRoot(root);
  reactRoot.render(
    <Router>
      <AuthProvider> {/* Wrap your routes with AuthProvider */}
        <AppWrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/add-request" element={<RequestBook />} />
            <Route path="/book/:id" element={<BookDetails />} /> {/* Add route for Book Details */}
            {/* Add more routes as needed */}
          </Routes>
        </AppWrapper>
      </AuthProvider>
    </Router>
  );
}
