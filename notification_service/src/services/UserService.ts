import axios, { AxiosResponse } from 'axios';

class UserService {
    static async getUserById(userId: number): Promise<any> {
        try {
            const token = process.env.ADMIN_LOGIN_TOKEN;
            const headers = { Authorization: `Bearer ${token}` };
            const response: AxiosResponse = await axios.get(`${process.env.USER_SERVICE_BASE_URL}/api/users/${userId}`, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching user information');
        }
    }

    static async getBookById(bookId: number): Promise<any> {
        try {
            const response: AxiosResponse = await axios.get(`${process.env.BOOKS_SERVICE_BASE_URL}/api/books/${bookId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching book information');
        }
    }
}

export default UserService;