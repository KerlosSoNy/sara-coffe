export const dynamic = 'force-dynamic';

import React from "react";
import Image from "next/image";
import LenisScroll from "@/components/LenisScroll";
import Link from "next/link";
import bannerImage from "@/public/assets/images/10.jpg";
import AcademyForm from "@/components/forms/AcademyForm";
import Title from "@/components/Title";
import { getCategories, getProductsByCategorySlug } from "@/lib/woocommerce";
import CategoryProductSlider from "@/components/CategoryProductSlider";

export default async function AcademyPage() {
  const categories = await getCategories();

  // Replace with actual course category slugs
  const courseCategorySlugs = ["course"];

  const courseCategories = categories.filter((cat) =>
    courseCategorySlugs.includes(cat.slug)
  );

  // Fetch products for each course category
  const courseData = await Promise.all(
    courseCategories.map(async (cat) => {
      const { products } = await getProductsByCategorySlug(cat.slug, 1, 10);
      return { ...cat, products };
    })
  );

  return (
    <>
      <LenisScroll />
      <div className="container mt-5 relative">
        <Image
          src={bannerImage}
          width={1200}
          height={300}
          className="w-full h-[200px] md:h-[500px] rounded-md object-cover"
          alt="Academy Banner"
        />
        <h1 className="absolute md:top-1/3 top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/3 text-center text-[32px] text-white  font-arial  font-black md:text-[62px]">
          Sara's Academy
        </h1>
        <div className=" font-arial  font-medium text-[18px] md:text-[24px] text-[#38503C] text-center px-5 md:px-10 mt-10 md:mt-20">
          <p>
            With my expertise as an Authorized SCA (Specialty Coffee
            Association) Trainer, a Certified Coffee Sensory Judge by the World
            Coffee Events (WCE), and Q Arabica trainer, I provide a range of
            training tailored to your requirements. Contacts us now for
            inquiries!
          </p>
        </div>
      </div>

      {/* 🔽 Course Sliders */}
      <div className="container py-16 space-y-20">
        {courseData.map((cat) => (
          <CategoryProductSlider
            key={cat.id}
            products={cat.products}
            categoryName={cat.name}
            categorySlug={cat.slug}
            TitleColor="text-[#38503C]"
            LinkColor="text-[#38503C]"
          />
        ))}
      </div>

      <Title
        tag="h2"
        className="text-center md:text-4xl text-2xl  font-arial font-medium my-10 md:my-20"
      >
        Get in Touch
      </Title>

      <div className="pt-4 pb-20 md:pb-40 flex flex-col-reverse md:grid grid-cols-12 container gap-20">
        <div className="block md:col-span-6 text-2xl md:text-5xl  font-arial  text-[#38503C]">
          <AcademyForm />
        </div>
        <div className="block md:col-span-6 pt-6">
          <ul className="flex flex-col gap-10  font-arial font-bold text-xl">
            <li>
              <Link href="mailto:sara.coffeeconsultants@gmail.com">
                Email: sara.coffeeconsultants@gmail.com
              </Link>
            </li>

            <li>
              <Link href="tel:+971504005400">Whatsapp: +971 50 400 5400</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
