import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function CarruselNovedadesPromociones() {

  const imagenes = [
    "https://i.ibb.co/yB4WDyv/Whats-App-Image-2023-04-17-at-15-16-1-min.jpg",
    "https://i.ibb.co/d4KGYqS/Whats-App-Image-2023-04-17-at-16-21-min.jpg"
  ];
  
  return (
      <article className='relative '>
       
         <div className='swiper-button-prev swiper-button' ></div>
         <div className='swiper-button-next swiper-button' ></div>
        <div className=' w-full'>
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
                  <img className='w-full  h-[200px] sm:h-[300px] md:h-[400px] ' src={imagen} alt="" />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </article>
  )
}