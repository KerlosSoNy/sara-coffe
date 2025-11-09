"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
// import Button from "@modules/layout/components/headerMenu/button";
import Button from "./button/Button";
// import Nav from "@modules/layout/components/headerMenu/nav";
import Nav from "./nav/Nav";
import styles from "./styles.module.scss";

const menu = {
  open: {
    width: "480px",
    height: "650px",
    top: "-25px",
    left: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    left: "0px",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function HeaderMenu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.header}>
      <motion.div
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>{isActive && <Nav />}</AnimatePresence>
      </motion.div>
      <Button
        isActive={isActive}
        toggleMenu={() => {
          setIsActive(!isActive);
        }}
      />
    </div>
  );
}
