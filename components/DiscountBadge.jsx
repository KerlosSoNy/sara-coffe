// "use client";

// import { Badge } from "@/components/ui/badge";

// export default function DiscountBadge({ regularPrice, salePrice }) {
//   const reg = parseFloat(regularPrice);
//   const sale = parseFloat(salePrice);

//   if (!reg || !sale || reg <= sale) return null;

//   const discount = Math.round(((reg - sale) / reg) * 100);

//   return (
//     <Badge
//       variant="destructive"
//       className="absolute top-2 right-2 z-[999] bg-red-600 text-white"
//     >
//       {discount}% تخفیف
//     </Badge>
//   );
// }

"use client";

import { Badge } from "@/components/ui/badge";

export default function DiscountBadge({ product }) {
  if (!product) return null;

  let maxDiscount = 0;

  if (product.type === "variable" && Array.isArray(product.variations)) {
    product.variations.forEach((variant) => {
      const reg = parseFloat(variant.regular_price);
      const sale = parseFloat(variant.sale_price);

      if (reg > 0 && sale > 0 && reg > sale) {
        const discount = Math.round(((reg - sale) / reg) * 100);
        if (discount > maxDiscount) maxDiscount = discount;
      }
    });
  } else {
    const reg = parseFloat(product.regular_price);
    const sale = parseFloat(product.sale_price);

    if (reg > 0 && sale > 0 && reg > sale) {
      maxDiscount = Math.round(((reg - sale) / reg) * 100);
    }
  }

  if (maxDiscount === 0) return null;

  return (
    <Badge
      variant="destructive"
      className="absolute top-2 right-2 bg-red-600 text-white  font-arial "
    >
      {maxDiscount}% Sale
    </Badge>
  );
}
