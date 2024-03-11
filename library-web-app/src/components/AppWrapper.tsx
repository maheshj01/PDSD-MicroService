// src/components/AppWrapper.tsx

import React, { useEffect } from "react";
import { BrowserRouterProps, useNavigate } from "react-router-dom";

const AppWrapper: React.FC<BrowserRouterProps> = ({ children }) => {
    const navigate = useNavigate();

    const isAuthenticated = () => {
        // Check if the token is present in localStorage
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Decode the token to get its payload (assuming it's a JWT)
                const payload = JSON.parse(atob(token.split(".")[1]));

                // Check if the token is expired
                const isExpired = payload.exp * 1000 < Date.now();

                // Return true if the token exists and is not expired
                return !isExpired;
            } catch (error) {
                // Token decoding or parsing failed, consider it invalid
                return false;
            }
        }

        // Return false if the token is not present
        return false;
    };

    useEffect(() => {
        console.log("AppWrapper mounted");

        // Redirect logic if needed on component mount
        if (!isAuthenticated()) {
            // Redirect to login if not authenticated
            navigate("/login");
        } else {
            // Redirect to dashboard if authenticated
            navigate("/dashboard");
        }
    }, []);

    return <>{children}</>;
};

export default AppWrapper;
