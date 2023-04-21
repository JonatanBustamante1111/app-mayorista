import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function SliderNosotros() {

  const imagenes = [
    "https://i.ibb.co/yB4WDyv/Whats-App-Image-2023-04-17-at-15-16-1-min.jpg",
    "https://i.ibb.co/d4KGYqS/Whats-App-Image-2023-04-17-at-16-21-min.jpg",
    "https://i.ibb.co/ZJQTWRS/Whats-App-Image-2023-04-17-at-16-20-2-min.jpg",
    "https://i.ibb.co/6RKfvZg/Whats-App-Image-2023-04-17-at-16-20-min.jpg",
    "https://i.ibb.co/sHNsR7Y/Whats-App-Image-2023-04-17-at-16-20-1-min.jpg",
    "https://i.ibb.co/rkKzBPd/Whats-App-Image-2023-04-17-at-16-20-3-min.jpg"
  ];
  
  return (
      <article className='relative'>
       
         <div className='swiper-button-prev swiper-button' ></div>
         <div className='swiper-button-next swiper-button' ></div>
        <div className='mx-10'>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
            }}
          >
            {imagenes.map(imagen =>
              <SwiperSlide>
                  <img className='w-full  h-[200px] sm:h-[400px]  md:h-[674px] ' src={imagen} alt="" />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </article>
  )
}
