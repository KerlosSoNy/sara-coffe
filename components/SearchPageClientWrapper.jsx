"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";

export default function SearchPageClientWrapper({
  products,
  query,
  currentPage,
  totalPages,
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="container pb-20">
      <h1 className="text-2xl font-bold text-center mb-8 py-5">
        جستجو برای: {query}
      </h1>

      {products.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <ProductList products={products} />
        </ul>
      ) : (
        <p className="text-center">نتیجه‌ای پیدا نشد.</p>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/search?q=${encodeURIComponent(query)}`}
        />
      )}
    </div>
  );
}
