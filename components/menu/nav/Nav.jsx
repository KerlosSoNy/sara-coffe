"use client";
import styles from "./styles.module.scss";
import { motion } from "motion/react";
import { links, footerLinks } from "./data";

// import { getMenuItems } from "@/lib/menu";
import { perspective, slideIn } from "./anim";
import Link from "next/link";

export default function Nav() {
  return (
    <div className={`${styles.nav} font-adore  font-bold`}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <motion.div
                href={href}
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                {/* <a></a> */}
                <Link href={href}>{title}</Link>
              </motion.div>
            </div>
          );
        })}
      </div>
      <motion.div className={styles.footer}>
        {footerLinks.map((link, i) => {
          const { title, href } = link;
          return (
            <motion.a
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={`f_${i}`}
              href={href}
            >
              {title}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
