import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch the user on initial load to check authentication
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex((item) => item._id === product._id);
  
      let updatedCart;
      if (existingProductIndex !== -1) {
        updatedCart = [...prevItems];
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }
  
      localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update localStorage
      saveCartToBackend(updatedCart); // Save updated cart to backend
      return updatedCart;
    });
  };
  

  // Remove product from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item._id !== id);

      // If cart is empty, remove it from localStorage
      if (updatedCart.length === 0) {
        localStorage.removeItem('cartItems'); // Remove cart from localStorage when empty
      } else {
        localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update localStorage with the new cart
      }

      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]); // Reset state
    localStorage.removeItem('cartItems'); // Remove from localStorage
    saveCartToBackend([]); // Clear cart in backend
  };
  
  // Save cart to backend
  const saveCartToBackend = async (cartItems) => {
    try {
      const token = localStorage.getItem('token'); // Get authentication token
      const response = await axios.post('http://localhost:5000/api/cart/save', {
        cartItems,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for user authentication
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error saving cart to backend:', error);
    }
  };
  

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/user/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cartItems = response.data.cartItems || [];
        setCartItems(cartItems); // Set cart state
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Sync to localStorage
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCartItems([]); // Reset cart on error
      }
    } else {
      // For guest users, load cart from localStorage
      const savedCart = localStorage.getItem('cartItems');
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    }
  };
  const fetchCartFromBackend = async () => {
    try {
      const token = localStorage.getItem('token'); // Get authentication token
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for user authentication
        },
      });
      return response.data.cartItems; // Assuming the API returns an array of cart items
    } catch (error) {
      console.error('Error fetching cart from backend:', error);
      return [];
    }
  };
  
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, setCartItems, clearCart, saveCartToBackend, fetchCart,fetchCartFromBackend, user, setUser }}>
      {children}
    </CartContext.Provider>
  );
};
