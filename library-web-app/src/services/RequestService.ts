// src/services/RequestService.ts

import axios from "axios";
import config from "../config";

const API_URL = `${config.requestServiceBaseUrl}/api/requests/submit`;

const RequestService = {
    requestBook: async (requestData: any) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(API_URL, requestData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                console.log("Book request submitted successfully:", response.data);
                return response.data;
            } else {
                console.error("Failed to submit book request. Status code:", response.status);
                throw new Error(`Failed to submit book request. Status code: ${response.status}`);
            }
        } catch (error) {
            // Handle network errors and other errors
            console.error("Failed to submit book request:", error);
            throw new Error("Failed to submit book request.");
        }
    },
    // Add more methods if necessary
};

export default RequestService;
