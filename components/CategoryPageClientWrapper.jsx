"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SortFilter from "@/components/SortFilter";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";

export default function CategoryPageClientWrapper({
  products,
  total,
  categoryName,
  slug,
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
    router.push(`/category/${slug}?${queryParams.toString()}`);
  };

  return (
    <div className="container pb-20">
      <h2 className="text-2xl text-center font-bold mb-8 py-5  font-arial  ">
        {categoryName}
      </h2>

      {/* <SortFilter
        defaultSort={`${searchParams.get("sortBy") || "menu_order"}-${
          searchParams.get("sortOrder") || "asc"
        }`}
        onFilterChange={handleSortChange}
      /> */}

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <ProductList products={products} />
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/category/${slug}`}
      />
    </div>
  );
}
