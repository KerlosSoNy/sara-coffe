"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import Element1 from "@/public/assets/images/element-1.png";
import Element2 from "@/public/assets/images/element-2.png";
import Element4 from "@/public/assets/images/element-4.png";

export default function ProductCategories() {
  return (
    <div className="grid grid-cols-1 gap-5 content-container py-40 md:grid-cols-3 md:gap-20 container ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: "all", once: true }}
        transition={{ duration: 2.5, delay: 0.1 }}
      >
        <Link
          href="/products"
          className="relative rounded-lg bg-[#526E56] h-[250px] overflow-hidden flex justify-center items-center p-5 "
        >
          <p className="text-[#F0E7D5]  stroke-cyan-500 drop-shadow text-[22px] md:text-[28px] font-arialz-10">
            Roastery
          </p>
          <Image
            src={Element1}
            width={150}
            height={150}
            alt=""
            className="absolute bottom-[-20px] left-5 opacity-60"
          />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: "all", once: true }}
        transition={{ duration: 2.5, delay: 0.3 }}
      >
        <Link
          href="/academy"
          className="relative rounded-lg bg-[#AF7A6A]  h-[250px] flex justify-center items-center overflow-hidden  p-5"
        >
          <p className="text-[#EFE5D4] text-[22px] md:text-[28px] font-arial">
            Sara's Academy
          </p>
          <Image
            src={Element4}
            width={110}
            height={110}
            alt=""
            className="absolute bottom-[-40px] opacity-40"
          />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: "all", once: true }}
        transition={{ duration: 2.5, delay: 0.5 }}
      >
        <Link
          href="/consultation"
          className="relative rounded-lg bg-[#EFE6D5]  h-[250px] flex justify-center items-center overflow-hidden  p-5 "
        >
          <p className="text-[#38503C] text-[20px] md:text-[28px] font-Adorealternate">
            Sara's Consultation
          </p>
          <Image
            src={Element2}
            width={150}
            height={150}
            alt=""
            className="absolute bottom-[-20px] right-0 opacity-40 scale-x-[-1]"
          />
        </Link>
      </motion.div>
    </div>
  );
}
