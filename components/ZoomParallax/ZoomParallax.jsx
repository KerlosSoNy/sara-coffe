"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

import styles from "./styles.module.scss";

import parallaxPic1 from "@/public/assets/images/4.jpg";
import parallaxPic2 from "@/public/assets/images/2.jpg";
import parallaxPic3 from "@/public/assets/images/3.jpg";
import parallaxPic4 from "@/public/assets/images/5.jpg";
// import parallaxPic5 from "@/public/assets/images/parallaxpic5.jpg";
// import parallaxPic6 from "@/public/assets/images/parallaxpic6.jpeg";
import parallaxPic7 from "@/public/assets/images/parallaxpic7.jpg";
// import parallaxPic8 from "@/public/assets/images/parallaxpic8.jpg";
import parallaxPic10 from "@/public/assets/images/parallaxpic10.jpg";
import parallaxPic11 from "@/public/assets/images/6.jpg";
// import placeholder from "@/public/assets/images/placeholder.png";

export default function ZoomParallax() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: parallaxPic1,
      scale: scale4,
    },
    {
      src: parallaxPic2,
      scale: scale5,
    },
    {
      src: parallaxPic3,
      scale: scale6,
    },
    {
      src: parallaxPic10,
      scale: scale5,
    },
    {
      src: parallaxPic11,
      scale: scale6,
    },
    {
      src: parallaxPic4,
      scale: scale8,
    },
    {
      src: parallaxPic7,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={`${styles.container} font-Adorealternate`}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale, title, text }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <div className="absolute top-0 bottom-0 left-0 right-0 m-auto w-fit h-fit text-center z-50 px-5">
                  <h3 className="font-Adorealternate">{title}</h3>
                  <p className="font-Montserrat font-light">{text}</p>
                </div>
                <Image src={src} fill alt="image" placeholder="blur" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
