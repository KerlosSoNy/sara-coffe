import Link from "next/link";
import MenuMobile from "./MenuMobile";
import { getMenuItems } from "@/lib/menu";
import { ShoppingCart, User, House } from "lucide-react";
import MobileAuthLink from "./MobileAuthLink";
import { Suspense } from "react";

export default async function MobileNav() {
  const menuItems = await getMenuItems("main-menu");
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#f2fff9] shadow-lg border-t flex justify-around py-3 z-40">
      <Link href="/">
        <button className="flex flex-col items-center gap-y-2">
          <House size={20} />
          <span className="text-xs">خانه</span>
        </button>
      </Link>
      <MenuMobile menuItems={menuItems} />
      <Link href="/cart">
        <button className="flex flex-col items-center gap-y-2">
          <ShoppingCart size={20} />
          <span className="text-xs">سبد خرید</span>
        </button>
      </Link>
      <Suspense fallback={null}>
        <MobileAuthLink />
      </Suspense>
    </div>
  );
}
