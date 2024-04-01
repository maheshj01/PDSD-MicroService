// src/services/UserService.ts

import axios, { AxiosError } from "axios";
import config from "../config";

const API_URL = `${config.librarianServiceBaseUrl}/registerNewUsers`;

const UserService = {
    registerUser: async (userData: any) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API_URL}`, JSON.stringify(userData), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log("User registered successfully:", response.data);
                return response.data;
            } else {
                console.error("Failed to register user. Status code:", response.status);
                throw new Error(`Failed to register user. Status code: ${response.status}`);
            }
        } catch (error: any) {
            // Handle network errors and other errors
            if (error.response.status === 400) {
                throw new Error("Failed to register user. Bad request.");
            }
            else if (error.response.status === 403) {
                throw new Error("Failed to register user. You are not authorized to perform this action.");
            }
            throw new Error("Failed to register user.");
        }
    },
    // Add more user-related methods as needed
};

export default UserService;