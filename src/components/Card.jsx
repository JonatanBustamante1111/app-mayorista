import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Card({ producto, eliminarProducto }) {

  const location = useLocation()

  const { nombre, precio, imagen, categoria, descripcion, id } = producto
  return (
    <div className='flex  flex-col justify-around w-52 sm:w-60  bg-white rounded-xl transition-all duration-300 shadow-lg '>
      <img src={imagen} className='h-60 w-full object-cover rounded-xl' alt={`Imagen de ${nombre}`} />
      <div className='flex flex-col justify-around gap-y-1 items-center py-3'>
        <h3 className='font-semibold text-slate-800 text-sm uppercase '>{nombre}</h3>
        <p className='font-semibold text-lg text-slate-700'>${precio}</p>
        {
          location.pathname === '/admin'
            ? <div className='flex justify-end items-center w-full text-2xl gap-x-7 px-3'>
                <button onClick={() => eliminarProducto(id)} className='text-red-500 '><ion-icon name="trash-sharp"></ion-icon></button>
                <Link to={`/admin/editarproducto/${id}`} className=' text-cyan-500'><ion-icon name="pencil-sharp"></ion-icon></Link>
              </div>
            : <Link to={'/cart'} onClick={() => agregarCarrito(id)} className='py-1 px-2 bg-purple-800 rounded-lg text-white font-semibold uppercase'>agregar a carrito</Link>
        }
      </div>
    </div>
  )
}
