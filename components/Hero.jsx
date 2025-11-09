"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

import AnimatedText from "./AnimatedText";

import styles from "./styles.module.scss";

import HeroPic from "@/public/assets/images/hero3.jpg";

export default function Hero() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [3, 4]);
  const scale3 = useTransform(scrollYProgress, [0, 3], [1, 3]);

  // const yTransform = useTransform(scrollYProgress, [1, 0], [-200, 0])
  const opacityTransform = useTransform(scrollYProgress, [1, 0], [0, 1]);

  return (
    <div
      ref={container}
      className={`${styles.container} text-5xl font-adore font-bold`}
    >
      <div className={styles.sticky}>
        <div className={styles.el}>
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ scale: scale3, opacity: opacityTransform }}
            className="absolute z-50 top-0 mt-40 text-[5vw] text-white "
          >
            <AnimatedText
              firstText="SARA"
              className="text-center mb-10 font-bold text-[70px] md:text-[120px]"
            />
            <AnimatedText
              firstText="COFFEE CONSULTANCY"
              className="text-center mb-10 font-bold text-[24px] md:text-[80px]"
            />
          </motion.div>
          <motion.div
            style={{ scale: scale4 }}
            className={styles.imageContainer}
          >
            <Image
              src={HeroPic}
              fill
              alt="image"
              className="brightness-[90%]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
