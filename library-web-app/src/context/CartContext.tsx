// CartContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Book } from "../interfaces/Book";
// Define the shape of a CartItem
interface CartItem {
    book: Book;
    quantity: number;
}

// Define the shape of the CartContext
interface CartContextType {
    cart: CartItem[];
    addToCart: (book: Book, quantity: number) => void;
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
    const addToCart = (book: Book, quantity: number) => {
        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(
            (item) => item.book.id === book.id
        );
        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            updatedCart.push({ book, quantity });
        }
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
