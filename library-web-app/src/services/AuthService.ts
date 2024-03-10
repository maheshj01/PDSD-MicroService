// src/services/AuthService.ts
import config from "../config";

const API_URL = `${config.userServiceBaseUrl}/api/user/authenticate`;

interface AuthResponse {
    token: {
        token_id: number;
        user_id: number;
        token_value: string;
        expiration_time: string;
    };
}

interface AuthCredentials {
    username: string;
    password: string;
}

const AuthService = {
    authenticateUser: async (credentials: AuthCredentials): Promise<AuthResponse> => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        console.log("response:", response.body);
        if (!response.ok) {
            // You might want to handle different error scenarios here
            throw new Error("Authentication failed");
        }

        const data: AuthResponse = await response.json();
        return data;
    },
};

export default AuthService;
