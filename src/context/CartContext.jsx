// CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const [addedItemId, setAddedItemId] = useState(null);

  // Save cartItems to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item) => {
    const exists = cartItems.find((i) => i._id === item._id);
    if (exists) {
      setCartItems((prev) =>
        prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }

    setAddedItemId(item._id);
    setTimeout(() => setAddedItemId(null), 1000);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i._id === id ? { ...i, quantity: Math.max(qty, 1) } : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  // Reusable handlers
  const handleAddToCart = (card, e) => {
    e?.stopPropagation();
    addToCart(card);
  };

  const handleBuyNow = (card, e, navigate) => {
    e?.stopPropagation();
    navigate("/checkout", { state: { card } });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        addedItemId,
        handleAddToCart,
        handleBuyNow,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;