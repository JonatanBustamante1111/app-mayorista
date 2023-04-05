import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Card({ producto, eliminarProducto }) {

  const location = useLocation()

  const { nombre, precio, imagen, categoria, descripcion, id } = producto
  return (
    <Link to={`/producto/${id}`}>
    <div className='flex  flex-col justify-around w-52 sm:w-60 border-none outline-none bg-transparent rounded-xl transition-all duration-300 shadow-lg '>
      <img src={imagen} className='h-60 w-full object-cover rounded-xl' alt={`Imagen de ${nombre}`} />
      <div className='flex flex-col justify-around gap-y-1 items-start py-3'>
        <h3 className='font-bold text-secundario text-lg  '>{nombre}</h3>
        <p className='font-semibold text-2xl text-blanco'>${precio}</p>
        {
          location.pathname === '/admin'
            ? <div className='flex justify-end items-center w-full text-2xl gap-x-7 px-3'>
                <button onClick={() => eliminarProducto(id)} className='text-red-500 '><ion-icon name="trash-sharp"></ion-icon></button>
                <Link to={`/admin/editarproducto/${id}`} className=' text-cyan-500'><ion-icon name="pencil-sharp"></ion-icon></Link>
              </div>
            : ''
        }
      </div>
    </div>
    </Link>
  )
}
