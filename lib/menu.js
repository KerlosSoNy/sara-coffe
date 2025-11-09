export const getMenus = async () => {
  const API_URL = `https://dashboard.saracoffee.com/wp-json/custom/v1/menus`;
  try {
    const response = await fetch(API_URL, { next: { revalidate: 60 } }); // ✅ Cache for 60 seconds
    if (!response.ok) {
      throw new Error(`Failed to fetch menus: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching menus:", error);
    return [];
  }
};

export const getMenuItems = async (menuSlug) => {
  const API_URL = `https://dashboard.saracoffee.com/wp-json/custom/v1/menus/${menuSlug}`;
  try {
    const response = await fetch(API_URL, { next: { revalidate: 60 } }); // ✅ Cache for 60 seconds
    if (!response.ok) {
      throw new Error(`Failed to fetch menu items: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
};
