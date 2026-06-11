import { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (produce, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item._id === produce._id);
      if (existing) {
        return current.map((item) =>
          item._id === produce._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...produce, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setItems((current) => current.filter((item) => item._id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
