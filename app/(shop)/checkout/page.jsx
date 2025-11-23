// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { useAuth } from "@/lib/context/AuthContext";
// // import { useCart } from "@/lib/context/CartContext";
// // import { addOrder } from "@/lib/woocommerce";
// // import Title from "@/components/Title";

// // export default function CheckoutPage() {
// //   const { user, token, loading } = useAuth();
// //   const { cart, clearCart, coupon } = useCart();
// //   const router = useRouter();

// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: "",
// //     city: "",
// //     address: "",
// //     postalCode: "",
// //     notes: "",
// //   });
// //   const [uaeCities, setUaeCities] = useState([]);
// //   const [deliveryMethod, setDeliveryMethod] = useState("pickup");
// //   const [error, setError] = useState("");
// //   const [loadingOrder, setLoadingOrder] = useState(false);

// //   // Prefill user info if already logged in
// //   useEffect(() => {
// //     if (user) {
// //       const [firstName, ...rest] = user.name.split(" ");
// //       setFormData((f) => ({
// //         ...f,
// //         firstName,
// //         lastName: rest.join(" "),
// //         email: user.email,
// //         phone: user.phone,
// //       }));
// //     }
// //   }, [user]);

// //   // Redirect to login if not authenticated
// //   useEffect(() => {
// //     if (!loading && !token) {
// //       router.push("/user?redirect=/checkout");
// //     }
// //   }, [loading, token, router]);

// //   // Load list of cities
// //   useEffect(() => {
// //     import("../../../data/uaeCities.json").then((m) =>
// //       setUaeCities(m.default || m)
// //     );
// //   }, []);

// //   // Handle form field updates
// //   const handleInput = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((f) => ({ ...f, [name]: value }));
// //   };

// //   // Totals
// //   const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
// //   const discount =
// //     coupon?.discount_type === "percent"
// //       ? (subtotal * +coupon.amount) / 100
// //       : coupon?.discount_type === "fixed_cart"
// //       ? +coupon.amount
// //       : 0;
// //   const total = subtotal - discount;

// //   const handleCheckout = async () => {
// //     // simple validation
// //     const reqFields = [
// //       "firstName",
// //       "lastName",
// //       "email",
// //       "phone",
// //       "address",
// //       "city",
// //     ];
// //     for (let f of reqFields) {
// //       if (!formData[f]) {
// //         setError("Please fill out all required fields.");
// //         return;
// //       }
// //     }

// //     setError("");
// //     setLoadingOrder(true);

// //     try {
// //       // 1️⃣ Create Woo order
// //       const orderPayload = {
// //         payment_method: "stripe",
// //         payment_method_title: "Stripe Online Payment",
// //         set_paid: false,
// //         billing: {
// //           first_name: formData.firstName,
// //           last_name: formData.lastName,
// //           email: formData.email,
// //           phone: formData.phone,
// //           address_1: formData.address,
// //           city: formData.city,
// //           postcode: formData.postalCode,
// //           country: "AE",
// //         },
// //         shipping: {
// //           first_name: formData.firstName,
// //           last_name: formData.lastName,
// //           address_1: formData.address,
// //           city: formData.city,
// //           postcode: formData.postalCode,
// //           country: "AE",
// //         },
// //         customer_note: `${formData.notes} | Delivery: ${deliveryMethod} | VAT 5% included`,
// //         line_items: cart.map((i) => ({
// //           product_id: i.id,
// //           quantity: i.quantity,
// //         })),
// //         coupon_lines: coupon ? [{ code: coupon.code }] : [],
// //         tax_lines: [],
// //       };

// //       const order = await addOrder(orderPayload, user.id);
// //       const vat = parseFloat(order.total_tax || 0);
// //       const totalWithTax = parseFloat(order.total);

// //       // 2️⃣ Kick off Stripe Checkout
// //       const res = await fetch("/api/stripe/checkout", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         // body: JSON.stringify({
// //         //   order_id: order.id,
// //         //   items: cart.map((i) => ({
// //         //     name: i.name,
// //         //     price: i.price,
// //         //     quantity: i.quantity,
// //         //   })),
// //         //   tax: vatAmount.toFixed(2),
// //         //   total: totalWithVat.toFixed(2),
// //         // }),
// //         body: JSON.stringify({
// //           order_id: order.id,
// //           total: totalWithTax.toFixed(2), // ✅ correct variable
// //         }),
// //       });

// //       const { url, message } = await res.json();
// //       if (!url) throw new Error(message || "Stripe checkout failed");

// //       window.location.href = url;
// //     } catch (err) {
// //       console.error("Checkout error:", err);
// //       setError("Order submission failed. Please try again.");
// //     } finally {
// //       setLoadingOrder(false);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto py-10 ">
// //       <Title
// //         tag="h1"
// //         className="text-2xl md:text-4xl text-center p-2  font-arial uppercase mb-4"
// //       >
// //         checkout
// //       </Title>
// //       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

// //       <div className="grid md:grid-cols-2 gap-8  font-arial  ">
// //         {/* Billing Form */}
// //         <div>
// //           <h2 className="text-xl mb-4">Shipping Information</h2>
// //           {[
// //             { label: "First Name", name: "firstName" },
// //             { label: "Last Name", name: "lastName" },
// //             { label: "Email", name: "email", type: "email" },
// //             { label: "Phone", name: "phone", type: "tel" },
// //           ].map(({ label, name, type = "text" }) => (
// //             <div key={name} className="mb-4">
// //               <label className="block mb-1">{label}</label>
// //               <input
// //                 type={type}
// //                 name={name}
// //                 value={formData[name]}
// //                 onChange={handleInput}
// //                 className="w-full border px-3 py-2 rounded"
// //                 required
// //               />
// //             </div>
// //           ))}

// //           <div className="mb-4">
// //             <label className="block mb-1">City</label>
// //             <select
// //               name="city"
// //               value={formData.city}
// //               onChange={handleInput}
// //               className="w-full border px-3 py-2 rounded"
// //               required
// //             >
// //               <option value="">— select —</option>
// //               {uaeCities.map((c) => (
// //                 <option key={c} value={c}>
// //                   {c}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <div className="mb-4">
// //             <label className="block mb-1">Full Address</label>
// //             <textarea
// //               name="address"
// //               value={formData.address}
// //               onChange={handleInput}
// //               className="w-full border px-3 py-2 rounded"
// //               required
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block mb-1">Postal Code</label>
// //             <input
// //               type="text"
// //               name="postalCode"
// //               value={formData.postalCode}
// //               onChange={handleInput}
// //               className="w-full border px-3 py-2 rounded"
// //             />
// //           </div>
// //           <div className="mb-4">
// //             <label className="block mb-1">Order Notes</label>
// //             <textarea
// //               name="notes"
// //               value={formData.notes}
// //               onChange={handleInput}
// //               className="w-full border px-3 py-2 rounded"
// //             />
// //           </div>
// //         </div>

// //         {/* Order Summary */}
// //         <div>
// //           <h2 className="text-xl mb-4">Order Summary</h2>
// //           <ul className="border p-4 rounded bg-white space-y-2 mb-4">
// //             {cart.map((i) => (
// //               <li key={i.id} className="flex justify-between">
// //                 <span>{i.name}</span>
// //                 <span>
// //                   {i.price} × {i.quantity}
// //                 </span>
// //               </li>
// //             ))}
// //           </ul>
// //           <p className="mb-2">Subtotal: {subtotal} AED</p>
// //           {discount > 0 && (
// //             <p className="mb-2 text-green-600">Discount: {discount} AED</p>
// //           )}
// //           <p>Total: {total.toFixed(2)} AED</p>
// //           <p>VAT: {vat.toFixed(2)} AED</p>
// //           <p className="font-bold text-lg">
// //             Total: {totalWithTax.toFixed(2)} AED
// //           </p>
// //           <div className="border p-4 rounded bg-white space-y-2 mb-4">
// //             <p className="mb-1 font-medium">Delivery Method:</p>
// //             {["pickup", "delivery"].map((m) => (
// //               <label key={m} className="block mr-4">
// //                 <input
// //                   type="radio"
// //                   name="deliveryMethod"
// //                   value={m}
// //                   checked={deliveryMethod === m}
// //                   onChange={() => setDeliveryMethod(m)}
// //                 />
// //                 <span className="ml-2 capitalize">
// //                   {m === "pickup" ? "Pickup at Store" : "Home Delivery"}
// //                 </span>
// //               </label>
// //             ))}
// //           </div>

// //           <button
// //             onClick={handleCheckout}
// //             disabled={loadingOrder || cart.length === 0}
// //             className="w-full py-4 bg-[#3c3c3c] text-white rounded "
// //           >
// //             {loadingOrder ? "Processing…" : "Confirm & Pay"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/lib/context/AuthContext";
// import { useCart } from "@/lib/context/CartContext";
// import { addOrder } from "@/lib/woocommerce";
// import Title from "@/components/Title";

// export default function CheckoutPage() {
//   const { user, token, loading } = useAuth();
//   const { cart, clearCart, coupon } = useCart();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     address: "",
//     postalCode: "",
//     notes: "",
//   });

//   const [uaeCities, setUaeCities] = useState([]);
//   const [deliveryMethod, setDeliveryMethod] = useState("pickup");
//   const [error, setError] = useState("");
//   const [loadingOrder, setLoadingOrder] = useState(false);

//   const [vat, setVat] = useState(0);
//   const [totalWithTax, setTotalWithTax] = useState(0);

//   // Prefill user info if already logged in
//   useEffect(() => {
//     if (user) {
//       const [firstName, ...rest] = user.name.split(" ");
//       setFormData((f) => ({
//         ...f,
//         firstName,
//         lastName: rest.join(" "),
//         email: user.email,
//         phone: user.phone,
//       }));
//     }
//   }, [user]);

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!loading && !token) {
//       router.push("/user?redirect=/checkout");
//     }
//   }, [loading, token, router]);

//   // Load list of cities
//   useEffect(() => {
//     import("../../../data/uaeCities.json").then((m) =>
//       setUaeCities(m.default || m)
//     );
//   }, []);

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData((f) => ({ ...f, [name]: value }));
//   };

//   const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
//   const discount =
//     coupon?.discount_type === "percent"
//       ? (subtotal * +coupon.amount) / 100
//       : coupon?.discount_type === "fixed_cart"
//       ? +coupon.amount
//       : 0;
//   const total = subtotal - discount;

//   const handleCheckout = async () => {
//     const reqFields = [
//       "firstName",
//       "lastName",
//       "email",
//       "phone",
//       "address",
//       "city",
//     ];
//     for (let f of reqFields) {
//       if (!formData[f]) {
//         setError("Please fill out all required fields.");
//         return;
//       }
//     }

//     setError("");
//     setLoadingOrder(true);

//     try {
//       const orderPayload = {
//         payment_method: "stripe",
//         payment_method_title: "Stripe Online Payment",
//         set_paid: false,
//         billing: {
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           address_1: formData.address,
//           city: formData.city,
//           postcode: formData.postalCode,
//           country: "AE",
//         },
//         shipping: {
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           address_1: formData.address,
//           city: formData.city,
//           postcode: formData.postalCode,
//           country: "AE",
//         },
//         customer_note: `${formData.notes} | Delivery: ${deliveryMethod} | VAT 5% included`,
//         line_items: cart.map((i) => ({
//           product_id: i.id,
//           quantity: i.quantity,
//         })),
//         coupon_lines: coupon ? [{ code: coupon.code }] : [],
//         tax_lines: [], // 💡 Enables WooCommerce tax calculation
//       };

//       const order = await addOrder(orderPayload, user.id);

//       console.log("Woo Order Response:", order);

//       const vatAmount = parseFloat(order.total_tax || 0);
//       const grandTotal = parseFloat(order.total);

//       setVat(vatAmount);
//       setTotalWithTax(grandTotal);

//       const res = await fetch("/api/stripe/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           order_id: order.id,
//           total: grandTotal.toFixed(2),
//         }),
//       });

//       const { url, message } = await res.json();
//       if (!url) throw new Error(message || "Stripe checkout failed");

//       window.location.href = url;
//     } catch (err) {
//       console.error("Checkout error:", err);
//       setError("Order submission failed. Please try again.");
//     } finally {
//       setLoadingOrder(false);
//     }
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <Title
//         tag="h1"
//         className="text-2xl md:text-4xl text-center p-2  font-arial uppercase mb-4"
//       >
//         checkout
//       </Title>

//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       <div className="grid md:grid-cols-2 gap-8  font-arial  ">
//         {/* Billing Form */}
//         <div>
//           <h2 className="text-xl mb-4">Shipping Information</h2>
//           {[
//             { label: "First Name", name: "firstName" },
//             { label: "Last Name", name: "lastName" },
//             { label: "Email", name: "email", type: "email" },
//             { label: "Phone", name: "phone", type: "tel" },
//           ].map(({ label, name, type = "text" }) => (
//             <div key={name} className="mb-4">
//               <label className="block mb-1">{label}</label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleInput}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//             </div>
//           ))}

//           <div className="mb-4">
//             <label className="block mb-1">City</label>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleInput}
//               className="w-full border px-3 py-2 rounded"
//               required
//             >
//               <option value="">— select —</option>
//               {uaeCities.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Full Address</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleInput}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Postal Code</label>
//             <input
//               type="text"
//               name="postalCode"
//               value={formData.postalCode}
//               onChange={handleInput}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Order Notes</label>
//             <textarea
//               name="notes"
//               value={formData.notes}
//               onChange={handleInput}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div>
//           <h2 className="text-xl mb-4">Order Summary</h2>
//           <ul className="border p-4 rounded bg-white space-y-2 mb-4">
//             {cart.map((i) => (
//               <li key={i.id} className="flex justify-between">
//                 <span>{i.name}</span>
//                 <span>
//                   {i.price} × {i.quantity}
//                 </span>
//               </li>
//             ))}
//           </ul>
//           <p className="mb-2">Subtotal: {subtotal} AED</p>
//           {discount > 0 && (
//             <p className="mb-2 text-green-600">Discount: {discount} AED</p>
//           )}
//           <p>Total (before VAT): {total.toFixed(2)} AED</p>
//           <p>VAT (5%): {vat.toFixed(2)} AED</p>
//           <p className="font-bold text-lg">
//             Total: {totalWithTax.toFixed(2)} AED
//           </p>

//           <div className="border p-4 rounded bg-white space-y-2 mb-4">
//             <p className="mb-1 font-medium">Delivery Method:</p>
//             {["pickup", "delivery"].map((m) => (
//               <label key={m} className="block mr-4">
//                 <input
//                   type="radio"
//                   name="deliveryMethod"
//                   value={m}
//                   checked={deliveryMethod === m}
//                   onChange={() => setDeliveryMethod(m)}
//                 />
//                 <span className="ml-2 capitalize">
//                   {m === "pickup" ? "Pickup at Store" : "Home Delivery"}
//                 </span>
//               </label>
//             ))}
//           </div>

//           <button
//             onClick={handleCheckout}
//             disabled={loadingOrder || cart.length === 0}
//             className="w-full py-4 bg-[#3c3c3c] text-white rounded"
//           >
//             {loadingOrder ? "Processing…" : "Confirm & Pay"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/lib/context/AuthContext";
// import { useCart } from "@/lib/context/CartContext";
// import { addOrder } from "@/lib/woocommerce";
// import Title from "@/components/Title";

// export default function CheckoutPage() {
//   const { user, token, loading } = useAuth();
//   const { cart, clearCart, coupon } = useCart();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     city: "",
//     address: "",
//     postalCode: "",
//     notes: "",
//   });

//   const [uaeCities, setUaeCities] = useState([]);
//   const [deliveryMethod, setDeliveryMethod] = useState("pickup");
//   const [error, setError] = useState("");
//   const [loadingOrder, setLoadingOrder] = useState(false);

//   const [vat, setVat] = useState(null); // null = not calculated yet
//   const [totalWithTax, setTotalWithTax] = useState(null);

//   // Prefill user info
//   useEffect(() => {
//     if (user) {
//       const [firstName, ...rest] = user.name.split(" ");
//       setFormData((f) => ({
//         ...f,
//         firstName,
//         lastName: rest.join(" "),
//         email: user.email,
//         phone: user.phone,
//       }));
//     }
//   }, [user]);

//   useEffect(() => {
//     if (!loading && !token) {
//       router.push("/user?redirect=/checkout");
//     }
//   }, [loading, token, router]);

//   useEffect(() => {
//     import("../../../data/uaeCities.json").then((m) =>
//       setUaeCities(m.default || m)
//     );
//   }, []);

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData((f) => ({ ...f, [name]: value }));
//   };

//   const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
//   const discount =
//     coupon?.discount_type === "percent"
//       ? (subtotal * +coupon.amount) / 100
//       : coupon?.discount_type === "fixed_cart"
//       ? +coupon.amount
//       : 0;
//   const total = subtotal - discount;

//   const estimatedVat = total * 0.05;
//   const estimatedTotal = total + estimatedVat;

//   const handleCheckout = async () => {
//     const reqFields = [
//       "firstName",
//       "lastName",
//       "email",
//       "phone",
//       "address",
//       "city",
//     ];
//     for (let f of reqFields) {
//       if (!formData[f]) {
//         setError("Please fill out all required fields.");
//         return;
//       }
//     }

//     setError("");
//     setLoadingOrder(true);

//     try {
//       const orderPayload = {
//         payment_method: "stripe",
//         payment_method_title: "Stripe Online Payment",
//         set_paid: false,
//         billing: {
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           address_1: formData.address,
//           city: formData.city,
//           postcode: formData.postalCode,
//           country: "AE",
//         },
//         shipping: {
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           address_1: formData.address,
//           city: formData.city,
//           postcode: formData.postalCode,
//           country: "AE",
//         },
//         customer_note: `${formData.notes} | Delivery: ${deliveryMethod} | VAT 5% included`,
//         line_items: cart.map((i) => ({
//           product_id: i.id,
//           quantity: i.quantity,
//         })),
//         coupon_lines: coupon ? [{ code: coupon.code }] : [],
//         tax_lines: [], // triggers tax calculation
//       };

//       const order = await addOrder(orderPayload, user.id);
//       const vatAmount = parseFloat(order.total_tax || 0);
//       const grandTotal = parseFloat(order.total);

//       setVat(vatAmount);
//       setTotalWithTax(grandTotal);

//       const res = await fetch("/api/stripe/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           order_id: order.id,
//           total: grandTotal.toFixed(2),
//         }),
//       });

//       const { url, message } = await res.json();
//       if (!url) throw new Error(message || "Stripe checkout failed");

//       window.location.href = url;
//     } catch (err) {
//       console.error("Checkout error:", err);
//       setError("Order submission failed. Please try again.");
//     } finally {
//       setLoadingOrder(false);
//     }
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <Title
//         tag="h1"
//         className="text-2xl md:text-4xl text-center p-2  font-arial uppercase mb-4"
//       >
//         checkout
//       </Title>

//       {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//       <div className="grid md:grid-cols-2 gap-8  font-arial  ">
//         {/* Billing Form */}
//         <div>
//           <h2 className="text-xl mb-4">Shipping Information</h2>
//           {[
//             { label: "First Name", name: "firstName" },
//             { label: "Last Name", name: "lastName" },
//             { label: "Email", name: "email", type: "email" },
//             { label: "Phone", name: "phone", type: "tel" },
//           ].map(({ label, name, type = "text" }) => (
//             <div key={name} className="mb-4">
//               <label className="block mb-1">{label}</label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name]}
//                 onChange={handleInput}
//                 className="w-full border px-3 py-2 rounded"
//                 required
//               />
//             </div>
//           ))}

//           <div className="mb-4">
//             <label className="block mb-1">City</label>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleInput}
//               className="w-full border px-3 py-2 rounded"
//               required
//             >
//               <option value="">— select —</option>
//               {uaeCities.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Full Address</label>
//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleInput}
//               className="w-full border px-3 py-2 rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Postal Code</label>
//             <input
//               type="text"
//               name="postalCode"
//               value={formData.postalCode}
//               onChange={handleInput}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Order Notes</label>
//             <textarea
//               name="notes"
//               value={formData.notes}
//               onChange={handleInput}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div>
//           <h2 className="text-xl mb-4">Order Summary</h2>
//           <ul className="border p-4 rounded bg-white space-y-2 mb-4">
//             {cart.map((i) => (
//               <li key={i.id} className="flex justify-between border-b pb-4">
//                 <span>{i.name}</span>
//                 <span>
//                   {i.price} × {i.quantity}
//                 </span>
//               </li>
//             ))}
//             <p className="mb-2">Subtotal: {subtotal} AED</p>
//             {discount > 0 && (
//               <p className="mb-2 text-green-600">Discount: {discount} AED</p>
//             )}
//             <p>Total (before VAT): {total.toFixed(2)} AED</p>

//             {vat === null ? (
//               <>
//                 <p className="text-yellow-800">
//                   VAT (5% est.): {estimatedVat.toFixed(2)} AED
//                 </p>
//                 <p className="font-bold">
//                   Total (est.): {estimatedTotal.toFixed(2)} AED
//                 </p>
//               </>
//             ) : (
//               <>
//                 <p className="text-yellow-800">VAT: {vat.toFixed(2)} AED</p>
//                 <p className="font-bold text-lg">
//                   Total: {totalWithTax.toFixed(2)} AED
//                 </p>
//               </>
//             )}
//           </ul>

//           <div className="border p-4 rounded bg-white space-y-2 mb-4">
//             <p className="mb-1 font-medium">Delivery Method:</p>
//             {["pickup", "delivery"].map((m) => (
//               <label key={m} className="block mr-4">
//                 <input
//                   type="radio"
//                   name="deliveryMethod"
//                   value={m}
//                   checked={deliveryMethod === m}
//                   onChange={() => setDeliveryMethod(m)}
//                 />
//                 <span className="ml-2 capitalize">
//                   {m === "pickup" ? "Pickup at Store" : "Home Delivery"}
//                 </span>
//               </label>
//             ))}
//           </div>

//           <button
//             onClick={handleCheckout}
//             disabled={loadingOrder || cart.length === 0}
//             className="w-full py-4 bg-[#3c3c3c] text-white rounded"
//           >
//             {loadingOrder ? "Processing…" : "Confirm & Pay"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useCart } from "@/lib/context/CartContext";
import { addOrder } from "@/lib/woocommerce";
import Title from "@/components/Title";

export default function CheckoutPage() {
  const { user, token, loading } = useAuth();
  const { cart, clearCart, coupon } = useCart();
  const router = useRouter();

  const DELIVERY_FEE = 30;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postalCode: "",
    notes: "",
  });

  const [uaeCities, setUaeCities] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [error, setError] = useState("");
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [vat, setVat] = useState(null);
  const [totalWithTax, setTotalWithTax] = useState(null);

  useEffect(() => {
    if (user) {
      const [firstName, ...rest] = user.name.split(" ");
      setFormData((f) => ({
        ...f,
        firstName,
        lastName: rest.join(" "),
        email: user.email,
        phone: user.phone,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !token) {
      router.push("/user?redirect=/checkout");
    }
  }, [loading, token, router]);

  useEffect(() => {
    import("../../../data/uaeCities.json").then((m) =>
      setUaeCities(m.default || m)
    );
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount =
    coupon?.discount_type === "percent"
      ? (subtotal * +coupon.amount) / 100
      : coupon?.discount_type === "fixed_cart"
      ? +coupon.amount
      : 0;
  const total = subtotal - discount;
  const shipping = deliveryMethod === "delivery" ? DELIVERY_FEE : 0;
  const estimatedVat = (total + shipping) * 0.05;
  const estimatedTotal = total + shipping + estimatedVat;

  const handleCheckout = async () => {
    const reqFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
    ];
    for (let f of reqFields) {
      if (!formData[f]) {
        setError("Please fill out all required fields.");
        return;
      }
    }

    setError("");
    setLoadingOrder(true);

    try {
      const orderPayload = {
        payment_method: "stripe",
        payment_method_title: "Stripe Online Payment",
        set_paid: false,
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address_1: formData.address,
          city: formData.city,
          postcode: formData.postalCode,
          country: "AE",
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          postcode: formData.postalCode,
          country: "AE",
        },
        customer_note: `${formData.notes} | Delivery: ${deliveryMethod} | VAT 5% included`,
        line_items: cart.map((i) => ({
          product_id: i.id,
          quantity: i.quantity,
        })),
        coupon_lines: coupon ? [{ code: coupon.code }] : [],
        tax_lines: [],
        shipping_lines:
          deliveryMethod === "delivery"
            ? [
                {
                  method_id: "flat_rate",
                  method_title: "Flat Rate",
                  total: DELIVERY_FEE.toFixed(2),
                },
              ]
            : [],
      };

      const order = await addOrder(orderPayload, user.id);
      const vatAmount = parseFloat(order.total_tax || 0);
      const grandTotal = parseFloat(order.total);

      setVat(vatAmount);
      setTotalWithTax(grandTotal);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: order.id,
          total: grandTotal.toFixed(2),
        }),
      });

      const { url, message } = await res.json();
      if (!url) throw new Error(message || "Stripe checkout failed");

      window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Order submission failed. Please try again.");
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <div className="container  mx-auto py-10">
      <Title
        tag="h1"
        className="text-2xl md:text-4xl text-center p-2  font-arial uppercase mb-4"
      >
        checkout
      </Title>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid md:grid-cols-2  gap-8  font-arial ">
        {/* Billing Form */}
        <div>
          <h2 className="text-xl mb-4">Shipping Information</h2>
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="mb-4">
              <label className="block mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInput}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block mb-1">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInput}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">— select —</option>
              {uaeCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Full Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInput}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInput}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Order Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInput}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl mb-4">Order Summary</h2>
          <ul className="border p-4 rounded bg-white space-y-2 mb-4">
            {cart.map((i) => (
              <li key={i.id} className="flex justify-between">
                <span>{i.name}</span>
                <span>
                  {i.price} × {i.quantity}
                </span>
              </li>
            ))}
          </ul>

          <div className="border p-4 rounded bg-white space-y-2 mb-4">
            <p className="mb-1 font-medium">Delivery Method:</p>
            {["pickup", "delivery"].map((m) => (
              <label key={m} className="block mr-4">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={m}
                  checked={deliveryMethod === m}
                  onChange={() => setDeliveryMethod(m)}
                />
                <span className="ml-2 capitalize">
                  {m === "pickup" ? "Pickup at Store" : "Home Delivery"}
                </span>
              </label>
            ))}
          </div>
          <div className="border p-4 rounded bg-white space-y-2 mb-4">
            <p className="mb-2">Subtotal: {subtotal} AED</p>
            {discount > 0 && (
              <p className="mb-2 text-green-600">Discount: {discount} AED</p>
            )}
            {shipping > 0 && (
              <p className="mb-2 text-blue-600">Delivery Fee: {shipping} AED</p>
            )}

            <p>Total (before VAT): {(total + shipping).toFixed(2)} AED</p>

            {vat === null ? (
              <>
                <p className="text-yellow-800">
                  VAT (5% est.): {estimatedVat.toFixed(2)} AED
                </p>
                <p className="font-bold">
                  Total (est.): {estimatedTotal.toFixed(2)} AED
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-800">VAT: {vat.toFixed(2)} AED</p>
                <p className="font-bold text-lg">
                  Total: {totalWithTax.toFixed(2)} AED
                </p>
              </>
            )}
          </div>

          <button
            onClick={handleCheckout}
            disabled={loadingOrder || cart.length === 0}
            className="w-full py-4 bg-[#3c3c3c] text-white rounded"
          >
            {loadingOrder ? "Processing…" : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}
