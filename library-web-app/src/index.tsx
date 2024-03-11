// src/index.tsx

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppWrapper from "./components/AppWrapper";
import Home from "./components/Home";
import Login from "./components/Login";
import RegisterUser from "./components/UserRegister";

const root = document.getElementById("root");

if (root) {
  const reactRoot = createRoot(root);
  reactRoot.render(
    <Router>
      <AppWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          {/* Add more routes as needed */}
        </Routes>
      </AppWrapper>
    </Router>
  );
}
