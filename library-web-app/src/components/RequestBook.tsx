// src/components/RequestBook.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestService from "../services/RequestService";
import "./RequestBook.css";

const RequestBook: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: 0,
        book_title: "",
        book_author: "",
        justification: "",
        role: "staff" // Default role for staff
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
            const response = await RequestService.requestBook(formData);
            setSuccessMessage("Book request submitted successfully!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000); // Navigate to dashboard after 2 seconds
        } catch (error: any) {
            setError(error.message || "Failed to submit book request. Please try again later.");
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError(null);
                setSuccessMessage(null);
            }, 5000); // Clear error and success message after 5 seconds
        }
    };

    return (
        <div className="request-book-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h2>Request Book</h2>
                    <label htmlFor="bookTitle">Book Title:</label>
                    <input
                        type="text"
                        id="bookTitle"
                        name="book_title"
                        value={formData.book_title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="book_author"
                        value={formData.book_author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="justification">Justification:</label>
                    <textarea
                        id="justification"
                        name="justification"
                        value={formData.justification}
                        onChange={handleChange}
                        rows={5}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit" disabled={loading}>Submit Request</button>
                </div>
                {loading && <p className="loading">Loading...</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default RequestBook;
