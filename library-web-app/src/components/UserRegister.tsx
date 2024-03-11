// src/components/RegisterUser.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "./UserRegister.css";
const RegisterUser: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: "",
        userRole: "patron", // Default user role
        schoolId: 0,
        mailingAddress: "",
        phoneNumber: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // You should perform additional client-side validation here if needed

            const response = await UserService.registerUser(formData);
            console.log("User registered successfully:", response);
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            setError("Error registering user. Please try again.");
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="register-user-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h2>Register User</h2>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Add more form fields based on your schema */}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Add more form fields based on your schema */}
                <div className="form-group">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="userRole">User Role:</label>
                    <select
                        id="userRole"
                        name="userRole"
                        value={formData.userRole}
                        onChange={handleChange}
                        required
                    >
                        <option value="patron">Patron</option>
                        <option value="staff">Staff</option>
                        <option value="librarian">Librarian</option>
                    </select>
                </div>
                {/* Add more form fields based on your schema */}
                <div className="form-group">
                    <label htmlFor="schoolId">School ID:</label>
                    <input
                        type="number"
                        id="schoolId"
                        name="schoolId"
                        value={formData.schoolId}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mailingAddress">Mailing Address:</label>
                    <input
                        type="text"
                        id="mailingAddress"
                        name="mailingAddress"
                        value={formData.mailingAddress}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <button type="submit">Register</button>
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterUser;
