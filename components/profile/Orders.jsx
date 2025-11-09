// // components/profile/orders.jsx
// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/lib/context/AuthContext";
// import axios from "axios";

// export default function Orders() {
//   const { token } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_WP_API_URL}/orders`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             params: {
//               per_page: 10,
//               orderby: "date",
//             },
//           }
//         );
//         setOrders(data);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setError("خطا در دریافت سفارش‌ها.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchOrders();
//   }, [token]);

//   if (loading) return <p>در حال بارگذاری سفارش‌ها...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!orders.length) return <p>شما هنوز سفارشی ثبت نکرده‌اید.</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">سفارش‌های شما</h2>
//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <li
//             key={order.id}
//             className="p-4 border rounded shadow-sm bg-white text-sm"
//           >
//             <p className="font-semibold">سفارش #{order.id}</p>
//             <p>
//               تاریخ: {new Date(order.date_created).toLocaleDateString("fa-IR")}
//             </p>
//             <p>مبلغ کل: {Number(order.total).toLocaleString("fa-IR")} تومان</p>
//             <p>وضعیت: {order.status}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import axios from "axios";

export default function Orders() {
  // const { token } = useAuth();
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_WC_API_URL}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // params: {
            //   per_page: 10,
            //   orderby: "date",
            // },
            params: {
              customer: user?.id, // 👈 only fetch orders for this user
              per_page: 10,
              orderby: "date",
            },
          }
        );
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("خطا در دریافت سفارش‌ها.");
      } finally {
        setLoading(false);
      }
    };

    // if (token) fetchOrders();
    if (token && user?.id) fetchOrders();
  }, [token, user?.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!orders.length) return <p>No order found</p>;
  console.log("🧪 Current user for orders:", user);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="p-4 border rounded shadow-sm bg-white text-sm"
          >
            <p className="font-semibold">Order #{order.id}</p>
            <p>
              Date:{" "}
              {new Date(order.date_created).toLocaleDateString("en-AE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>Total: {Number(order.total).toLocaleString("en-AE")} AED</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
