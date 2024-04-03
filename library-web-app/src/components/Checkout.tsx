import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import { useAuth } from '../context/AuthContext';
import CheckoutService from '../services/CheckoutService';

const CheckoutPage = () => {
    const { cart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const userAuth = useAuth(); // Assuming you have an auth context or hook
    const checkoutService = new CheckoutService(userAuth.token!);
    const handleCheckout = async () => {
        setLoading(true);
        try {
            // due date = today + 30 days in YYYY-MM-DD format
            const due_date = new Date();
            due_date.setDate(due_date.getDate() + 30);
            // Extract bookIds and quantities from cart items
            const items = cart.map(item => ({
                userId: userAuth.userId, // Assuming userId is available in your context or state
                bookId: item.book.id,
                due_date: due_date// Replace with the desired due date
            }));

            // Call the checkoutItems API
            await checkoutService.checkoutItems(items);

            // If successful, clear the cart or perform any other actions
            // clearCart(); // Implement clearCart function if needed
            setSuccess(true);
        } catch (error) {
            console.error('Error checking out items:', error);
            setError('Failed to checkout items. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <div>
                {/* Display cart items */}
                {cart.map(item => (
                    <div key={item.book.id}>
                        <p>{item.book.title}</p>
                        <p>Quantity: {item.quantity}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {success && <p>Items successfully checked out!</p>}
            {!loading && !success && (
                <button onClick={handleCheckout}>Checkout</button>
            )}
        </div>
    );
};


export default CheckoutPage;