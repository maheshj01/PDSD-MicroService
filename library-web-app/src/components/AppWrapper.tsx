// src/components/AppWrapper.tsx

import React, { useEffect } from "react";
import { BrowserRouterProps, useNavigate } from "react-router-dom";

const AppWrapper: React.FC<BrowserRouterProps> = ({ children }) => {
    const navigate = useNavigate();

    const isAuthenticated = () => {
        // Check if the token is present and valid (you might need additional checks)
        const token = localStorage.getItem("token");
        return token !== null && token !== undefined;
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
