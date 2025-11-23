"use client";

import { useState } from "react";
import { useCart } from "@/lib/context/CartContext";
import { getCouponByCode } from "@/lib/woocommerce";
import QuantitySelector from "@/components/product/QuantitySelector";
import Link from "next/link";
import Title from "@/components/Title";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    coupon,
    applyCoupon,
    clearCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount =
    coupon?.discount_type === "percent"
      ? (subtotal * parseFloat(coupon.amount)) / 100
      : coupon?.discount_type === "fixed_cart"
      ? parseFloat(coupon.amount)
      : 0;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleApplyCoupon = async () => {
    try {
      setCouponError("");
      const fetchedCoupon = await getCouponByCode(couponCode.trim());
      applyCoupon(fetchedCoupon); // ✅ save globally
    } catch (error) {
      setCouponError(error.message || "Invalid coupon");
      clearCoupon();
    }
  };

  return (
    <div className="container py-10 font-adorealternate">
      <Title
        tag="h2"
        className="text-2xl md:text-4xl text-center p-2 font-arialuppercase"
      >
        Cart
      </Title>

      {cart.length === 0 ? (
        <Title tag="h3" className="text-xl text-center">
          Your cart is empty
        </Title>
      ) : (
        <div className="block md:flex gap-5">
          {/* Cart Items */}
          <div className="w-full md:w-[60%] p-2 rounded-[8px]">
            <ul>
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-gray-300 py-4 flex gap-4"
                >
                  <div className="flex-grow">
                    <p className="font-medium md:text-xl mb-1">{item.name}</p>
                    <p>Price: {item.price} AED</p>
                    <div className="mt-2 mb-2">
                      <QuantitySelector
                        initialQuantity={item.quantity}
                        onChange={(newQty) =>
                          handleQuantityChange(item.id, newQty)
                        }
                      />
                    </div>
                    <p>Subtotal: {item.price * item.quantity} AED</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary */}
          <div className="w-full md:w-[40%] border py-4 px-6 rounded-[8px]">
            <p className="mb-2">Subtotal: {subtotal} AED</p>
            {discount > 0 && (
              <p className="text-green-600 mb-2">
                Discount ({coupon.code}): {discount} AED
              </p>
            )}
            <p className="md:text-xl font-bold mt-2">
              Total: {(subtotal - discount).toFixed(2)} AED
            </p>

            {/* Coupon Input */}
            <div className="mt-4">
              <label className="block font-medium mb-1">Discount Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="coffee50"
                  className="flex-grow px-3 py-2 border rounded"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-red-500 mt-1 text-sm">{couponError}</p>
              )}
            </div>

            <Link href="/checkout">
              <button className="bg-[#3c3c3c] text-white px-4 py-2 rounded mt-4 w-full transition duration-300">
                Go to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

