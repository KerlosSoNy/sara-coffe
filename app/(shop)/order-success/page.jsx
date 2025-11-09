"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getOrderDetails } from "@/lib/woocommerce";
import { useCart } from "@/lib/context/CartContext";

function OrderSuccessInner() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { clearCart } = useCart();

  useEffect(() => {
    if (!orderId) {
      setError("Missing order ID.");
      setLoading(false);
      return;
    }

    getOrderDetails(orderId)
      .then((data) => {
        setOrder(data);
        clearCart(); // Optionally clear cart after successful order
      })
      .catch((err) => {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order details.");
      })
      .finally(() => setLoading(false));
  }, [orderId, clearCart]);

  if (loading) {
    return <div className="text-center py-10">Loading your order...</div>;
  }

  if (error || !order) {
    return (
      <div className="text-center py-10 text-red-600">
        ❌ {error || "No order found."}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 text-center font-montserrat">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Order Placed Successfully!
      </h1>
      <p className="text-lg">
        <strong>Order Number:</strong> #{order.id}
      </p>
      <p className="mt-2">
        <strong>Total Amount:</strong> {order.total} AED
      </p>
      <p className="mt-2">
        <strong>Payment Method:</strong> {order.payment_method_title}
      </p>
      <p className="mt-2 text-gray-700">
        <strong>Email:</strong> {order.billing.email}
      </p>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <OrderSuccessInner />
    </Suspense>
  );
}
