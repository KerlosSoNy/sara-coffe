"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { motion } from "motion/react";

import "swiper/css";
import "@/app/globals.css";

export default function BrandsCarousel({ brands }) {
  return (
    <Swiper
      spaceBetween={10}
      grabCursor={true}
      freeMode={true}
      speed={15000}
      loop={true}
      slidesPerView={4}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: false,
      }}
      breakpoints={{
        0: {
          spaceBetween: 40,
        },
        992: {
          spaceBetween: 40,
        },
      }}
      modules={[Autoplay]}
    >
      {brands.map((brand, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center">
          <Link href={brand.url}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={brand.logoUrl}
                alt={brand.name}
                width={100}
                height={100}
                className="object-contain"
              />
            </motion.div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
