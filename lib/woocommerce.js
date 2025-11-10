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

// Axios instance for WooCommerce
const woocommerce = axios.create({
  baseURL: WC_API_URL,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
    // username: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
    // password: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  },
});

export default woocommerce;

export const getProductsBySearch = async (query, page = 1, perPage = 15) => {
  const response = await woocommerce.get("/products", {
    params: {
      search: query,
      page,
      per_page: perPage,
    },
  });
  return {
    products: response.data,
    total: parseInt(response.headers["x-wp-total"], 10), // Total matching products
  };
};

export const getProducts = async (page = 1, perPage = 15) => {
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
};

export const getProductBySlug = async (slug) => {
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
};

export const getCategories = async () => {
  const { data } = await woocommerce.get("/products/categories", {
    params: {
      per_page: 100,
      hide_empty: false,
    },
  });

  return data.filter((category) => category.name !== "Uncategorized");
};

export const getProductsByCategorySlug = async (
  slug,
  page = 1,
  perPage = 15,
  sortBy = "price",
  sortOrder = "asc"
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
            price: lowestPrice?.toString(), // override with lowest price
          };
        } catch (err) {
          console.error(
            `Failed to load variations for product ${product.id}`,
            err
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
};

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

export const getProductAttributes = async () => {
  const { data } = await woocommerce.get("/products/attributes");

  // Fetch terms for each attribute
  const attributes = await Promise.all(
    data.map(async (attribute) => {
      const termsResponse = await woocommerce.get(
        `/products/attributes/${attribute.id}/terms`
      );
      return {
        name: attribute.slug, // e.g., "pa_roast"
        label: attribute.name, // e.g., "Roast"
        options: termsResponse.data.map((term) => term.name), // e.g., ["Light", "Medium", "Dark"]
      };
    })
  );

  return attributes;
};

export const addOrder = async (orderData, customerId) => {
  try {
    const payload = {
      ...orderData,
      customer_id: customerId, // ✅ Required if JWT token is not accepted
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
    console.error(
      "Error fetching order details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCouponByCode = async (code) => {
  try {
    const { data } = await woocommerce.get("/coupons", {
      params: { code },
    });

    if (data.length > 0) {
      return data[0]; // Return first matching coupon
    }

    throw new Error("الكود غير صالح"); // "Invalid code" in Arabic
  } catch (error) {
    console.error(
      "Error validating coupon:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const loginUser = async ({ username, password }) => {
  const res = await axios.post(`${JWT_API_URL}/token`, {
    username,
    password,
  });
  return res.data; // { token, user_display_name }
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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const wpUser = wpRes.data;
  // const userEmail = wpUser?.email;
  const userEmail = wpUser?.email || wpUser?.user_email;
  if (!userEmail) throw new Error("No email in WordPress user");

  // ✅ Get WooCommerce customer by email
  const { data: customers } = await woocommerce.get("/customers", {
    params: { email: userEmail },
  });

  let customer = customers.find((c) => c.email === userEmail);

  // 🔁 If customer not found, create one
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
    billing: customer.billing || {}, // ✅ add this
  };
};

export const updateCustomerProfile = async (token, updateData) => {
  const res = await fetch("/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
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

    if (data.length > 0) return data[0]; // Return first match
    return null;
  } catch (error) {
    console.error("Error fetching customer by email:", error);
    return null;
  }
};

export const getProductReviews = async (productId) => {
  try {
    const { data } = await woocommerce.get(`/products/reviews`, {
      params: { product: productId },
    });
    return data;
  } catch (error) {
    console.error(
      "Error fetching product reviews:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBlogs = async (page = 1, perPage = 10) => {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        page,
        per_page: perPage,
        _embed: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching blogs:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBlogBySlug = async (slug) => {
  try {
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        slug,
        _embed: true, // Include _embedded data for featured image
      },
    });

    if (!response.data || response.data.length === 0) {
      throw new Error(`Blog with slug "${slug}" not found.`);
    }

    const blog = response.data[0];
    return {
      ...blog,
      featuredImage: blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
    };
  } catch (error) {
    console.error(
      "Error fetching blog by slug:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBlogCategories = async () => {
  try {
    const response = await axios.get(`${WP_API_URL}/categories`, {
      params: { per_page: 10 },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching blog categories:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getBlogsByCategory = async (
  categorySlug,
  page = 1,
  perPage = 10
) => {
  try {
    // Fetch the category by slug
    const categoriesResponse = await axios.get(`${WP_API_URL}/categories`, {
      params: { slug: categorySlug },
    });

    if (!categoriesResponse.data || categoriesResponse.data.length === 0) {
      throw new Error(`Category with slug "${categorySlug}" not found.`);
    }

    const categoryId = categoriesResponse.data[0].id; // Extract the category ID

    // Fetch blogs by category ID
    const response = await axios.get(`${WP_API_URL}/posts`, {
      params: {
        categories: categoryId, // Use the ID here
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching blogs by category:",
      error.response?.data || error.message
    );
    throw error;
  }
};
