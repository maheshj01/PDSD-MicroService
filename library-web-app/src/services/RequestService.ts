// src/services/RequestService.ts

import axios from "axios";
import config from "../config";

const API_URL = config.requestServiceBaseUrl + "/api/requests";

const RequestService = {
    // Fetch all book requests
    getRequests: async (token: string) => {
        try {
            const response = await axios.get(`${API_URL}/get`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to fetch book requests. Please try again later.");
        }
    },
    // Approve a book request by ID
    approveRequest: async (id: number, token: string) => {
        try {
            const response = await axios.post(`${API_URL}/update/${id}/approve`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to approve book request. Please try again later.");
        }
    },
    // Reject a book request by ID
    rejectRequest: async (id: number, token: string) => {
        try {
            const response = await axios.post(`${API_URL}/update/${id}/reject`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to reject book request. Please try again later.");
        }
    }
};

export default RequestService;
