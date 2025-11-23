"use client";

import ProductPrice from "@/components/product/ProductPrice";
import ProductImage from "@/components/product/ProductImage";
import Title from "@/components/Title";
import ProductAttributes from "@/components/product/ProductAttributes";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import ProductShortDescription from "./ProductShortDescription";

export default function ProductPageWrapper({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  console.log(product);

  return (
    <section className="container pt-10 pb-20">
      <div className="block md:grid md:grid-cols-12 gap-x-10">
        <div className="md:col-span-6 ">
          <ProductImage product={selectedVariant || product} />
        </div>
        <div className="md:col-span-6 ">
          <Title
            tag="h1"
            className="text-xl md:text-4xl font-arialmy-5"
          >
            {product.name}
          </Title>

          <ProductShortDescription description={product.short_description} />

          <ProductPrice
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
          />
        </div>
      </div>

      <Separator className="mt-2 mb-6" />

      <div className="mb-5">
        <Title
          tag="h2"
          className="text-xl md:text-2xl mb-4 font-arialfont-medium"
        >
          Product Description
        </Title>
        <div
          className="text-gray-700 mb-4 font-adorealternate"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>

      <div className="mb-5">
        <Title
          tag="h2"
          className="text-xl md:text-2xl mb-4 font-arialfont-medium"
        >
          Product Specification
        </Title>
        <ProductAttributes attributes={product.attributes} />
      </div>
    </section>
  );
}
