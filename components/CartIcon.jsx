// "use client";

// import Link from "next/link";
// import { ShoppingCart } from "lucide-react";
// import { useCart } from "@/lib/context/CartContext";
// import { useEffect, useState } from "react";

// export default function CartIcon() {
//   const { getTotalQuantity } = useCart();
//   const quantity = getTotalQuantity?.() || 0;

//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     if (quantity > 0) {
//       setAnimate(true);
//       const timeout = setTimeout(() => setAnimate(false), 300); // Reset animation class
//       return () => clearTimeout(timeout);
//     }
//   }, [quantity]);

//   return (
//     <Link href="/cart" className="relative">
//       <ShoppingCart size={24} />
//       {quantity > 0 && (
//         <span
//           className={`absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${
//             animate ? "animate-bounce" : ""
//           }`}
//         >
//           {quantity}
//         </span>
//       )}
//     </Link>
//   );
// }

"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const { getTotalQuantity } = useCart();
  const quantity = getTotalQuantity?.() || 0;

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (quantity > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [quantity]);

  return (
    <div className="relative">
      <ShoppingCart size={24} />
      {quantity > 0 && (
        <span
          className={`absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full `}
        >
          {quantity}
        </span>
      )}
    </div>
  );
}
