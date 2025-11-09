import { getProductsByCategorySlug, getCategories } from "@/lib/woocommerce";
import CategoryPageClientWrapper from "@/components/CategoryPageClientWrapper";
import { Suspense } from "react";

export default async function CategoryProductsPage(props) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;

  const page = searchParams?.page || "1";
  const sortBy = searchParams?.sortBy || "menu_order";
  const sortOrder = searchParams?.sortOrder || "asc";

  const currentPage = parseInt(page, 15);
  const perPage = 15;

  const [productsData, categories] = await Promise.all([
    getProductsByCategorySlug(slug, currentPage, perPage, sortBy, sortOrder),
    getCategories(),
  ]);

  const { products, total, categoryName } = productsData;
  const totalPages = Math.ceil(total / perPage);

  if (!products || products.length === 0) {
    return <div>No products found for this category.</div>;
  }

  return (
    <Suspense fallback={null}>
      <CategoryPageClientWrapper
        products={products}
        total={total}
        categoryName={categoryName}
        slug={slug}
        currentPage={currentPage}
        totalPages={totalPages}
        categories={categories}
      />
    </Suspense>
  );
}
