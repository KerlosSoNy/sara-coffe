import { getProductsBySearch } from "@/lib/woocommerce";
import SearchPageClientWrapper from "@/components/SearchPageClientWrapper";
import { Suspense } from "react";

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || "";
  const page = parseInt(searchParams?.page || "1", 10);
  const perPage = 12;

  if (!query.trim()) {
    return (
      <div className="container py-20 text-center">
        Please enter a search term.
      </div>
    );
  }

  const { products, total } = await getProductsBySearch(query, page, perPage);
  const totalPages = Math.ceil(total / perPage);

  return (
    <Suspense fallback={null}>
      <SearchPageClientWrapper
        products={products}
        query={query}
        currentPage={page}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
