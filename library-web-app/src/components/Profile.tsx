import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Card, CardContent, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import config from '../config';

const API_BASE_URL = `${config.userServiceBaseUrl}/api/user`;
const CHECKOUT_BASE_URL = `${config.checkoutServiceBaseUrl}`;

const UserProfile = () => {
    const [user, setUser] = useState<any>(null);
    const [borrowedBooks, setBorrowedBooks] = useState<any[]>([]);
    const [returnedBooks, setReturnedBooks] = useState<any[]>([]);
    const [currentTab, setCurrentTab] = useState<string>('borrowed');

    const auth = useAuth();
    const userId = auth.userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_BASE_URL + `/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [userId, auth.token]);

    useEffect(() => {
        const fetchCheckoutBooks = async () => {
            try {
                console.log("fetching checkouts");
                const response = await axios.get(`${CHECKOUT_BASE_URL}/api/checkout/checked-out-books/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                const checkedOutBooks = response.data.data;
                console.log('Checked out books:', checkedOutBooks);
                setBorrowedBooks(checkedOutBooks.filter((book: any) => !book.returned));
                setReturnedBooks(checkedOutBooks.filter((book: any) => book.returned));
            } catch (error) {
                console.error('Error fetching checked out books:', error);
            }
        };

        fetchCheckoutBooks();
    }, [userId, auth.token]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    const handleReturnBook = async (bookId: number) => {
        // Implement return book functionality here
    };

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

            <Tabs value={currentTab} onChange={handleTabChange} aria-label="profile tabs">
                <Tab value="borrowed" label="Borrowed Books" />
                <Tab value="returned" label="Returned Books" />
            </Tabs>

            {currentTab === 'borrowed' && (
                <>
                    <Typography variant="h5" gutterBottom>
                        Borrowed Books
                    </Typography>
                    {borrowedBooks.map((book) => (
                        <Box key={book.id} marginBottom={2}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {book.book.title}
                                    </Typography>
                                    <Typography color="text.secondary" gutterBottom>
                                        Author: {book.book.author}
                                    </Typography>
                                    <Button onClick={() => handleReturnBook(book.id)} variant="outlined" color="primary">
                                        Return
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </>
            )}

            {currentTab === 'returned' && (
                <>
                    <Typography variant="h5" gutterBottom>
                        Returned Books
                    </Typography>
                    {returnedBooks.map((book) => (
                        <Box key={book.id} marginBottom={2}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {book.book.title}
                                    </Typography>
                                    <Typography color="text.secondary" gutterBottom>
                                        Author: {book.book.author}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </>
            )}
        </div>
    );
};

export default UserProfile;
