"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { User } from "lucide-react";

export default function MobileAuthLink() {
  const { user, token } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const currentPath = queryString ? `${pathname}?${queryString}` : pathname;
  const loginHref = `/user?redirect=${encodeURIComponent(currentPath)}`;

  if (user && token) {
    return (
      <Link href="/profile" className="font-medium">
        <button className="flex flex-col items-center gap-y-2">
          <User size={20} />
          <span className="text-xs">{user.name?.split(" ")[0] || "کاربر"}</span>
        </button>
      </Link>
    );
  }

  return (
    <Link href={loginHref} className="font-medium">
      <button className="flex flex-col items-center gap-y-2">
        <User size={20} />
        <span className="text-xs">ورود | ثبت نام</span>
      </button>
    </Link>
    // <MobileAuthLink />
  );
}
