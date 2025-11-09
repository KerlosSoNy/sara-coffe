import React from "react";

import LenisScroll from "@/components/LenisScroll";

import TextCharacterShadow from "@/components/textCharacterShadow/TextCharacterShadow";
import Image from "next/image";

import ImageAnim from "@/components/ImageAnim";
import CertifiedSensory from "@/public/assets/images/certified-sensory.jpg";
import CertifiedJudge from "@/public/assets/images/certified-judge.jpg";
import CertifiedQGrader from "@/public/assets/images/certificate-q-arabica-grader.jpg";

import Element1 from "@/public/assets/images/element-1.png";
import img from "@/public/assets/images/Sara_Forbes.jpg";

export default function AboutUs() {
  return (
    <>
      <LenisScroll />
      <div className="container flex justify-between items-center py-2 relative flex-col md:flex-row">
        <div className="w-full lg:w-[60%]">
          <div className="flex justify-start items-center mb-5">
            <h2 className="text-[32px] mr-6 font-Adorealternate font-bold md:text-[52px]">
              About Us
            </h2>
            <Image src={Element1} width={35} height={35} alt="" />
          </div>
          <TextCharacterShadow />
        </div>
        <div className="pt-20">
          <ImageAnim src={img} width={600} height={700} />
        </div>
      </div>

      <div className="content-container flex flex-col items-center pt-10 pb-52">
        <h2 className="text-[32px] font-Adorealternate font-bold mb-20 md:text-[42px]">
          Certified sensory judge certificates
        </h2>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
          <div>
            <Image
              src={CertifiedSensory}
              width={600}
              height={600}
              alt=""
              className="shadow-md rounded-[14px]"
            />
          </div>
          <div>
            <Image
              src={CertifiedJudge}
              width={600}
              height={600}
              alt=""
              className="shadow-md rounded-[14px]"
            />
          </div>
        </div>
        <div className="pt-10">
          <Image
            src={CertifiedQGrader}
            width={600}
            height={600}
            alt=""
            className="shadow-md rounded-[14px]"
          />
        </div>
      </div>
    </>
  );
}
