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
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error("Authentication failed");
            }

            const data: AuthResponse = await response.json();
            return data;
        } catch (error) {
            throw new Error("Authentication failed");
        }
    },


    signout(): void {
        // Clear the token from local storage
        localStorage.removeItem("token");

        // Redirect or perform any additional cleanup as needed
        // Example: window.location.href = "/login";
    }
};

export default AuthService;
