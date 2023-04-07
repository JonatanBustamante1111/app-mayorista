import React from 'react'
import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <main className='gap-y-4 md:gap-0 md:grid md:grid-cols-2 items-center justify-center md:mt-10 lg:mt-0'>
      <section className=' flex flex-col place-items-center md:items-start gap-y-4 md:gap-0 md:pl-10'>
        <h1 className=' 
          w-[328px] mt-10 text-center h-[177px] leading-[59px] text-white text-5xl
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
        md:text-start lg:w-[588px] lg:h-32 lg:leading-8 text-white mb-16'>
          Somos un mayorista que ofrece una amplia variedad de productos y accesorios de calidad que atraen la buena suerte y la prosperidad, para que puedas hacer crecer tu negocio, alcanzar tus objetivos y que tus clientes luzcan con estilo y elegancia.
        </p>
        <Link
          to='/productos'
          className='
            bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
            py-4 px-6 rounded-lg font-semibold text-base mb-10'>
          Ver Productos
        </Link>
      </section>
      <section className='w-full h-[428px]  md:h-[705px] xl:h-[768px] -z-10'>
        <img
          src="https://i.ibb.co/4THzyVG/image-3-1.png"
          alt="Mina Facherarda"
          className='w-full h-full transform scale-x-[-1] scale-y-[1]  '
        />
      </section>
      <section className=" flex flex-col p-10 gap-16 w-full bg-blanco col-span-2 md:flex-row justify-between md:w-full">
        <div className='text-center  md:w-1/2'>
          <img className='mx-auto' src="./public/local_mall.png" alt="" />
          <h2 className=' font-bold text-3xl my-2 md:my-4'>500+ productos</h2>
          <p className=' font-light text-sm my-2'>
          Al precio más económico y conveniente para tu negocio.
          </p>
        </div>
        <div className='text-center md:w-1/2'>
          <img className='mx-auto my-2' src="./public/local_shipping.png" alt="" />
          <h2 className=' font-bold text-3xl my-2 md:my-4'>Envío rápido y seguro</h2>
          <p className=' font-light text-sm my-2'>
          Dentro de la provincia y por toda la República Argentina.
          </p>
        </div>
      </section>
      <section className='flex flex-col p-10 gap-16 w-full col-span-2 '>
        <div className='w-full text-center'>
          <h2 className=' font-semibold text-3xl text-center text-blanco px-10 pt-20 mt-10 w-full'>¿Qué productos ofrecemos?</h2>
          <div className="w-16 font-monsterrat border-2 border-secundario font-medium  text-base my-6 mx-auto">
              </div>
        </div>
      </section>

    </main>
  )
}
