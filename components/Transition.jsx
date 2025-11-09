"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logoLoader from "@/public/assets/images/logo.png";

export default function Transition({ children }) {
  const pathName = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 500);

    return () => clearTimeout(timeout);
  }, [pathName]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key={pathName}
            className="fixed inset-0 flex items-center justify-center bg-[#fff] z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-fit h-fit"
            >
              <Image src={logoLoader} alt="logo" width={100} height={100} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Fade Animation */}
      <motion.div
        key={pathName} // Ensures animation applies to each route change
        initial={{ opacity: 1 }}
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
