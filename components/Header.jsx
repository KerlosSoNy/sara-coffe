import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { MediaOffCanva } from "./MediaOffCanva";
import NavBar from "./NavBar";
import MobileNav from "./MobileNav";
import CartIcon from "@/components/CartIcon";
import AuthLink from "./AuthLink";
import { Suspense } from "react";
import HeaderMenu from "./menu/HeaderMenu";

export default function Header() {
  return (
    <>
      {/* <NavBar /> */}
      {/* <header className="container flex flex-col mt-5">
        <div className="flex items-center mb-5">
          <div className="flex flex-1 items-center gap-x-8">
            <Logo />
            
          </div>
          <div className="hidden md:flex items-center gap-x-10">
            <Suspense fallback={null}>
              <AuthLink />
            </Suspense>
            <Link href="/cart">
              <CartIcon />
            </Link>
          </div>
        </div>
        <div className="hidden md:flex justify-between items-center ">
          <Menu menuSlug="main-menu" />
        </div>
      </header>
      <div className="block md:hidden">
        <MobileNav />
      </div> */}
      <header className="container  mt-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex-1">
            <HeaderMenu />
          </div>
          <div className="flex-1 flex justify-center items-center gap-x-8">
            <Logo />
          </div>
          <div className="flex-1 flex justify-end items-center gap-x-10">
            <Suspense fallback={null}>
              <AuthLink />
            </Suspense>
            <Link href="/cart">
              <CartIcon />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
