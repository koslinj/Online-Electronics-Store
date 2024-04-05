import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product } from '@/types';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

export interface CartItem {
  product: Product
  quantity: number
}

// Create the CartContext
const CartContext = createContext<{
  cart: CartItem[];
  orderingState: "inProgress" | "summary"
  setOrderingState: Dispatch<SetStateAction<"inProgress" | "summary">>
  addOne: (product: Product) => void;
  add: (product: Product, n: number) => void;
  removeAll: (product: Product) => void;
  removeOne: (product: Product) => void;
  clearCart: () => void;
}>({
  cart: [],
  orderingState: "inProgress",
  setOrderingState: () => { },
  addOne: () => { },
  add: () => { },
  removeAll: () => { },
  removeOne: () => { },
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
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])
  const [orderingState, setOrderingState] = useState<"inProgress" | "summary">("inProgress")

  function getProductQuantity(product: Product) {
    const quantity = cartItems.find(item => item.product.id === product.id)?.quantity
    if (quantity === undefined) {
      return 0
    }
    return quantity
  }

  const add = (product: Product, n: number) => {
    const quantity = getProductQuantity(product)

    if (quantity === 0) {
      setCartItems([...cartItems, { product: product, quantity: n }])
    } else {
      setCartItems(cartItems.map(
        item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + n }
            : item
      ))
    }
  };

  const addOne = (product: Product) => {
    const quantity = getProductQuantity(product)

    if (quantity === 0) {
      setCartItems([...cartItems, { product: product, quantity: 1 }])
    } else {
      setCartItems(cartItems.map(
        item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
      ))
    }
  };

  const removeAll = (product: Product) => {
    setCartItems(cartItems.filter(item => item.product.id !== product.id))
  };

  const removeOne = (product: Product) => {
    const quantity = getProductQuantity(product)

    if (quantity === 1) {
      setCartItems(cartItems.filter(item => item.product.id !== product.id))
    } else {
      setCartItems(cartItems.map(
        item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
      ))
    }
  };

  const clearCart = () => {
    setCartItems([])
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        orderingState,
        setOrderingState,
        addOne,
        add,
        removeAll,
        removeOne,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
