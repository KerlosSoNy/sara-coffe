"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import VariantSelector from "./VariantSelector";
import QuantitySelector from "./QuantitySelector";

export default function ProductPrice({
  product,
  selectedVariant,
  onVariantChange,
}) {
  console.log("Raw product variations:", product.variations);
  const [quantity, setQuantity] = useState(1);

  const isVariable =
    product.type === "variable" && Array.isArray(product.variations);

  let price = product.price ? parseFloat(product.price) : null;
  let sale_price = product.sale_price ? parseFloat(product.sale_price) : null;
  let regular_price = product.regular_price
    ? parseFloat(product.regular_price)
    : null;

  if (!selectedVariant && isVariable) {
    const validSales = product.variations
      .map((v) => parseFloat(v.sale_price))
      .filter((v) => !isNaN(v) && v > 0);
    const validRegulars = product.variations
      .map((v) => parseFloat(v.regular_price))
      .filter((v) => !isNaN(v) && v > 0);

    if (validSales.length > 0) {
      sale_price = Math.min(...validSales);
      regular_price = Math.max(...validRegulars);
    } else if (validRegulars.length > 0) {
      price = Math.min(...validRegulars);
    }
  }

  if (selectedVariant) {
    price = parseFloat(selectedVariant.price);
    sale_price = parseFloat(selectedVariant.sale_price);
    regular_price = parseFloat(selectedVariant.regular_price);
  }

  const productToAdd = selectedVariant || product;
  const isOutOfStock = productToAdd.stock_status === "outofstock";
  const availableStock =
    productToAdd.manage_stock && productToAdd.stock_quantity
      ? productToAdd.stock_quantity
      : null;

  const formatPrice = (value) => {
    if (!value || !isFinite(value)) return "—";
    return new Intl.NumberFormat("en-US").format(value);
  };

  return (
    <>
      {!isOutOfStock && (
        <div className="mb-6 font-montserrat">
          {sale_price ? (
            <div>
              <p className="text-lg font-medium text-red-500">
                AED {formatPrice(sale_price)}
              </p>
              <p className="text-sm text-gray-500 line-through">
                AED {formatPrice(regular_price)}
              </p>
            </div>
          ) : (
            <p className="text-xl font-medium">AED {formatPrice(price)}</p>
          )}
        </div>
      )}
      {product.variations?.length > 0 && (
        <VariantSelector
          product={product}
          variants={product.variations}
          onVariantChange={onVariantChange}
        />
      )}

      <p className="pb-5">Taxes excluded.</p>
      {isOutOfStock ? (
        <p className="text-red-500 mb-10">Sold Out</p>
      ) : (
        <div className="block md:flex items-center gap-4">
          <QuantitySelector
            initialQuantity={1}
            maxQuantity={availableStock}
            onChange={(value) => setQuantity(value)}
          />

          <AddToCartButton
            product={product}
            variant={selectedVariant}
            quantity={quantity}
          />
        </div>
      )}
    </>
  );
}
