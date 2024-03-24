import { Product } from '@/types';
import React, { ReactNode, createContext, useContext, useEffect, useReducer } from 'react';

// Define types for the items in the cart
interface CartItem {
  product: Product
  quantity: number
}

// Define the shape of the cart state
interface CartState {
  items: CartItem[];
}

// Define the actions that can be dispatched to the reducer
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART_ITEMS'; payload: CartItem[] };

// Create a reducer function to handle state updates
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.product.id === action.payload.product.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        localStorage.setItem('cartItems', JSON.stringify(updatedItems))
        return { ...state, items: updatedItems };
      } else {
        const newItems = [...state.items, action.payload];
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        return { ...state, items: newItems };
      }
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.product.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(filteredItems))
      return { ...state, items: filteredItems };
    case 'CLEAR_CART':
      localStorage.removeItem('cartItems'); // Clear cart items from localStorage
      return { ...state, items: [] };
    case 'LOAD_CART_ITEMS':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

// Create the CartContext
const CartContext = createContext<{
  cart: CartState;
  addItemToCart: (product: Product, quantity?: number) => void;
  removeItemFromCart: (itemId: number) => void;
  clearCart: () => void;
}>({
  cart: { items: [] },
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearCart: () => { },
});

// Create a custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

interface CartProviderProps {
  children: ReactNode;
}
// Create the CartProvider component
export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      dispatch({ type: 'LOAD_CART_ITEMS', payload: JSON.parse(storedCartItems) });
    }
  }, []);

  const addItemToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItemFromCart = (itemId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addItemToCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
