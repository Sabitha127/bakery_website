
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, variant: string) => void;
  updateQuantity: (
    id: number,
    variant: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("butter-bloom-cart");

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch {
        setCartItems([]);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "butter-bloom-cart",
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, isLoaded]);

  const addToCart = (item: CartItem) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.variant === item.variant
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.variant === item.variant
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem
        );
      }

      return [...currentItems, item];
    });
  };

  const removeFromCart = (id: number, variant: string) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => !(item.id === id && item.variant === variant)
      )
    );
  };

  const updateQuantity = (
    id: number,
    variant: string,
    quantity: number
  ) => {
    if (quantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.variant === variant
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
