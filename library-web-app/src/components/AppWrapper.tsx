// src/components/AppWrapper.tsx

import React, { useEffect } from "react";
import { BrowserRouterProps, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppWrapper: React.FC<BrowserRouterProps> = ({ children }) => {
    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        console.log("AppWrapper mounted");

        // Redirect logic if needed on component mount
        if (!isAuthenticated) {
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
