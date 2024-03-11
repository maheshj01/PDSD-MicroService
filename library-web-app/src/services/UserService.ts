// src/services/UserService.ts

import axios from "axios";

const API_BASE_URL = process.env.USER_SERVICE_BASE_URL; // Replace with your actual API base URL

const UserService = {
    registerUser: async (userData: any) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, userData);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message || "Error registering user.";
        }
    },
    // Add more user-related methods as needed
};

export default UserService;
