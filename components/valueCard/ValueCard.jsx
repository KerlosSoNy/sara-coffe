"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

import value1 from "@/public/assets/images/valuepic11.webp";
import value2 from "@/public/assets/images/valuepic22.webp";
import value3 from "@/public/assets/images/valuepic33.webp";

const cardsTop = [
  {
    id: 1,
    title: "Value",
    text: "",
    image: "",
  },
  {
    id: 2,
    title: "Collaboration",
    text: "We work alongside our clients to achieve shared success. This includes offering online content and comprehensive introductions to our services. We are dedicated to building strong, lasting relationships and partnerships, both with our clients and within the wider coffee community.",
    image: "",
  },
  {
    id: 3,
    title: "",
    text: "",
    image: value1,
  },
  {
    id: 4,
    title: "Continuous Learning",
    text: "We are committed to staying abreast of the latest trends and innovations in the coffee industry, from farming and processing to brewing techniques and advancements in machinery. We believe that sharing knowledge is not just a practice, but a pathway to growth. Our goal is to foster the ongoing development and evolution of our clients, aiding them in their journey to achieve coffee excellence",
    image: "",
  },
];

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
    image: value2,
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
    image: value3,
  },
];

export default function ValueCard() {
  return (
    <div className="overflow-auto flex flex-col justify-start">
      <div className="flex justify-center items-center gap-10">
        {cardsTop.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all", once: true }}
            transition={{ duration: 2.5, delay: i * 0.1 }}
          >
            <div className="relative text-white px-5 w-[300px] h-[400px] rounded-xl z-20 bg-[#C28378]">
              <div className="absolute top-0 right-0 bottom-0 left-0 w-fit h-fit z-30 m-auto text-center">
                <h3 className="font-adorea mb-2 text-[24px] font-medium">
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
                    className="z-10 rounded-xl object-cover"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-10 -mt-10 ">
        {cardsBottom.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: "all", once: true }}
            transition={{ duration: 2.5, delay: i * 0.1 }}
          >
            <div className="relative text-white px-5 w-[300px] h-[400px] rounded-b-xl bg-[#734B40] ">
              <div className="absolute top-0 right-0 bottom-0 left-0 w-fit h-fit z-30 m-auto text-center px-5 ">
                <h3 className=" font-arial mb-2 text-[20px]">
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
                    className="z-10 rounded-b-xl object-cover"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
