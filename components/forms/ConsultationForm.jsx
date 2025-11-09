"use client";

import { useState } from "react";

export default function ConsultationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData();
    formData.append("your-name", form.name);
    formData.append("your-email", form.email);
    formData.append("your-subject", form.subject);
    formData.append("your-message", form.message);

    formData.append("_wpcf7", 324); // ✅ Your form ID
    formData.append("_wpcf7_version", "5.8.1"); // Adjust based on WP site
    formData.append("_wpcf7_locale", "en_US"); // Or "fa_IR" if Persian
    formData.append("_wpcf7_unit_tag", "wpcf7-f311-p0-o1"); // Safe dummy
    formData.append("_wpcf7_container_post", 0);

    try {
      const res = await fetch(
        "https://dashboard.saracoffee.com/wp-json/contact-form-7/v1/contact-forms/324/feedback",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data.status === "mail_sent") {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "خطا در ارسال فرم");
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="  rounded">
      {/* <h2 className="text-2xl font-bold mb-4">تماس با ما</h2> */}
      <form onSubmit={handleSubmit} className="space-y-4 text-base font-adore">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded font-montserrat"
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
            className="w-full px-3 py-2 border rounded font-montserrat"
            required
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded font-montserrat"
            required
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border rounded font-montserrat"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#3B5040] text-white py-2 rounded hover:bg-[#EE908D] transition-all duration-300"
        >
          Submit
        </button>

        {status === "success" && <p className="text-green-600 mt-2">✅</p>}
        {status === "error" && <p className="text-red-500 mt-2">❌</p>}
      </form>
    </div>
  );
}
