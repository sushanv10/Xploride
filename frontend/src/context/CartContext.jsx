import { useState, useEffect, createContext, useContext } from "react";

// Create a Context for the cart
const CartContext = createContext();

// Define the CartProvider component
const CartProvider = ({ children }) => {
    // State to hold the cart items
    const [cart, setCart] = useState([]);

    // useEffect to load cart items from localStorage when the component mounts
    useEffect(() => {
        // Retrieve the cart items from localStorage
        const existingCartItem = localStorage.getItem('cart');

        // If there are items in localStorage, update the cart state
        if (existingCartItem) {
            setCart(JSON.parse(existingCartItem)); // Parse the JSON string to a JavaScript object
        }
    }, []); // Empty dependency array means this runs once when the component mounts

    // Provide the cart state and setter function to children via context
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children} {/* Render the children components */}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
const useCart = () => useContext(CartContext);

// Export the custom hook and the CartProvider component
export { useCart, CartProvider };
