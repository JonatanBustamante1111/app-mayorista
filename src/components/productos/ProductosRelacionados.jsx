import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import Card from '../reutilizables/Card'

export default function ProductosRelacionados({productos}) {
  return (
    <section className="flex flex-col gap-16 w-full col-span-2">
      <article className="w-full text-center">
        <h2 className=" font-semibold text-2xl text-center text-blanco  mt-10 w-full">
          Productos relacionados
        </h2>
        <div className="w-16 font-monsterrat border-2 border-secundario font-medium  text-base my-6 mx-auto"></div>
      </article>
      <article className='relative'>
       
         <div className='swiper-button-prev swiper-button'></div>
         <div className='swiper-button-next swiper-button'></div>
        <div className='mx-10'>
          <Swiper
            //params={swiperOptions}
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
              400: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 80,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {productos.map(producto =>
              <SwiperSlide key={producto.id}>
                  <Card producto={producto}/>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </article>
    </section>
  )
}
