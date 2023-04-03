import React from 'react'
import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <main className='w-full h-full grid gap-y-4 md:gap-0 md:grid-cols-2 items-center justify-center md:mt-10 lg:mt-0'>
      <section className=' flex flex-col place-items-center md:items-start gap-y-4 md:gap-0 md:pl-10'>
        <h1 className=' 
          w-[328px] text-center h-[177px] leading-[59px] text-white text-5xl
          md:text-start 
          lg:w-[518px] lg:h-[294px] lg:text-[82px] lg:leading-[97px] font-bold  '>
          Accesorios con estilo {''} {''}
          <span
            className='bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent'>
            único
          </span>
        </h1>
        <p className=' 
        h-[136px] w-[328px] leading-[23px] text-center font-montserrat font-normal text-base
        md:text-start lg:w-[588px] lg:h-32 lg:leading-8 text-white'>
          Somos un mayorista que ofrece una amplia variedad de productos y accesorios de calidad que atraen la buena suerte y la prosperidad, para que puedas hacer crecer tu negocio, alcanzar tus objetivos y que tus clientes luzcan con estilo y elegancia.
        </p>
        <Link
          to='/productos'
          className='
            bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
            py-4 px-6 rounded-lg font-semibold text-base'>
          Ver Productos
        </Link>
      </section>
      <section className='w-[374px] h-[428px]  md:w-[600px] md:h-[705px] xl:w-[671px] xl:h-[768px] -z-10'>
        <img
          src="https://i.ibb.co/4THzyVG/image-3-1.png"
          alt="Mina Facherarda"
          className='w-full h-full transform scale-x-[-1] scale-y-[1]  '
        />
      </section>
      <section className="hidden md:block w-full h-[150px] bg-[#F7B32B] col-span-2"></section>

    </main>
  )
}
