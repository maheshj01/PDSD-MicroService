import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Card, CardContent, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import config from '../config';
import Header from './Header';

const API_BASE_URL = `${config.userServiceBaseUrl}/api/user`;
const CHECKOUT_BASE_URL = `${config.checkoutServiceBaseUrl}`;

const UserProfile = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [borrowedBooks, setBorrowedBooks] = useState<any[]>([]);
    const [returnedBooks, setReturnedBooks] = useState<any[]>([]);
    const [currentTab, setCurrentTab] = useState<string>('borrowed');

    const auth = useAuth();
    const userId = auth.userId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/${auth.userId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                setUser(response.data);
                await fetchCheckoutBooks(auth.token!);
            } catch (error) {
                setError('Error fetching user data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [auth.userId, auth.token]);

    const fetchCheckoutBooks = async (token: string) => {
        try {
            const response = await axios.get(`${CHECKOUT_BASE_URL}/api/checkout/checked-out-books/${userId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            const { data } = response.data;

            // Map over the checkout data to include checkoutId with each book object
            const checkedOutBooks = data.map((checkout: any) => ({
                ...checkout,
                book: {
                    ...checkout.book,
                    checkoutId: checkout.id,
                },
            }));

            const borrowed = checkedOutBooks.filter((item: any) => !item.returned);
            const returned = checkedOutBooks.filter((item: any) => item.returned);

            // Extract checkoutIds for borrowed and returned books
            const borrowedWithCheckoutIds = borrowed.map((item: any) => item.id);
            const returnedWithCheckoutIds = returned.map((item: any) => item.id);

            // Update the state with borrowed and returned lists along with checkoutIds
            setBorrowedBooks(borrowed.map((item: any) => ({ ...item, checkoutId: item.id })));
            setReturnedBooks(returned.map((item: any) => ({ ...item, checkoutId: item.id })));
        } catch (error) {
            setError('Error fetching checked-out books. Please try again.');
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    };

    const handleReturnBook = async (checkoutId: number) => {
        try {
            await axios.post(`${CHECKOUT_BASE_URL}/api/checkout/return-item`, { checkoutId }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });
            // Refresh the list of borrowed books
            await fetchCheckoutBooks(auth.token!);
        } catch (error) {
            console.error('Error returning book:', error);
            setError('Error returning book. Please try again.');
        }
    };

    return (
        <div>
            <Header />
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
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
            {!loading && !error && (
                <div>
                    <Tabs value={currentTab} indicatorColor="primary" onChange={handleTabChange} textColor="primary">
                        <Tab label="Borrowed" value="borrowed" />
                        <Tab label="Returned" value="returned" />
                    </Tabs>
                    <Box marginTop={2}>
                        {/* Borrowed Books */}
                        {borrowedBooks.map((checkout) => (
                            <Box key={checkout.book.id} marginBottom={2}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {checkout.book.title}
                                        </Typography>
                                        <Typography color="text.secondary" gutterBottom>
                                            Author: {checkout.book.author}
                                        </Typography>
                                        <Button onClick={() => handleReturnBook(checkout.checkoutId)} variant="outlined" color="primary">
                                            Return
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                        {/* Returned Books */}
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
                    </Box>
                </div>
            )
            }
        </div >
    );
};

export default UserProfile;
