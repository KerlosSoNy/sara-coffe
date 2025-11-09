import React from "react";
import Image from "next/image";

export default function BannerTwoCols({ leftImageUrl, rightImageUrl }) {
  // Properly destructure props
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
      <div className="relative h-[200px] md:h-[300px] w-full">
        {" "}
        {/* Add relative class for Image */}
        <Image
          src={leftImageUrl}
          alt="Banner"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          className="rounded-lg"
        />
      </div>
      <div className="relative h-[200px] md:h-[300px] w-full">
        {" "}
        {/* Add relative class for Image */}
        <Image
          src={rightImageUrl}
          alt="Banner"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
