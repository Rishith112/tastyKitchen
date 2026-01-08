import { createContext, useContext, } from 'react';
import type { ContextType } from '../../types/globalTypes.ts';

// Create the CartContext
export const CartContext = createContext({
} as ContextType);

// Create a custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
