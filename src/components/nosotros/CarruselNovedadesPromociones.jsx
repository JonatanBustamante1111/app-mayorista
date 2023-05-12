import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseconfig";

export default function CarruselNovedadesPromociones() {
  const [imagenes, setImagenes] = useState([]);
  const consultarBanner = async () => {
    const banner = collection(db, "banner");
    const querySnapshot = await getDocs(banner);
    const datos = querySnapshot.docs.map(
      (doc) => doc.data().imagenes);

    setImagenes(datos[0]);
  };

  useEffect(() => {
    consultarBanner();
  }, []);
 
  return (
    <article className="relative ">
      <div className="swiper-button-prev swiper-button"></div>
      <div className="swiper-button-next swiper-button"></div>
      <div className=" w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
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
          {imagenes.map((imagen, index) => (
            <SwiperSlide key={index}>
              <img className="object-cover " src={imagen} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </article>
  );
}
