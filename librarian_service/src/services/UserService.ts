// src/services/UserService.ts

import axios from 'axios';
import UserModel from '../models/User';
import { AxiosResponse } from 'axios';

class UserService {
    static async registerUser(newUser: UserModel): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${process.env.USER_SERVICE_BASE_URL}/api/auth/register`, newUser);
            return response;
        } catch (error: any) {
            return error.response; // Return the complete response object
        }
    }

    static async editUser(userId: string, updatedUser: UserModel): Promise<AxiosResponse> {
        try {
            // Make a request to the User Service to edit the user information
            const userEditResponse = await axios.put(
                `${process.env.USER_SERVICE_BASE_URL}/api/users/${userId}/edit`,
                updatedUser
            );

            // Return the response status
            return userEditResponse;
        } catch (error) {
            // Handle errors (you may want to log or handle different types of errors)
            throw error;
        }
    }
}

export default UserService;
