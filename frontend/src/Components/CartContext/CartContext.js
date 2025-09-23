import { createContext, useContext} from 'react';

// Create the CartContext
export const CartContext = createContext();

// Create a custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};
