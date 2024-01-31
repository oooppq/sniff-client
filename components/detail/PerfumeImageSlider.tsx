'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageSliderProps {
  images: string[];
  blurImageUrls: string[];
}

const ImageSlider = ({ images, blurImageUrls }: ImageSliderProps) => {
  return (
    <Swiper
      pagination={{ type: 'bullets' }}
      modules={[Navigation, Pagination]}
      // onSwiper={(swiper) => console.log(swiper)}
      className="h-[295px] w-full mt-[54px] detail-slider"
    >
      {images.map((image, index) => (
        <SwiperSlide key={image} className="">
          <Image
            placeholder="blur"
            blurDataURL={blurImageUrls[index]}
            src={image}
            alt={`Perfume ${index}`}
            fill
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
