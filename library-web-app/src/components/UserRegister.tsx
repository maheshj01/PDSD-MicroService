import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import Input from "./Input"; // Import the Input component
import "./UserRegister.css";
import Header from "./Header";

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
        <div>
            <Header />
            <div className="register-user-container">
                <form onSubmit={handleSubmit}>
                    <h2>Register User</h2>
                    <Input
                        label="Username"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        name="passwordHash"
                        value={formData.passwordHash}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Full Name"
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
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
                    <Input
                        label="School ID (8-9 digits)"
                        type="number"
                        id="schoolId"
                        name="schoolId"
                        value={formData.schoolId}
                        onChange={handleChange}
                    />
                    <Input
                        label="Mailing Address"
                        type="text"
                        id="mailingAddress"
                        name="mailingAddress"
                        value={formData.mailingAddress}
                        onChange={handleChange}
                    />
                    <Input
                        label="Phone Number"
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RegisterUser;
