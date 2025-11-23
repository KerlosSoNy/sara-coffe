import React from "react";
import Image from "next/image";

import LenisScroll from "@/components/LenisScroll";
import Link from "next/link";
import bannerImage from "@/public/assets/images/111.jpg";

import ConsultationForm from "@/components/forms/ConsultationForm";
import Title from "@/components/Title";

// import { getCollectionWithProducts, getRegion } from "@lib/data";
// import ProductPreview from "@modules/products/components/product-preview";

export default async function ConsultationPage({ params }) {
  return (
    <>
      <LenisScroll />
      {/* <Hero2 /> */}
      <div className="container mt-5 relative">
        <Image
          src={bannerImage}
          width={1200}
          height={300}
          className="w-full h-[200px] md:h-[500px] rounded-md object-cover "
          alt="Academy Banner"
        />
        <h1 className="absolute md:top-1/3 top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/3 text-center text-[32px] text-white  font-arial font-black md:text-[62px]">
          Consultation
        </h1>
        <div className=" font-arial font-medium text-[18px] md:text-[24px] text-[#38503C] text-center px-5 md:px-10 mt-10 md:mt-20">
          <p>
            Whether you're planning to open a new coffee shop or need assistance
            with an existing one, I provide in-depth technical consultations to
            ensure a successful venture. Contacts us to elevate your experience
            to excellence !
          </p>
        </div>
      </div>
      <Title
        tag="h2"
        className="text-center md:text-4xl text-2xl  font-arial font-medium my-10 md:my-20"
      >
        Get in Touch
      </Title>
      <div className="pt-4 pb-20 md:pb-40 flex flex-col-reverse md:grid grid-cols-12 container gap-20">
        <div className="block md:col-span-6 text-2xl md:text-5xl  font-arial  text-[#38503C]">
          <ConsultationForm />
        </div>
        <div className="block md:col-span-6 pt-6">
          <ul className="flex flex-col gap-10  font-arial font-bold text-xl">
            <li>
              <Link href="mailto:sara.coffeeconsultants@gmail.com">
                Email: sara.coffeeconsultants@gmail.com
              </Link>
            </li>

            <li>
              <Link href="tel:+971502504003">Whatsapp: +971 50 250 4003</Link>
            </li>
            <li>
                <Link href="https://www.instagram.com/sara.alkhooori/">
                  Instagram : Sara Alkhoori
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </>
  );
}
