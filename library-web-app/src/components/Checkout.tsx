// Checkout.tsx
import React from "react";
import { useCart } from "../context/CartContext";
import Header from "./Header";

const Checkout: React.FC = () => {
    const { cart } = useCart();

    return (
        <div>
            <Header />
            <h1>Checkout</h1>
            {/* Display cart items */}
            <ul>
                {cart.map((item) => (
                    <li key={item.bookId}>
                        Book ID: {item.bookId}, Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            {/* Checkout form */}
            {/* ... */}
        </div>
    );
};

export default Checkout;
