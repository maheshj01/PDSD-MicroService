import React, { createContext, useState, useContext, useEffect } from "react";
import config from "../config";

interface UserData {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    userRole: string;
    schoolId: number;
    mailingAddress: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextType {
    userId: number | null;
    token: string | null;
    userData: UserData | null;
    setAuthData: (userId: number, token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
    userId: null,
    token: null,
    userData: null,
    setAuthData: () => { },
});

export const useAuth = () => useContext(AuthContext);

const API_BASE_URL = `${config.userServiceBaseUrl}/api/user`;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userId && token) {
                    const response = await fetch(API_BASE_URL + `/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const userData = await response.json();
                    setUserData(userData);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [userId, token]);

    const setAuthData = (userId: number, token: string) => {
        setUserId(userId);
        setToken(token);
    };

    return (
        <AuthContext.Provider value={{ userId, token, userData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};