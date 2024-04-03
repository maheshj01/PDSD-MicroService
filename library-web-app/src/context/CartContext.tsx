// CartContext.tsx
import React, { createContext, useContext, useState } from "react";

// Define the shape of a CartItem
interface CartItem {
    bookId: number;
    quantity: number;
}

// Define the shape of the CartContext
interface CartContextType {
    cart: CartItem[];
    addToCart: (bookId: number, quantity: number) => void;
}

// Create the CartContext
const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => { },
});

// Custom hook to consume the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap the application and provide the CartContext
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Function to add items to the cart
    const addToCart = (bookId: number, quantity: number) => {
        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(
            (item) => item.bookId === bookId
        );
        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            updatedCart.push({ bookId, quantity });
        }
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
