import React, { createContext, useState } from 'react';

export const CartContext = createContext({
  cartItems: {},
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  getProductQuantity: () => 0
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (productId, productDetails = null) => {
    try {
      // First update the UI
      setCartItems(prev => {
        const existingItem = prev[productId];
        return {
          ...prev,
          [productId]: {
            ...productDetails,
            quantity: (existingItem?.quantity || 0) + 1,
            name: productDetails?.name || existingItem?.name,
            price: productDetails?.price || existingItem?.price,
          }
        };
      });

      // Then make the API call
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          productDetails
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart on server');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      // Optionally revert the UI change if the API call fails
      // You might want to show an error message to the user here
    }
  };

  const removeFromCart = async (productId) => {
    try {
      // First update the UI
      setCartItems(prev => {
        const updatedCart = { ...prev };
        const existingItem = updatedCart[productId];

        if (existingItem.quantity > 1) {
          updatedCart[productId] = {
            ...existingItem,
            quantity: existingItem.quantity - 1
          };
        } else {
          delete updatedCart[productId];
        }
        
        return updatedCart;
      });

      // Then make the API call
      const response = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity: 1
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart on server');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      // Optionally revert the UI change if the API call fails
      // You might want to show an error message to the user here
    }
  };

  const cartCount = Object.values(cartItems).reduce(
    (total, item) => total + item.quantity, 
    0
  );

  const getProductQuantity = (productId) => {
    return cartItems[productId]?.quantity || 0;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      getProductQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;