"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import logo from "@/public/assets/images/logo.png";
import style from "./styles.module.scss";

const anim = (variants) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};

export default function Transition({ children }) {
  const pathName = usePathname();
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="curve relative" key={pathName}>
        <motion.div
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          initial={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-3xl fixed m-auto top-0 left-0 right-0 bottom-0 w-fit h-fit z-20"
        >
          <Image src={logo} alt="logo" width={200} height={200} />
        </motion.div>

        <div
          className="background"
          style={{ opacity: dimensions.width > 0 ? 0 : 1 }}
        ></div>

        {dimensions.width > 0 && (
          <SVG width={dimensions.width} height={dimensions.height} />
        )}
        {children}
      </div>
    </AnimatePresence>
  );
}

function SVG({ width, height }) {
  const initialPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 300
  `;

  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      d: initialPath,
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const slide = {
    initial: { top: "-300px" },
    enter: {
      top: "-100vh",
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: {
        top: "100vh",
      },
    },
    exit: {
      top: "-300px",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.svg {...anim(slide)} className="svgtest">
      <motion.path {...anim(curve)} />
    </motion.svg>
  );
}
