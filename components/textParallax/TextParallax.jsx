"use client";
import { useScroll, useTransform, motion } from "motion/react";
import Picture1 from "@/public/assets/images/element-1.png";
import Picture2 from "@/public/assets/images/element-2.png";
import Picture3 from "@/public/assets/images/element-1.png";

import Image from "next/image";
import { useRef } from "react";

export default function TextParallax() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  return (
    <section className="overflow-hidden">
      <div className="h-[20vh]" />
      <div ref={container}>
        <Slide
          src={Picture1}
          direction={"left"}
          left={"-40%"}
          progress={scrollYProgress}
        />
        <Slide
          src={Picture2}
          direction={"right"}
          left={"-25%"}
          progress={scrollYProgress}
        />
        <Slide
          src={Picture3}
          direction={"left"}
          left={"-75%"}
          progress={scrollYProgress}
        />
      </div>
      <div className="h-[20vh]" />
    </section>
  );
}

const Slide = (props) => {
  const direction = props.direction == "left" ? -1 : 1;
  const translateX = useTransform(
    props.progress,
    [0, 1],
    [150 * direction, -150 * direction]
  );
  return (
    <motion.div
      style={{ x: translateX, left: props.left }}
      className="relative flex whitespace-nowrap"
    >
      <Phrase src={props.src} />
      <Phrase src={props.src} />
      <Phrase src={props.src} />
    </motion.div>
  );
};

const Phrase = ({ src }) => {
  return (
    <div className={"px-5 flex gap-5 items-center"}>
      <p className="text-[4.5vw]">Collaboration</p>
      <span className="relative h-[7.5vw] aspect-[1] rounded-full overflow-hidden">
        <Image
          style={{ objectFit: "contain" }}
          src={src}
          alt="image"
          width={100}
          height={100}
        />
      </span>
      <p className="text-[4.5vw]">Continuous Learning</p>
      <span className="relative h-[7.5vw] aspect-[1] rounded-full overflow-hidden">
        <Image
          style={{ objectFit: "contain" }}
          src={src}
          alt="image"
          width={100}
          height={100}
        />
      </span>
      <p className="text-[4.5vw]">Integrity</p>
      <span className="relative h-[7.5vw] aspect-[1] rounded-full overflow-hidden">
        <Image
          style={{ objectFit: "cover" }}
          src={src}
          alt="image"
          width={100}
          height={100}
        />
      </span>
    </div>
  );
};
