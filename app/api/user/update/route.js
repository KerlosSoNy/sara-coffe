import axios from "axios";

const WC_API_URL = process.env.NEXT_PUBLIC_WC_API_URL;
const WC_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const WC_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

export async function PUT(request) {
  try {
    const body = await request.json();
    console.log("📦 Incoming update request:", body);

    const { id, email, first_name, last_name, billing } = body;

    if (!id || !email) {
      return new Response(JSON.stringify({ message: "Missing ID or Email" }), {
        status: 400,
      });
    }

    // Build the WooCommerce update payload
    const updateData = {
      email,
      first_name,
      last_name,
      billing: {
        first_name: billing?.first_name || first_name || "",
        last_name: billing?.last_name || last_name || "",
        address_1: billing?.address_1 || "",
        city: billing?.city || "",
        postcode: billing?.postcode || "",
        phone: billing?.phone || "",
        country: billing?.country || "IR", // Default country
      },
      meta_data: [
        {
          key: "billing_phone",
          value: billing?.phone || "",
        },
      ],
    };

    const res = await axios.put(`${WC_API_URL}/customers/${id}`, updateData, {
      auth: {
        username: WC_KEY,
        password: WC_SECRET,
      },
    });

    console.log("✅ WooCommerce update success");
    return new Response(JSON.stringify(res.data), { status: 200 });
  } catch (err) {
    console.error("🔥 Woo update failed:", err.response?.data || err.message);
    return new Response(
      JSON.stringify({ message: "WooCommerce update error" }),
      { status: 500 }
    );
  }
}
