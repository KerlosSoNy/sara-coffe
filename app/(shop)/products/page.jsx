import { getProducts, getCategories } from "@/lib/woocommerce";
import ProductsPageClientWrapper from "@/components/ProductsPageClientWrapper";
import { Suspense } from "react";
import CategoryCard from "@/components/CategoryCard";
import Ecategories from "@/components/Ecategories";

export default async function ProductsPage({ params }) {
  const perPage = 15;
  const page = parseInt(params.page || "1", 10);

  const [categories, productsResponse] = await Promise.all([
    getCategories(),
    getProducts(page, perPage),
  ]);

  const products = productsResponse.products;
  const total = productsResponse.total;
  const totalPages = Math.ceil(total / perPage);

  const visibleCategorySlugs = [
    "specialty-roasted-coffee-beans",
    "drip-bags",
    "course",
  ];

  const selectedCategories = visibleCategorySlugs
    .map((slug) => categories.find((cat) => cat.slug === slug))
    .filter(Boolean);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-10 container mt-20">
        {selectedCategories.length > 0 ? (
          selectedCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              className="flex-1"
            />
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div> */}
      <Ecategories />

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
