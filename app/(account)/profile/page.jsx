"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { getUserProfile } from "@/lib/woocommerce";

import Orders from "@/components/profile/Orders";
import AccountDetails from "@/components/profile/AccountDetails";
import Address from "@/components/profile/Address";

const tabs = [
  { key: "dashboard", label: "Dashboard" },
  { key: "orders", label: "Orders" },
  { key: "addresses", label: "addresses" },
  { key: "account", label: "Account Details" },
];

export default function ProfilePage() {
  const { token, loading, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!loading && !token) {
      router.push("/user?redirect=/profile");
    }
  }, [loading, token, router]);

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile(token);
        setProfile(userData);
      } catch (err) {
        setError("خطا در دریافت اطلاعات کاربر");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (loading || !profile) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // 🔁 Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <p>Welcome {profile.name} 👋</p>;
      case "orders":
        // return <p>📦 لیست سفارش‌های شما</p>;
        return <Orders />;
      case "addresses":
        // return <p>🏠 آدرس‌های شما</p>;
        return <Address />;
      case "account":
        // return <p>👤 جزئیات حساب</p>;
        return <AccountDetails />;
      default:
        return null;
    }
  };

  return (
    <div className="container  block mx-auto px-4 py-10 md:flex gap-10 font-montserrat">
      {/* Sidebar */}
      <aside className="w-full md:w-60 border-r pr-4 pb-10">
        <h2 className="text-lg font-bold mb-4">Account</h2>
        <ul className="space-y-3 text-sm">
          {tabs.map((tab) => (
            <li key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`block w-full text-left px-2 py-1 rounded ${
                  activeTab === tab.key
                    ? "bg-[#773D2D] text-white"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={logout}
              className="text-red-500 hover:underline text-sm mt-4"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <section className="w-full md:flex-1">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="text-sm">{renderTabContent()}</div>
      </section>
    </div>
  );
}
