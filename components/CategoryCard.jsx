"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function CategoryCard({ category, className }) {
  const { slug, name, image } = category;

  return (
    <Link
      href={`/category/${slug}`}
      className={`${className} md:py-4 group overflow-hidden bg-[#526E56] rounded-[14px] transition-all duration-500 hover:bg-[#AF7A6A]`}
    >
      {/* Title Section */}
      <div className="p-4 text-center ">
        <h2 className=" md:text-lg font text-white transition-all duration-300 md:group-hover:-translate-y-2  font-arial ">
          {name}
        </h2>
        {/* <div className=" rounded-tr-[8px] rounded-tl-[8px] left-1/2 transform -translate-x-1/2 bottom-0 h-[10px] w-32  bg-[#BDDFCF] opacity-0 transition-all duration-300 group-hover:bottom-[0px]   group-hover:opacity-100" /> */}
      </div>
    </Link>
  );
}
