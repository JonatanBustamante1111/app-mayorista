import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactoInicio() {
  return (
    <section className=" flex flex-col gap-16 w-full bg-blanco col-span-2 sm:flex-row sm:gap-0 sm:w-full md:flex-row md: justify-between md:w-full">
    <div className="text-center mt-10 p-6 sm:w-1/2 sm:text-left sm:px-0 sm:pl-10 md:w-1/2  ">
      <h2 className=" font-bold text-3xl w-full md:my-4 ">¿Aún tenes dudas?</h2>
      <p className=" font-light text-md w-full my-4 mb-14 ">
      Estamos aquí para ayudarte en todo lo que necesites. Si tienes alguna duda o consulta, no dudes en contactarnos y uno de nuestros representantes te brindará la información necesaria de manera clara y concisa. 
      </p>
      <a href="https://bit.ly/3NWSvtl" target="_blank">
      <button
        className=" w-full sm:w-1/2 md:w-[282px]
        text-center font-semibold py-4 px-6 
        bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
        rounded-lg
        "
      >
        Contacto
      </button>
      </a>

    </div>
    <div className="text-center  md:w-1/2">
      <img
        className="mx-auto h-full"
        src="https://i.ibb.co/tD3S1jj/image-14-min.png"
        alt=""
      />
    </div>
  </section>
  )
}
