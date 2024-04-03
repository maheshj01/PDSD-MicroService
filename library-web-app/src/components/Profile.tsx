// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Button, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import config from '../config';
const API_BASE_URL = `${config.userServiceBaseUrl}/api/user`;
const UserProfile = () => {
    const [user, setUser] = useState<any>(null);
    const auth = useAuth(); // Add this line to get the auth object from the AuthContext
    const userId = auth.userId;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL + `/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                console.log('User data:', response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [userId]);

    // const handleReturnBook = async (bookId) => {
    //     // Implement return book functionality here

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            {user && (
                <Box marginBottom={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {user.fullName}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                Username: {user.username}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                Email: {user.email}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                Phone Number: {user.phoneNumber}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                Mailing Address: {user.mailingAddress}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
            <Typography variant="h5" gutterBottom>
                Borrowed Books
            </Typography>
            {/* {books.map((book) => (
                <Box key={book.id} marginBottom={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {book.title}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                                Author: {book.author}
                            </Typography>
                            <Button onClick={() => handleReturnBook(book.id)} variant="outlined" color="primary">
                                Return
                            </Button>
                        </CardContent>
                    </Card>
                </Box> */}
            {/* ))} */}
        </div>
    );

}
export default UserProfile;
