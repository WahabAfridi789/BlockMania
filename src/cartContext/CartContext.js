import React, { useContext, createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Load user ID from local storage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser._id) {
            setUserId(storedUser._id);
        }
    }, []);

    useEffect(() => {
        // Load cart items for the user from local storage if userId is available
        if (userId) {
            const storedUserCartItems = localStorage.getItem(
                `userCartItems_${userId}`
            );
            if (storedUserCartItems) {
                setCartItems(JSON.parse(storedUserCartItems));
            }
        }
    }, [userId]);

    const updateLocalStorage = (items) => {
        if (userId) {
            localStorage.setItem(
                `userCartItems_${userId}`,
                JSON.stringify(items)
            );
        }
    };

    const addToCart = (item) => {
        // Check if item already exists in cart
        console.log("ITEM", item);
        const itemExists = cartItems.some(
            (cartItem) => cartItem.metadata.id === item.metadata.id
        );

        if (!itemExists) {
            const newCartItems = [...cartItems, item];
            setCartItems(newCartItems);
            updateLocalStorage(newCartItems);
        } else {
            setError("Item already exists in the cart.");
            console.log("Item already exists in the cart.");
        }
    };

    const removeFromCart = (itemId) => {
        console.log(itemId);
        console.log("");
        const updatedCartItems = cartItems.filter(
            (item) => item.metadata.id !== itemId
        );
        console.log(updatedCartItems);
        setCartItems(updatedCartItems);
        updateLocalStorage(updatedCartItems);
    };

    const clearCart = () => {
        setCartItems([]);
        if (userId) {
            localStorage.removeItem(`userCartItems_${userId}`);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                error,
                setError,
                setUserId, // To set the userId dynamically if needed
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
