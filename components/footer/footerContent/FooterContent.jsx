import Image from "next/image";
import React from "react";

import Element from "@/public/assets/images/element-1.png";
import Link from "next/link";

export default function FooterContent() {
  return (
    <div className="bg-[#38503C] pt-32 pb-12 px-12 h-full w-full flex flex-col justify-between">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="md:flex justify-start md:items-center text-white relative gap-10 w-full">
      <div className=" flex justify-center md:justify-start items-center gap-1 md:gap-5 mb-5 md:mb-0">
        <h1 className="text-[16px] md:text-[42px] leading-[0.8]  font-arial z-10 md:mb-2">
          Sara Coffee
        </h1>
        <p className="z-10 text-[14px] text-white">
          copyright © 2024 saracoffee
        </p>
      </div>
      {/* <div className="hidden md:flex justify-center items-center">|</div> */}
      {/* <div className="text-[14px] flex justify-center md:justify-start items-center gap-2 ">
        <p className="text-white">Developed by</p>
        <Link
          href="https://ardalanaadal.com"
          target="_blank"
          className="cursor-pointer"
        >
          ardalanaadal.com
        </Link>
      </div> */}

      <div className="absolute bottom-0 right-0 -mb-16 ">
        <Image
          src={Element}
          alt=""
          className="w-[400px] md:opacity-100 opacity-10 -z-0"
        />
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="md:flex max-md:shrink-0 md:gap-40">
      <div className="flex flex-col gap-2 text-white mb-10">
        <h3 className="mb-2 max-md:mb-8 uppercase  font-arial font-bold text-[24px] ">
          Contact Us
        </h3>
        <p className="mb-2 max-md:mb-8 uppercase font-montserrat text-[16px] md:w-3/4 text-white">
          For all your coffee queries and needs, feel free to reach out to us.
          Our Head of Roastery, Sara Alkhoori, and our dedicated team are always
        </p>
        <ul className="pl-3">
          <li className="list-disc">
            <Link
              href="tel:+971502504003"
              className="text-[18px] font-montserrat "
            >
              +971 50 250 4003
            </Link>
          </li>
          <li className="list-disc">
            <Link
              href="mailto:sara.coffeeconsultants@gmail.com"
              className="text-[18px] font-montserrat"
            >
              sara.coffeeconsultants@gmail.com
            </Link>
          </li>
        </ul>

        <p></p>
      </div>
      <div className="flex flex-col gap-2 text-white ">
        <h3 className="mb-2 max-md:mb-8 uppercase  font-arial font-bold text-[24px]">
          socials
        </h3>
        <div className="flex justify-start md:justify-center items-center gap-10 font-montserrat z-10">
          <Link href="https://www.instagram.com/sara.alkhooori/">
            Instagram
          </Link>
          <Link href="/"></Link>
          <Link href="/"></Link>
          <Link href="/"></Link>
          <Link href="/"></Link>
        </div>
      </div>
    </div>
  );
};
