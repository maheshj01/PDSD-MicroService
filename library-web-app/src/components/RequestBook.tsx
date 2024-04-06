import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RequestBook.css";
import { useAuth } from "../context/AuthContext";
import config from "../config";
import Header from "./Header";

const RequestBook: React.FC = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [formData, setFormData] = useState({
        user_id: auth.userId,
        book_title: "",
        book_author: "",
        justification: "",
        role: localStorage.getItem("role") || "staff",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const API_URL = config.requestServiceBaseUrl;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error message
        try {
            console.log("Submitting request...", formData);
            const response = await fetch(API_URL + "/api/requests/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to submit book request.");
            }
            setSuccessMessage(data.message);
            // Clear form data
            setFormData({
                user_id: auth.userId,
                book_title: "",
                book_author: "",
                justification: "",
                role: "staff",
            });
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000); // Navigate to dashboard after 2 seconds
        } catch (error: any) {
            setError(error.message || "Failed to submit book request. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
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
                        <label htmlFor="bookAuthor">Book Author:</label>
                        <input
                            type="text"
                            id="bookAuthor"
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
        </div>

    );
};

export default RequestBook;
