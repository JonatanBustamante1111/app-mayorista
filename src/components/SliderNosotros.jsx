import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function SliderNosotros() {

  const imagenes = [
    "https://i.ibb.co/2yYt629/Whats-App-Image-2023-04-17-at-15-16-1-1.png",
    "https://i.ibb.co/SRCH6gx/Whats-App-Image-2023-04-17-at-16-20-2x.png",
    "https://i.ibb.co/dGQD950/Whats-App-Image-2023-04-17-at-16-21.png",
    "https://i.ibb.co/R7WmcrQ/Whats-App-Image-2023-04-17-at-16-20.png",
    "https://i.ibb.co/HX7qm5v/Whats-App-Image-2023-04-17-at-16-20-2.png",
    "https://i.ibb.co/4Jq5WK8/Whats-App-Image-2023-04-17-at-16-20-1.png"
  ];

  const prevRef = React.useRef(null);
  const nextRef = React.useRef(null);

  return (
      <article className='relative'>
       
         <div className='swiper-button-prev swiper-button' ref={prevRef}></div>
         <div className='swiper-button-next swiper-button' ref={nextRef}></div>
        <div className='mx-10'>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
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
                  <img className='w-full  h-[200px] sm:h-[400px]  md:h-[674px] p-2' src={imagen} alt="" />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </article>
  )
}
