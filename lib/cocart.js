import CoCartAPI from "cocart-rest-api";

const cocart = new CoCartAPI({
  url: "https://dashboard.saracoffee.com",
});

export const addToCart = async (productId, quantity = 1) => {
  const response = await cocart.post("cart/add-item", {
    id: productId,
    quantity,
  });
  return response.data;
};

export const getCart = async () => {
  const response = await cocart.get("cart");
  return response.data;
};

export const checkout = async (checkoutData) => {
  const response = await cocart.post("checkout", checkoutData);
  return response.data;
};
