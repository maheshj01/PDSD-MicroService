import BookModel from '../models/BookModel';
import UserModel from '../models/UserModel';
import Validator from '../utils/Validator';
import axios from 'axios';

class LibrarianService {
    checkLibrarianPrivileges(userId: number): Promise<boolean> {
        // Implement logic to check if the user has librarian privileges
        // For demonstration purposes, always return true
        return Promise.resolve(true);
    }

    async addNewBooks(bookDetails: BookModel): Promise<boolean> {
        try {
            // Add logic to save the new book details to the database
            // For demonstration purposes, return true
            console.log('Adding new books to the database:', bookDetails);
            return true;
        } catch (error) {
            console.error('Error adding new books:', error);
            return false;
        }
    }

    async registerNewUsers(userDetails: UserModel): Promise<boolean> {
        try {
            // Validate user details
            Validator.validateUserDetails(userDetails);

            // Call the registerUser API from UserService
            const userServiceResponse = await axios.post('http://userServiceHost/register', {
                username: userDetails.username,
                email: userDetails.email,
                full_name: userDetails.fullName,
                school_id: userDetails.schoolId,
                mailing_address: userDetails.mailingAddress,
                password: userDetails.passwordHash,
                phone_number: userDetails.phoneNumber,
                user_role: userDetails.userRole,
            });

            if (userServiceResponse.status === 201) {
                // User registered successfully
                return true;
            } else {
                console.error('Error registering user:', userServiceResponse.data.error);
                return false;
            }
        } catch (error) {
            console.error('Error registering user:', error);
            return false;
        }
    }
}

export default LibrarianService;
