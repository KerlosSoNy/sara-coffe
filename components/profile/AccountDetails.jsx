"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { updateCustomerProfile } from "@/lib/woocommerce";

export default function AccountDetails() {
  const { user, token, login } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (user) {
      const [firstName, ...lastNameParts] = user.name?.split(" ") || [];
      setForm({
        firstName,
        lastName: lastNameParts.join(" "),
        email: user.email || "",
        phone: user.phone || "",
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
      const updatedUser = await updateCustomerProfile(token, {
        id: user.id,
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        billing: {
          phone: form.phone,
        },
      });

      setStatus("success");
      // Refresh auth user context
      login(token);
    } catch (err) {
      console.error("❌ Update failed:", err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md  p-6 rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Account Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label>First Name</label>
          <input
            type="text"
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
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
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
