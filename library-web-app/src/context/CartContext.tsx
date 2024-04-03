import React, { createContext, useContext, useState, useEffect } from "react";
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
    removeFromCart: (bookId: string) => void; // Define removeFromCart function
    clearCart: () => void;
}

// Create the CartContext
const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { }, // Initialize removeFromCart function
    clearCart: () => { },
});

// Custom hook to consume the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap the application and provide the CartContext
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

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

    // Function to remove items from the cart
    const removeFromCart = (bookId: string) => {
        const updatedCart = cart.filter(item => item.book.id !== parseInt(bookId!));
        setCart(updatedCart);
    };

    // Update local storage whenever the cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};