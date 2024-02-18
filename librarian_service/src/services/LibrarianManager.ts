// src/services/LibrarianManager.ts
import { NextFunction, Request, Response } from 'express';
import UserDetails from '../models/UserDetails';
import BookDetails from '../models/BookDetails';
import axios, { AxiosResponse } from 'axios';

class LibrarianManager {
    async addNewBooks(token: string, bookDetails: BookDetails): Promise<AxiosResponse> {
        try {
            // Validate token or perform additional checks if needed

            // Implement the logic to add new books
            console.log('Adding new books:', bookDetails);

            const response = await axios.post(
                process.env.BOOKS_SERVICE_BASE_URL + '/api/books/add',
                bookDetails,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response;
        } catch (error) {
            console.error('Error adding new books:', error);
            throw error;
        }
    }
    async registerNewUsers(token: string, userDetails: UserDetails): Promise<AxiosResponse> {
        try {
            // Call the registerUser API from UserService
            const userServiceResponse = await axios.post(process.env.USER_SERVICE_BASE_URL + '/api/user/register', {
                username: userDetails.username,
                password: userDetails.passwordHash,
                user_role: userDetails.userRole,
                email: userDetails.email,
                full_name: userDetails.fullName,
                school_id: userDetails.schoolId,
                mailing_address: userDetails.mailingAddress,
                phone_number: userDetails.phoneNumber,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return userServiceResponse;
        } catch (error) {
            console.error('Error registering new users:', error);
            throw error;
        }
    }

    async checkLibrarianPrivileges(token: string): Promise<boolean> {
        try {
            // Validate token or perform additional checks if needed

            // Call the authenticateUserByRole API from UserService
            const roleCheckResponse = await axios.post(
                process.env.USER_SERVICE_BASE_URL + '/api/user/authenticate-by-role',
                {
                    requiredRole: 'librarian', // Change this to the required role
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return roleCheckResponse.status === 200;
        } catch (error) {
            console.error('Error checking librarian privileges:', error);
            return false;
        }
    }
}

export default LibrarianManager;
