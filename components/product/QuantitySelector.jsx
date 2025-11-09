"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react"; // Icon library

export default function QuantitySelector({
  initialQuantity = 1,
  maxQuantity = null,
  onChange,
  label = "",
  disabled = false,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const updateQuantity = (value) => {
    const safeValue = Math.max(
      1,
      maxQuantity ? Math.min(value, maxQuantity) : value
    );
    setQuantity(safeValue);
    onChange?.(safeValue);
  };

  const increment = () => updateQuantity(quantity + 1);
  const decrement = () => updateQuantity(quantity - 1);

  return (
    <div className="flex items-center gap-4 font-montserrat">
      <button
        onClick={decrement}
        disabled={disabled || quantity <= 1}
        className="w-10 h-10 flex items-center justify-center border rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50"
        aria-label="کاهش تعداد"
      >
        <Minus className="w-5 h-5" />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
        min="1"
        max={maxQuantity || undefined}
        disabled={disabled}
        className="w-16 border rounded-md px-3 py-2 text-center text-gray-900 disabled:opacity-50 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-label="تعداد"
      />
      <button
        onClick={increment}
        disabled={disabled || (maxQuantity && quantity >= maxQuantity)}
        className="w-10 h-10 flex items-center justify-center border rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50"
        aria-label="افزایش تعداد"
      >
        <Plus className="w-5 h-5" />
      </button>
      {label && (
        <label htmlFor="quantity" className="text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
}
