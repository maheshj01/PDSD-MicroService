export const getUserRole = (): string | null => {
    const token = localStorage.getItem("token");
    if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding JWT token payload
        return decodedToken.userRole;
    }
    return null;
};