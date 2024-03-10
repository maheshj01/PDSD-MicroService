// src/components/Login.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "./Login.css"; // Import the CSS file for styling

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            const response = await AuthService.authenticateUser({ username: email, password });
            const token = response.token.token_value;

            localStorage.setItem("token", token);

            navigate("/dashboard");
        } catch (error) {
            setError("Invalid email or password. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="login-container">
            <h1>PDSD Library</h1>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
