"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { updateCustomerProfile } from "@/lib/woocommerce";

export default function Address() {
  const { user, token, login } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (user?.billing) {
      setForm({
        firstName: user.billing.first_name || "",
        lastName: user.billing.last_name || "",
        phone: user.billing.phone || "",
        address: user.billing.address_1 || "",
        city: user.billing.city || "",
        postalCode: user.billing.postcode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await updateCustomerProfile(token, {
        id: user.id,
        email: user.email, // ✅ REQUIRED for WooCommerce API route
        billing: {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
          address_1: form.address,
          city: form.city,
          postcode: form.postalCode,
          country: "IR", // ✅ Recommended by WooCommerce
        },
      });

      await login(token, true); // 🔁 Refresh AuthContext
      setStatus("success");
    } catch (err) {
      console.error("❌ Address update failed:", err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md p-6 rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#773D2D] text-white py-2 rounded hover:bg-[#964733]"
        >
          Save Changes
        </button>

        {status === "success" && <p className="text-green-600 mt-2">✅</p>}
        {status === "error" && <p className="text-red-500 mt-2">❌</p>}
      </form>
    </div>
  );
}
