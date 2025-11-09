// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import Link from "next/link";
// import ProductCard from "./ProductCard";

// export default function CategoryProductSlider({ products, category }) {
//   if (!products || products.length === 0) {
//     return <div>No products found for {category}</div>;
//   }

//   return (
//     <div>
//       <div>
//         <h2 className="text-xl font-bold mb-4">{category}</h2>
//         <Link href={}></Link>
//       </div>
//       <Swiper
//         spaceBetween={20}
//         slidesPerView={4}
//         navigation
//         modules={[Navigation]}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 4 },
//         }}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product.id}>
//             <ProductCard product={product} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import Link from "next/link";
// import ProductCard from "./ProductCard";
// import Title from "./Title";

// export default function CategoryProductSlider({
//   products,
//   category,
//   categorySlug,
//   categoryName,
// }) {
//   if (!products || products.length === 0) {
//     return <div>No products found for {categoryName}</div>;
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <Title tag="h2" className="text-3xl font-bold mb-4">
//           {categoryName}
//         </Title>
//         <Link
//           href={`/category/${categorySlug}`}
//           className="text-sm text-blue-500 hover:underline"
//         >
//           مشاهده همه
//         </Link>
//       </div>
//       <Swiper
//         spaceBetween={20}
//         slidesPerView={4}
//         navigation
//         modules={[Navigation]}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 5 },
//         }}
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product.id}>
//             <ProductCard product={product} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import ProductCard from "./ProductCard";
import Title from "./Title";
import { ArrowRight } from "lucide-react";

export default function CategoryProductSlider({
  products = [], // Default to an empty array if undefined or null
  category,
  categorySlug,
  categoryName,
}) {
  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products found for {categoryName}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <Title tag="h2" className="text-xl md:text-2xl font-medium ">
          {categoryName}
        </Title>

        <Link
          href={`/category/${categorySlug}`}
          className="text-sm text-blue-500 font-medium  flex items-center gap-1 justify-center group"
        >
          See All
          <ArrowRight
            size={14}
            className="transition-all duration-200 group-hover:-translate-x-1"
          />
        </Link>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        navigation
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
