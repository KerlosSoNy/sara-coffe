"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductImage({ product }) {
  const fallback = "/assets/images/placeholder.webp";

  const getValidImages = (product) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    return []; // return empty array so we can fallback in useEffect
  };

  const [mainImage, setMainImage] = useState(fallback);
  const [images, setImages] = useState(getValidImages(product));

  useEffect(() => {
    const newImages = getValidImages(product);
    setImages(newImages);
    setMainImage(newImages[0]?.src || fallback);
  }, [product]);

  const handleImageError = (e) => {
    e.target.src = fallback;
  };

  return (
    <div>
      {/* Main Image */}
      <div className="mb-4">
        <img
          src={mainImage}
          alt={product.name || "Product"}
          className="w-full h-auto object-cover rounded"
          onError={handleImageError}
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 0 && (
        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          navigation
          modules={[Navigation]}
          className="mb-6"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.src || fallback}
                alt={`${product.name || "Product"} thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover border rounded cursor-pointer ${
                  mainImage === image.src
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.src || fallback)}
                onError={handleImageError}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
