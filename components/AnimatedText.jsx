"use client";
import React from "react";
import { motion } from "motion/react";

const AnimatedText = ({ className, firstText }) => {
  const AnimationProps = {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: -10 },
    transtion: { duration: 0.2, delay: 1 },
  };
  return (
    <div className={className}>
      <span className="sr-only">{firstText}</span>
      <motion.span
        arial-hidden="true"
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
          delayChildren: 1,
          durationChildren: 0.2,
        }}
        className="overflow-hidden"
      >
        {firstText.split(" ").map((word, index) => (
          <React.Fragment key={index}>
            {word.split("").map((letter, index) => (
              <motion.span
                className="inline-block"
                key={index}
                variants={AnimationProps}
              >
                {letter}
              </motion.span>
            ))}

            <motion.span
              className="inline-block"
              key={index}
              variants={AnimationProps}
            >
              &nbsp;
            </motion.span>
          </React.Fragment>
        ))}
      </motion.span>
    </div>
  );
};
export default AnimatedText;
