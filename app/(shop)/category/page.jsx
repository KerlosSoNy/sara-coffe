import CategoryCard from "@/components/CategoryCard";

import { getCategories } from "@/lib/woocommerce";

import Title from "@/components/Title";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4">
      <Title tag="h2" className="text-2xl text-center font-bold py-10">
        خرید بر اساس دسته‌بندی
      </Title>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <p>دسته بندی پیدا نشد.</p>
        )}
      </div>
    </div>
  );
}
