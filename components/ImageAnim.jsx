"use client";
import { useRef } from "react";
import { useInView, motion } from "motion/react";
import Image from "next/image";

export default function ImageAnim({ src, width, height }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <motion.div
        className="overflow-hidden flex items-center"
        style={{
          clipPath: isInView
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          transition: "all 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) .5s",
          opacity: isInView ? 1 : 0,
        }}
      >
        <motion.div
          initial={{ scale: 2 }}
          animate={{ scale: isInView ? 1 : 2 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={src}
            width={width}
            height={height}
            alt=""
            className="rounded-3xl"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
