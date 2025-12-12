import axios from "axios";

// Base URLs
const WC_API_URL = process.env.NEXT_PUBLIC_WC_API_URL;
const JWT_API_URL = process.env.NEXT_PUBLIC_JWT_API_URL;
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

// WooCommerce API Credentials
const CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

// Admin Token for User Registration
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

// Axios instance for WooCommerce with timeout
const woocommerce = axios.create({
  baseURL: WC_API_URL,
  timeout: 30000, // 30 seconds timeout
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
  },
});

// Axios instance for WordPress API
const wpApi = axios.create({
  baseURL: WP_API_URL,
  timeout: 30000,
});

export default woocommerce;

// ============================================
// PRODUCTS
// ============================================

export const getProductsBySearch = async (query, page = 1, perPage = 15) => {
  try {
    const response = await woocommerce.get("/products", {
      params: {
        search: query,
        page,
        per_page: perPage,
      },
    });
    return {
      products: response.data,
      total: parseInt(response.headers["x-wp-total"], 10),
    };
  } catch (error) {
    console.error("Error searching products:", error.message);
    return { products: [], total: 0 };
  }
};

export const getProducts = async (page = 1, perPage = 15) => {
  try {
    const response = await woocommerce.get("/products", {
      params: {
        page,
        per_page: perPage,
      },
    });

    return {
      products: response.data,
      total: parseInt(response.headers["x-wp-total"], 10),
    };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return { products: [], total: 0 };
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const { data } = await woocommerce.get("/products", { params: { slug } });
    if (data.length) {
      const product = data[0];

      if (product.type === "variable") {
        const { data: variations } = await woocommerce.get(
          `/products/${product.id}/variations`,
          { params: { per_page: 100 } }
        );

        product.variations = variations.map((v) => ({
          ...v,
          images: v.image?.src
            ? [{ src: v.image.src }, ...product.images]
            : product.images,
        }));
      }

      return product;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product by slug:", error.message);
    return null;
  }
};

// ============================================
// CATEGORIES
// ============================================

export const getCategories = async () => {
  try {
    const { data } = await woocommerce.get("/products/categories", {
      params: {
        per_page: 100,
        hide_empty: false,
      },
    });

    return data.filter((category) => category.name !== "Uncategorized");
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return []; // ✅ Return empty array to prevent build crash
  }
};

export const getProductsByCategorySlug = async (
  slug,
  page = 1,
  perPage = 15,
  sortBy = "price",
  sortOrder = "asc"
) => {
  try {
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
    };

    const response = await woocommerce.get("/products", { params });
    const products = Array.isArray(response.data) ? response.data : [];

    const enrichedProducts = await Promise.all(
      products.map(async (product) => {
        if (product.type === "variable") {
          try {
            const { data: variations } = await woocommerce.get(
              `/products/${product.id}/variations`
            );

            const validPrices = variations
              .map((v) => parseFloat(v.sale_price || v.regular_price))
              .filter((v) => !isNaN(v));

            const lowestPrice = validPrices.length
              ? Math.min(...validPrices)
              : null;

            return {
              ...product,
              variations,
              price: lowestPrice?.toString(),
            };
          } catch (err) {
            console.error(
              `Failed to load variations for product ${product.id}`,
              err.message
            );
            return product;
          }
        }
        return product;
      })
    );

    return {
      products: enrichedProducts,
      total: parseInt(response.headers["x-wp-total"], 10),
      categoryName: category.name,
    };
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    return { products: [], total: 0, categoryName: null }; // ✅ Fallback
  }
};

export const getCategoryBySlug = async (slug) => {
  try {
    const { data } = await woocommerce.get("/products/categories", {
      params: { slug },
    });
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching category by slug:", error.message);
    return null;
  }
};

// ============================================
// ATTRIBUTES
// ============================================

export const getProductAttributes = async () => {
  try {
    const { data } = await woocommerce.get("/products/attributes");

    const attributes = await Promise.all(
      data.map(async (attribute) => {
        try {
          const termsResponse = await woocommerce.get(
            `/products/attributes/${attribute.id}/terms`
          );
          return {
            name: attribute.slug,
            label: attribute.name,
            options: termsResponse.data.map((term) => term.name),
          };
        } catch (err) {
          console.error(`Error fetching terms for ${attribute.name}:`, err.message);
          return {
            name: attribute.slug,
            label: attribute.name,
            options: [],
          };
        }
      })
    );

    return attributes;
  } catch (error) {
    console.error("Error fetching product attributes:", error.message);
    return [];
  }
};

// ============================================
// ORDERS
// ============================================

export const addOrder = async (orderData, customerId) => {
  try {
    const payload = {
      ...orderData,
      customer_id: customerId,
    };

    const { data } = await woocommerce.post("/orders", payload);
    return data;
  } catch (error) {
    console.error("WooCommerce Order Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const { data } = await woocommerce.get(`/orders/${orderId}`);
    return data;
  } catch (error) {
    console.error("Error fetching order details:", error.response?.data || error.message);
    throw error;
  }
};

// ============================================
// COUPONS
// ============================================

export const getCouponByCode = async (code) => {
  try {
    const { data } = await woocommerce.get("/coupons", {
      params: { code },
    });

    if (data.length > 0) {
      return data[0];
    }

    throw new Error("الكود غير صالح");
  } catch (error) {
    console.error("Error validating coupon:", error.response?.data || error.message);
    throw error;
  }
};

// ============================================
// AUTHENTICATION
// ============================================

export const loginUser = async ({ username, password }) => {
  const res = await axios.post(
    `${JWT_API_URL}/token`,
    { username, password },
    { timeout: 30000 }
  );
  return res.data;
};

export const registerUser = async ({
  email,
  password,
  first_name,
  last_name,
  phone,
}) => {
  const username = email.split("@")[0];
  const res = await woocommerce.post("/customers", {
    email,
    username,
    password,
    first_name,
    last_name,
    billing: { phone },
  });
  return res.data;
};

export const getUserProfile = async (token) => {
  const wpRes = await axios.get(`${WP_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 30000,
  });

  const wpUser = wpRes.data;
  const userEmail = wpUser?.email || wpUser?.user_email;
  if (!userEmail) throw new Error("No email in WordPress user");

  const { data: customers } = await woocommerce.get("/customers", {
    params: { email: userEmail },
  });

  let customer = customers.find((c) => c.email === userEmail);

  if (!customer) {
    const newCustomerRes = await woocommerce.post("/customers", {
      email: userEmail,
      username: wpUser.username || wpUser.name?.replace(" ", "_") || userEmail,
      first_name: wpUser.first_name || "",
      last_name: wpUser.last_name || "",
      billing: {},
    });
    customer = newCustomerRes.data;
  }

  return {
    id: customer.id,
    name: `${customer.first_name || ""} ${customer.last_name || ""}`.trim(),
    email: customer.email,
    phone: customer.billing?.phone || "",
    billing: customer.billing || {},
  };
};

export const updateCustomerProfile = async (token, updateData) => {
  const res = await fetch("/api/user/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    throw new Error("Profile update failed");
  }

  return res.json();
};

export const getCustomerByEmail = async (email) => {
  try {
    const { data } = await woocommerce.get("/customers", {
      params: { email },
    });

    if (data.length > 0) return data[0];
    return null;
  } catch (error) {
    console.error("Error fetching customer by email:", error.message);
    return null;
  }
};

// ============================================
// REVIEWS
// ============================================

export const getProductReviews = async (productId) => {
  try {
    const { data } = await woocommerce.get(`/products/reviews`, {
      params: { product: productId },
    });
    return data;
  } catch (error) {
    console.error("Error fetching product reviews:", error.response?.data || error.message);
    return []; // ✅ Return empty array instead of throwing
  }
};

// ============================================
// BLOGS
// ============================================

export const getBlogs = async (page = 1, perPage = 10) => {
  try {
    const response = await wpApi.get("/posts", {
      params: {
        page,
        per_page: perPage,
        _embed: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    return []; // ✅ Return empty array
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const response = await wpApi.get("/posts", {
      params: {
        slug,
        _embed: true,
      },
    });

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const blog = response.data[0];
    return {
      ...blog,
      featuredImage: blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
    };
  } catch (error) {
    console.error("Error fetching blog by slug:", error.response?.data || error.message);
    return null;
  }
};

export const getBlogCategories = async () => {
  try {
    const response = await wpApi.get("/categories", {
      params: { per_page: 10 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blog categories:", error.response?.data || error.message);
    return [];
  }
};

export const getBlogsByCategory = async (categorySlug, page = 1, perPage = 10) => {
  try {
    const categoriesResponse = await wpApi.get("/categories", {
      params: { slug: categorySlug },
    });

    if (!categoriesResponse.data || categoriesResponse.data.length === 0) {
      return [];
    }

    const categoryId = categoriesResponse.data[0].id;

    const response = await wpApi.get("/posts", {
      params: {
        categories: categoryId,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching blogs by category:", error.response?.data || error.message);
    return [];
  }
};