import React from "react";
import { ContactUsOffCanva } from "./ContactUsOffCanvas";

export default function NavBar() {
  return (
    <div className="w-full h-[40px] bg-[#BDDFCF]">
      <div className="container flex justify-between items-center">
        <div></div>
        <ContactUsOffCanva />
        <div></div>
      </div>
    </div>
  );
}
