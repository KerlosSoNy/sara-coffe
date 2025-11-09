"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SortFilter from "@/components/SortFilter";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";

export default function ProductsPageClientWrapper({
  products,
  total,
  currentPage,
  totalPages,
  categories,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (filters) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("sortBy", filters.sortBy);
    queryParams.set("sortOrder", filters.sortOrder);
    queryParams.set("page", "1");
    router.push(`/products?${queryParams.toString()}`);
  };

  // const collectionSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "CollectionPage",
  //   name: "محصولات",
  //   description: "خرید همه محصولات در فروشگاه کاما گیرز",
  //   mainEntity: products.map((product) => ({
  //     "@type": "Product",
  //     name: product.name,
  //     image: product.images?.[0]?.src,
  //     sku: product.sku,
  //     url: `https://camagears.ir/product/${product.slug}`,
  //     offers: {
  //       "@type": "Offer",
  //       priceCurrency: "IRR",
  //       price: product.price,
  //       availability:
  //         product.stock_status === "instock"
  //           ? "https://schema.org/InStock"
  //           : "https://schema.org/OutOfStock",
  //     },
  //   })),
  // };

  // const breadcrumbSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "BreadcrumbList",
  //   itemListElement: [
  //     {
  //       "@type": "ListItem",
  //       position: 1,
  //       name: "خانه",
  //       item: "https://camagears.ir",
  //     },
  //     {
  //       "@type": "ListItem",
  //       position: 2,
  //       name: "همه محصولات",
  //       item: `https://camagears.ir/products`,
  //     },
  //   ],
  // };

  return (
    <div className="container pb-20">
      {/* <h2 className="text-2xl text-center font-bold mb-8 py-5">All Products</h2> */}

      {/* <SortFilter
        defaultSort={`${searchParams.get("sortBy") || "menu_order"}-${
          searchParams.get("sortOrder") || "asc"
        }`}
        onFilterChange={handleSortChange}
      /> */}

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 pt-20">
        <ProductList products={products} />
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/products`}
      />

      {/* ✅ JSON-LD Structured Data */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      /> */}
    </div>
  );
}
