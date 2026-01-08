import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState("");

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Ensure we're comparing the correct property
      const existingProduct = prevCart.find((item) => item.id === product.productid);
  
      if (existingProduct) {
        // If the product already exists, increase the quantity
        return prevCart.map((item) =>
          item.id === product.productid
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product to the cart with quantity 1
        return [...prevCart, { ...product, id: product.productid, quantity: 1 }];
      }
    });
  
    // Assuming the notification shows the product name, pass the correct value
    setNotification(`${product.pname} added to cart!`);
    setTimeout(() => setNotification(""), 2000); // For 2 seconds
  };  

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};