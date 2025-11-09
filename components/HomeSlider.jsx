// "use client";
// import React from "react";

// import Image from "next/image";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import BannerHomeSage from "@/public/assets/images/Banner-home-sage.jpg";
// import BannerHomeCoffee from "@/public/assets/images/banner-home-coffee.jpg";
// import BannerHomeDripper from "@/public/assets/images/banner-home-dripper.jpg";
// import BannerHomeCourses from "@/public/assets/images/banner-courses.jpg";

// import "@/app/globals.css";

// export default function HomeSlider() {
//   return (
//     <Swiper
//       spaceBetween={50}
//       slidesPerView={1}
//       onSlideChange={() => console.log("slide change")}
//       onSwiper={(swiper) => console.log(swiper)}
//       autoplay={{
//         delay: 3500,
//         disableOnInteraction: true,
//       }}
//       pagination={{
//         clickable: true,
//         dynamicBullets: true,
//       }}
//       navigation={true}
//       modules={[Autoplay, Pagination, Navigation]}
//       className="w-full h-auto rounded-[20px]"
//     >
//       <SwiperSlide>
//         <Link href="/category/sage">
//           <Image src={BannerHomeSage} alt="" className="object-cover w-full" />
//         </Link>
//       </SwiperSlide>
//       <SwiperSlide>
//         <Link href="/category/courses">
//           <Image
//             src={BannerHomeCourses}
//             alt=""
//             className="object-cover w-full"
//           />
//         </Link>
//       </SwiperSlide>
//       <SwiperSlide>
//         <Link href="/category/coffee-brewing-tools">
//           <Image
//             src={BannerHomeDripper}
//             alt=""
//             className="object-cover w-full"
//           />
//         </Link>
//       </SwiperSlide>
//     </Swiper>
//   );
// }
