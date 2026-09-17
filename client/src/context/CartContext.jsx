import { createContext, useEffect, useState } from 'react';

const CartContext = createContext();

const getInitialCart = () => {
  try {
    const raw = localStorage.getItem('agrotechCart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(getInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem('agrotechCart', JSON.stringify(items));
    } catch (err) {
      console.warn('Failed to save cart to localStorage:', err);
    }
  }, [items]);

  const addToCart = (produce, quantity = 1) => {
    const itemId = produce._id || produce.id;
    setItems((current) => {
      const existing = current.find((item) => (item._id || item.id) === itemId);
      if (existing) {
        return current.map((item) =>
          (item._id || item.id) === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...produce, _id: itemId, id: itemId, quantity }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        (item._id === id || item.id === id) ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setItems((current) => current.filter((item) => item._id !== id && item.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const itemCount = items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
