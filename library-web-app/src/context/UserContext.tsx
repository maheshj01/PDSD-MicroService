// src/context/UserContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the context
interface UserContextType {
  userDetails: any; // Change 'any' to the type of userDetails object
  setUserDetails: (userData: any) => void; // Change 'any' to the type of userDetails object
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize userDetails state
  const [userDetails, setUserDetails] = useState<any>(null);

  // Fetch user details on component mount if authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = parseInt(localStorage.getItem("userId") || "");

    const fetchData = async () => {
      try {
        // const userData = await UserService.getUserInfo(userId, token!);
        // setUserDetails(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle error if needed
      }
    };

    if (token && userId) {
      fetchData();
    }
  }, []);

  // Function to set user details
  const setUserDetailsHandler = (userData: any) => {
    setUserDetails(userData);
  };

  // Function to clear user details (on logout)
  const clearUserDetails = () => {
    setUserDetails(null);
  };

  // Provide the context value
  const contextValue: UserContextType = {
    userDetails,
    setUserDetails: setUserDetailsHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
