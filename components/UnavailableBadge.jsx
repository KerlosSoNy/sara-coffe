"use client";

import { Badge } from "@/components/ui/badge";

export default function UnavailableBadge({ product }) {
  if (!product) return null;

  const isVariable = product.type === "variable";

  // For variable products, only show if ALL variations are out of stock
  const isUnavailable = isVariable
    ? product.variations?.every((v) => v.stock_status === "outofstock")
    : product.stock_status === "outofstock";

  if (!isUnavailable) return null;

  return (
    <Badge variant="outline" className="absolute bottom-2 right-2 z-10 ">
      Inquire
    </Badge>
  );
}
