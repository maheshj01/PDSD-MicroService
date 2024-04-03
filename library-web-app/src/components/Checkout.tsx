// CheckoutPage.js

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutService from '../services/CheckoutService';
import Header from './Header';
import './Checkout.css';

const CheckoutPage = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const userAuth = useAuth();
    const checkoutService = new CheckoutService(userAuth.token!);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const due_date = new Date();
            due_date.setDate(due_date.getDate() + 30);
            const items = cart.map(item => ({
                userId: userAuth.userId,
                bookId: item.book.id,
                due_date: due_date
            }));
            await checkoutService.checkoutItems(items);
            clearCart();
            setSuccess(true);
        } catch (error) {
            console.error('Error checking out items:', error);
            setError('Failed to checkout items. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = (bookId: string) => {
        removeFromCart(bookId);
    };

    return (
        <div className="checkout-container">
            <Header />
            <div className="checkout-content">
                <h1 className="checkout-heading">Checkout</h1>
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.book.id} className="cart-item">
                            <p className="cart-item-title">{item.book.title}</p>
                            <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                            <button className="remove-button" onClick={() => handleRemoveItem(item.book.id.toString())}>Remove</button>
                        </div>
                    ))}
                </div>
                {loading && <p className="loading-message">Loading...</p>}
                {error && <p className="error-message">Error: {error}</p>}
                {success && <p className="success-message">Items successfully checked out!</p>}
                {!loading && !success && (
                    <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;