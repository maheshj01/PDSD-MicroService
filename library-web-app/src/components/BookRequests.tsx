// src/components/BookRequests.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestService from "../services/RequestService";
import "./BookRequests.css";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";

const BookRequests: React.FC = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const auth = useAuth();
    // Function to fetch book requests
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await RequestService.getRequests(auth.token!);
            setRequests(response.requests);
        } catch (error: any) {
            setError("Failed to fetch book requests. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle approval or rejection of a request
    const handleAction = async (id: number, action: string) => {
        setLoading(true);
        try {
            if (action === "approve") {
                await RequestService.approveRequest(id, auth.token!);
                setSuccessMessage("Request approved successfully!");
            } else if (action === "reject") {
                await RequestService.rejectRequest(id, auth.token!);
                setSuccessMessage("Request rejected successfully!");
            }
            // Refresh requests after action
            await fetchRequests();
        } catch (error: any) {
            setError("Failed to perform action. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch requests on component mount
    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div>
            <Header />

            <div className="book-requests-container">
                <h2>Book Requests</h2>
                {loading && <p className="loading">Loading...</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}
                <div className="request-list">
                    {requests.map((request: any) => (
                        <div key={request.id} className="request-item">
                            <div className="request-details">
                                <p><strong>Title:</strong> {request.book_title}</p>
                                <p><strong>Author:</strong> {request.book_author}</p>
                                <p><strong>Justification:</strong> {request.justification}</p>
                                <p><strong>Status:</strong> {request.status}</p>
                                <p><strong>Requested On:</strong> {new Date(request.created_at).toLocaleString()}</p>
                            </div>
                            <div className="button-group">
                                <button
                                    className="action-button approve-button"
                                    onClick={() => handleAction(request.id, "approve")}
                                    disabled={loading}
                                >
                                    Approve
                                </button>
                                <button
                                    className="action-button reject-button"
                                    onClick={() => handleAction(request.id, "reject")}
                                    disabled={loading}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookRequests;
