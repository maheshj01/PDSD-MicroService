// // src/components/CustomRoute.tsx

// import React from "react";
// import { RouteProps, Route, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// interface CustomRouteProps extends RouteProps {
//     isPrivate?: boolean;
// }

// const CustomRoute: React.FC<CustomRouteProps> = ({
//     isPrivate = false,
//     ...props
// }) => {
//     const { isAuthenticated } = useAuth();
//     if (isPrivate && !isAuthenticated) {
//         return <Navigate to="/login" />;
//     }

//     return <Route {...props} />;
// };

// export default CustomRoute;
