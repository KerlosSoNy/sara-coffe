// import Link from "next/link";
// import Image from "next/image";
// import ProductPriceDisplay from "@/components/ProductPriceDisplay";
// import ProductBadge from "@/components/ProductBadge";
// import DiscountBadge from "@/components/DiscountBadge";

// export default function ProductCard({ product }) {
//   if (!product) return null;

//   const { slug, name, images } = product;

//   return (
//     <Link
//       href={`/product/${slug}`}
//       className="flex flex-col border rounded-lg transition overflow-hidden hover:border-[#BCDFCF] relative"
//     >
//       <ProductBadge createdAt={product.date_created} />
//       {/* <DiscountBadge
//         regularPrice={product.regular_price}
//         salePrice={product.sale_price}
//       /> */}
//       <DiscountBadge product={product} />

//       <Image
//         src={images?.[0]?.src || "/assets/images/placeholder.webp"}
//         alt={name || "Product"}
//         className="w-full h-full object-cover mb-2"
//         width={1000}
//         height={1000}
//       />
//       <div className="flex flex-col pt-2 pb-4 px-4 min-h-[140px]">
//         <h3 className="text-base font-medium mb-2 text-right">{name}</h3>
//         <ProductPriceDisplay priceHtml={product.price_html} />
//       </div>
//     </Link>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import ProductPriceDisplay from "@/components/ProductPriceDisplay";
import ProductBadge from "@/components/ProductBadge";
import UnavailableBadge from "@/components/UnavailableBadge";
import DiscountBadge from "@/components/DiscountBadge";

export default function ProductCard({ product }) {
  if (!product) return null;

  const { slug, name, images, price_html, stock_status } = product;
  const isInStock = stock_status !== "outofstock";

  return (
    <Link
      href={`/product/${slug}`}
      className="flex flex-col transtion duration-500 overflow-hidden hover:border-[#3b504064] relative "
    >
      {/* <ProductBadge createdAt={product.date_created} /> */}

      <Image
        src={images?.[0]?.src}
        alt={name || "Product"}
        className="w-full h-full object-cover mb-2 border rounded-lg"
        width={1000}
        height={1000}
      />
      <div className="flex flex-col pt-2 pb-4 px-2 min-h-[140px]">
        <h3 className="text-base font-medium mb-2  font-arial  ">
          {name}
        </h3>
        <DiscountBadge product={product} />
        {isInStock && product.price_html ? (
          <ProductPriceDisplay
            priceHtml={product.price_html}
            fallbackPrice={`<ins>${product.price} AED</ins>`}
          />
        ) : (
          <UnavailableBadge product={product} />
        )}
      </div>
    </Link>
  );
}
