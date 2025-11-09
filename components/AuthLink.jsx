// "use client";

// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import { useAuth } from "@/lib/context/AuthContext";
// import { User } from "lucide-react";

// export default function AuthLink() {
//   const { user, token } = useAuth();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const queryString = searchParams.toString();
//   const currentPath = queryString ? `${pathname}?${queryString}` : pathname;
//   const loginHref = `/user?redirect=${encodeURIComponent(currentPath)}`;

//   if (user && token) {
//     return (
//       <Link
//         href="/profile"
//         className="flex items-center gap-2 font-montserrat font-medium"
//       >
//         <User className="w-7 h-7 md:hidden" /> {/* Show icon only on mobile */}
//         <span className="hidden md:inline">My Profile</span>{" "}
//         {/* Show text on md+ */}
//       </Link>
//     );
//   }

//   return (
//     <Link href={loginHref} className="font-medium font-montserrat">
//       Register / Login
//     </Link>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { User } from "lucide-react";

export default function AuthLink() {
  const { user, token } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const qs = searchParams.toString();
  const currentPath = qs ? `${pathname}?${qs}` : pathname;
  const loginHref = `/user?redirect=${encodeURIComponent(currentPath)}`;

  // If authenticated → go to /profile, otherwise → go to login
  const href = user && token ? "/profile" : loginHref;

  return (
    <Link
      href={href}
      className="relative flex items-center p-2"
      aria-label={user && token ? "My Profile" : "Register or Login"}
    >
      <User className="w-6 h-6 text-current" />
    </Link>
  );
}
