import { jwtDecode } from 'jwt-decode';

export const getUserRole = (): string | null => {
    const token = localStorage.getItem("token");
    if (token) {
        const payload = jwtDecode(token) as { userRole: string };
        return payload.userRole || null;
    }
    return null;
};
