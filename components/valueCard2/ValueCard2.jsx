"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

import value1 from "@/public/assets/images/value1.jpg";
import value2 from "@/public/assets/images/value2.jpg";

const cardsBottom = [
  {
    id: 1,
    title: "Excellence",
    text: "We strive for the highest quality in every aspect of our coffee consulting, from service delivery to expertise and customer satisfaction. This commitment is realized by offering personalized and tailored solutions designed to meet the unique needs of each client.",
    image: "",
    bg: "#4E3D34",
  },
  {
    id: 2,
    title: "",
    text: "",
    image: value1,
    bg: "",
  },
  {
    id: 3,
    title: "Integrity",
    text: "We uphold the highest level of integrity in all we do, maintaining transparency, honesty, and ethical standards in our interactions and recommendations. Catering to clients who appreciate specialty coffee, we embody these values in every phase of the coffee journey, from bean sourcing to the final cup, ensuring the utmost quality and authenticity",
    image: "",
    bg: "#AF7A6A",
  },
  {
    id: 4,
    title: "",
    text: "",
    image: value2,
  },
];

export default function ValueCard2() {
  return (
    <div className="flex justify-around items-center ">
      {cardsBottom.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: "all", once: true }}
          transition={{ duration: 2.5, delay: i * 0.1 }}
        >
          <div className="relative text-white px-5 w-[280px] h-[400px] rounded-b-xl bg-[#734B40]">
            <div className="absolute top-0 right-0 bottom-0 left-0 w-fit h-fit z-30 m-auto text-center px-5 ">
              <h3 className="font-adore mb-2 text-[24px] font-medium">
                {card.title}
              </h3>
              <p className="px-5 text-[14px] font-montserrat text-white">
                {card.text}
              </p>
            </div>
            {card.image && (
              <div>
                <Image
                  src={card.image}
                  // width={280}
                  // height={300}
                  fill
                  alt=""
                  className="z-10 rounded-b-xl"
                />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
