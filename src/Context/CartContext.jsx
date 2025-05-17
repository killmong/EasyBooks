// context/CartContext.jsx
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [itemQuantity, setItemQuantity] = useState({});
  const [getCartBooks, setGetCartBooks] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);

  const placeOrder = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = user?.token;
    const id = user?.id;
    try {
      const response = await fetch(
        "http://localhost:3000/api/cart/placeOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            id: id,
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cart: getCartBooks }),
        }
      );
      if (response.ok) {
        localStorage.removeItem("cart");
        localStorage.removeItem("discountPercent");
        setGetCartBooks([]);
        setItemQuantity({});
        console.log("Order placed successfully");
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  // Calculate total items
  const totalItems = useMemo(() => {
    return Object.values(itemQuantity).reduce((acc, qty) => acc + qty, 0);
  }, [itemQuantity]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return getCartBooks.reduce(
      (total, book) => total + book.price * (itemQuantity[book._id] || 1),
      0
    );
  }, [getCartBooks, itemQuantity]);

  // Shipping charge rule
  const shippingCharge = totalPrice < 500 ? 40 : 0;

  // Generate or retrieve discount once
  useEffect(() => {
    const stored = localStorage.getItem("discountPercent");
    if (stored) {
      setDiscountPercent(parseInt(stored));
    } else {
      const random = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
      setDiscountPercent(random);
      localStorage.setItem("discountPercent", random.toString());
    }
  }, []);

  const clearCart = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      console.error("User not found in session storage");
      return;
    }
    const token = user.token;
    const id = user.id;

    try {
      const res = await fetch("http://localhost:3000/api/cart/clearCart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          id: id,
        },
      });
      if (res.ok) {
        setGetCartBooks([]);
        setItemQuantity({});
        localStorage.removeItem("cart");
        localStorage.removeItem("discountPercent");
      } else {
        console.error("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const discountAmount = (discountPercent / 100) * totalPrice;
  const intermediateAmount = parseInt(discountAmount)
  const finalAmount = totalPrice - intermediateAmount + shippingCharge;

  return (
    <CartContext.Provider
      value={{
        clearCart,
        totalItems,
        totalPrice,
        shippingCharge,
        discountPercent,
        discountAmount,
        finalAmount,
        itemQuantity,
        setItemQuantity,
        getCartBooks,
        setGetCartBooks,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
