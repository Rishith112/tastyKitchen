import React, { useState, useEffect } from 'react';
import { CartContext } from '../CartContext/CartContext.ts';
import type { ContextType, FoodItemType } from '../../types/globalTypes.ts';

const CartProvider = ({ children }: {children: React.ReactNode}) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('food-delivery-cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart data from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('food-delivery-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item : FoodItemType) => {
    setCartItems((prevItems : FoodItemType[]) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem : FoodItemType) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity! + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItemFromCart = (itemId: string) => {
    setCartItems((prevItems: FoodItemType[]) => prevItems.filter((item) => item.id !== itemId));
  };

  const incrementItemQuantity = (itemId: string) => {
    setCartItems((prevItems: FoodItemType[]) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity! + 1 } : item
      )
    );
  };

  const decrementItemQuantity = (itemId: string) => {
    setCartItems((prevItems: FoodItemType[]) =>
      prevItems
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity! - 1) }
            : item
        )
        .filter((item) => item.quantity! > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  }

  const totalItems = cartItems.reduce((acc: number, item: FoodItemType) => acc + item?.quantity! , 0);
  const totalCost = cartItems.reduce((acc: number, item: FoodItemType) => acc + item.cost * item.quantity!, 0);

  const contextValue: ContextType = {
    cartItems,
    totalItems,
    totalCost,
    addItemToCart,
    removeItemFromCart,
    incrementItemQuantity,
    decrementItemQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;