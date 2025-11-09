"use client";

import { useCart } from "@/lib/context/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function AddToCartButton({ product, variant, quantity = 1 }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (quantity < 1) return;

    // If product is variable and no variant selected, block action
    if (product.type === "variable" && !variant) {
      toast({
        title: "Please select a variant",
        description: "Choose options before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    // Decide whether we're adding the parent or the selected variation
    const targetProduct = variant || product;

    // Gather up any selected attributes
    const attributes = {};
    if (targetProduct.attributes?.length) {
      targetProduct.attributes.forEach((attr) => {
        if (attr.name && attr.option) {
          attributes[attr.name] = attr.option;
        }
      });
    }

    // Figure out the price
    const price =
      parseFloat(targetProduct.price) ||
      parseFloat(targetProduct.sale_price) ||
      parseFloat(targetProduct.regular_price) ||
      0;

    // Fire the cart add, now including both parentId & variationId
    addToCart({
      // use the variation‘s ID if it exists, otherwise the parent
      id: variant?.id || product.id,

      // keep both parent + variation ID on the item
      parentId: product.id,
      variationId: variant?.id || null,

      name: product.name,
      parentName: product.name,
      variantName:
        variant?.attributes?.map((v) => v.option).join(" - ") || null,
      price,
      quantity,
      thumbnail: product.images?.[0]?.src || "/images/placeholder.webp",
      attributes,
    });

    toast({
      title: "Product added to cart",
      description: product.name,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full md:max-w-sm group relative overflow-hidden h-12 px-8 rounded-sm shadow-sm bg-[#3c3c3c] text-white cursor-pointer md:mt-0 mt-5"
    >
      <span className="relative z-10 group-hover:font-medium">Add to Cart</span>
    </button>
  );
}
