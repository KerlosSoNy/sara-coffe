"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedCoupon = localStorage.getItem("coupon");
    if (savedCoupon) setCoupon(JSON.parse(savedCoupon));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem("coupon", JSON.stringify(coupon));
    } else {
      localStorage.removeItem("coupon");
    }
  }, [coupon]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          )
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: product.quantity || 1,
              thumbnail:
                product.images?.length > 0 ? product.images[0].src : null,
              variants: product.variants || null,
            },
          ];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const updateCartItemQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const getTotalQuantity = () => cart.reduce((t, i) => t + i.quantity, 0);

  const applyCoupon = (couponObject) => setCoupon(couponObject);
  const clearCoupon = () => setCoupon(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        getTotalQuantity,
        coupon,
        applyCoupon,
        clearCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
