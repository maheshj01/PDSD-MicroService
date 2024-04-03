// src/components/Login.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import "./Login.css"; // Import the CSS file for styling

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { setAuthData } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            const response = await AuthService.authenticateUser({
                username: email,
                password,
            });
            const { user_id, token_value } = response.token;
            setAuthData(user_id, token_value);

            localStorage.setItem("token", token_value);

            navigate("/dashboard");
        } catch (error) {
            setError("Invalid email or password. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">PDSD Library</h1>
                <h2 className="login-subtitle">Login</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input
                        className="form-input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input
                        className="form-input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
