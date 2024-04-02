// src/index.tsx

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppWrapper from "./components/AppWrapper";
import Home from "./components/Home";
import Login from "./components/Login";
import RegisterUser from "./components/UserRegister";
import RequestBook from "./components/RequestBook";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

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
            {/* Add more routes as needed */}
          </Routes>
        </AppWrapper>
      </AuthProvider>
    </Router>
  );
}
