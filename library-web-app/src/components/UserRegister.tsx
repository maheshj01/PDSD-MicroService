import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import "./UserRegister.css";

const RegisterUser: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        passwordHash: "",
        userRole: "patron", // Default user role
        fullName: "",
        schoolId: 0,
        email: "",
        phoneNumber: "",
        mailingAddress: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await UserService.registerUser(formData);
            setSuccessMessage("User registered successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 2000); // Navigate after 2 seconds
        } catch (error: any) {
            setError(error.message || "Failed to register user. Please try again later.");
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError(null);
                setSuccessMessage(null);
            }, 5000); // Clear error and success message after 5 seconds
        }
    };

    return (
        <div className="register-user-container">
            <form onSubmit={handleSubmit}>
                <h2>Register User</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="passwordHash"
                        value={formData.passwordHash}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
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
                    <label htmlFor="userRole">User Role</label>
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
                <div className="form-group">
                    <label htmlFor="schoolId">School ID</label>
                    <input
                        type="number"
                        id="schoolId"
                        name="schoolId"
                        value={formData.schoolId}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mailingAddress">Mailing Address</label>
                    <input
                        type="text"
                        id="mailingAddress"
                        name="mailingAddress"
                        value={formData.mailingAddress}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterUser;

