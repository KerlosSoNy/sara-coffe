import { getProducts, getCategories } from "@/lib/woocommerce";
import ProductsPageClientWrapper from "@/components/ProductsPageClientWrapper";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProductsPaginationPage({ params }) {
  const perPage = 15;
  const page = parseInt(params.page || "1", 10);
  if (isNaN(page) || page < 1) return notFound();

  const [categories, productsResponse] = await Promise.all([
    getCategories(),
    getProducts(page, perPage),
  ]);

  const products = productsResponse.products;
  const total = productsResponse.total;
  const totalPages = Math.ceil(total / perPage);

  if (page > totalPages) return notFound();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageClientWrapper
        products={products}
        total={total}
        slug="products"
        currentPage={page}
        totalPages={totalPages}
        categories={categories}
        categoryName="همه محصولات"
      />
    </Suspense>
  );
}
