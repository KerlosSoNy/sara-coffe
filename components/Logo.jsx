import React from "react";
import Link from "next/link";
import Image from "next/image";
// import logo from "@/public/logo.svg";
import logo from "@/public/assets/images/logo.png";

export default function Logo() {
  return (
    <Link href="/">
      {/* <Image src={logo} width={80} height={80} alt="logo" /> */}
      <Image src={logo} alt="logo" width={120} height={120} />
    </Link>
  );
}
