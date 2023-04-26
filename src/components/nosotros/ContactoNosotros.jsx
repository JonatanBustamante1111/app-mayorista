import React from "react";

export default function ContactoNosotros() {
  return (
    <section className=" flex flex-col w-full bg-blanco col-span-2 sm:flex-row sm:gap-0 sm:w-full md:flex-row md:items-center md:justify-between md:w-full ">
      <div className="text-center mt-10 p-6 sm:w-1/2 sm:text-left sm:px-0 sm:pl-10 md:w-1/2 ">
        <h2 className=" font-bold text-3xl w-full  ">
          ¿Querés conocer más de nosotros?
        </h2>
        <p className=" font-light text-md w-full my-4 mb-6 md:mb-10 ">
        ¡Nos encanta que quieras saber más sobre nosotros! Si deseas obtener más información acerca de nuestra empresa y los servicios que ofrecemos, no dudes en ponerte en contacto con nosotros.
        </p>
      </div>
      <a
      className="px-16 mb-20 md:mb-0 md:px-0"
        href="http://api.whatsapp.com/send?phone=542644823420"
        target="_blank"
      >
         <button
        className=" w-full sm:w-1/2 md:w-[282px] md:mr-10
        text-center font-semibold py-4 px-6 
        bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
        rounded-lg
        "
      >
        Contacto
      </button>
      </a>
    </section>
  );
}
