import React from "react";
import HomeSlider from "@/components/HomeSlider";
import CategoryProductSlider from "@/components/CategoryProductSlider";
import {
  getProductsByCategorySlug,
  getCategoryBySlug,
} from "@/lib/woocommerce";
import { getCategories } from "@/lib/woocommerce";
import { getBlogs } from "@/lib/woocommerce";
import CategoryCard from "@/components/CategoryCard";
import BlogCard from "@/components/BlogCard";
import Title from "@/components/Title";
import BannerTwoCols from "@/components/BannerTwoCols";
import BrandsCarousel from "@/components/BrandsCarousel";
// import TrustIcons from "@/components/TrustIcons";
import { Separator } from "@/components/ui/separator";

import ProductCategories from "@/components/ProductCategories";
import Hero from "@/components/Hero";
import Image from "next/image";
import Element1 from "@/public/assets/images/element-1.png";
import TextCharacterShadow from "@/components/textCharacterShadow/TextCharacterShadow";
import ImageAnim from "@/components/ImageAnim";
import img from "@/public/assets/images/Sara_Forbes.jpg";
import ZoomParallax from "@/components/ZoomParallax/ZoomParallax";
import ServiceComponent from "@/components/serviceComponent/ServiceComponent";
import ValueSection from "@/components/valueSection/ValueSection";
import TextParallax from "@/components/textParallax/TextParallax";
import LenisScroll from "@/components/LenisScroll";

export default async function Home() {
  return (
    <>
      <main className="font-adorealternate">
        <LenisScroll />
        <Hero />
        <div className="container">
          <ProductCategories />
        </div>
        <div className="bg-[#f9f2e6]">
          <div className="container flex justify-between items-center py-10 md:py-24 relative flex-col md:flex-row ">
            <div className="w-full lg:w-[60%]">
              <div className="flex justify-start items-center mb-5">
                <h2 className="text-[32px] mr-6 font-adorealternate font-medium md:text-[52px]">
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
        </div>
        <div className="pt-20 bg-[#37503B]">
          <ZoomParallax />
        </div>
        <div className="flex justify-end items-center flex-col relative pb-20 ">
          <h2 className="text-[42px] py-20 font-adorealternate md:text-[52px] font-medium">
            Sara's Services
          </h2>
          <ServiceComponent />
        </div>
        <div className="py-20 bg-[#EFE5D4] ">
          <ValueSection />
        </div>

        <TextParallax />
      </main>
    </>
  );
}
