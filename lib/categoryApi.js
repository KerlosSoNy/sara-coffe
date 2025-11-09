import { woocommerce } from "../woocommerce";

// Get all product categories
export const getCategories = async () => {
  const { data } = await woocommerce.get("/products/categories");
  return data.filter((category) => category.name !== "Uncategorized");
};

// Get products by category slug
export const getProductsByCategorySlug = async (
  slug,
  page = 1,
  perPage = 10,
  sortBy = "price",
  sortOrder = "asc",
  filters = {}
) => {
  const { data: categories } = await woocommerce.get("/products/categories", {
    params: { slug },
  });

  if (!categories.length) {
    return { products: [], total: 0, categoryName: null };
  }

  const category = categories[0];
  const categoryId = category.id;

  const params = {
    category: categoryId,
    page,
    per_page: perPage,
    orderby: sortBy,
    order: sortOrder,
    ...filters,
  };

  const response = await woocommerce.get("/products", { params });

  return {
    products: Array.isArray(response.data) ? response.data : [],
    total: parseInt(response.headers["x-wp-total"], 10),
    categoryName: category.name,
  };
};

// Get category by slug
export const getCategoryBySlug = async (slug) => {
  try {
    const { data } = await woocommerce.get("/products/categories", {
      params: { slug },
    });
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return null;
  }
};
