import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BorrarProducto from "./BorrarProducto";

export default function Card( {eliminarProducto,producto, setIdProducto }) {
  const [modal, setModal] = useState(false)
  
  const location = useLocation();

  const { nombre, precio, imagen, id , stock } = producto;

  if (location.pathname === "/admin") {
    return (
      <article className=" border-b last:border-none border-blanco w-[90%] mx-auto py-5">
        {modal && <BorrarProducto eliminarProducto={eliminarProducto} setModal={setModal} id={id}/>}
        <div className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr] gap-x-4 rounded-xl place-items-center ">
          <img
            src={imagen}
            className="object-cover rounded-xl"
            alt={`Imagen de ${nombre}`}
          />
            <h3 className="font-bold  text-blanco text-center text-lg">{nombre}</h3>
            <p className="font-medium text-xl text-center text-blanco">{stock}</p>
            <p className="font-semibold  text-2xl text-center text-blanco">${precio}</p>
            <div className="flex justify-end items-center  text-center text-2xl gap-x-7 px-3">
              <button
                onClick={ () => setModal(true) }
                className="text-rojo w-full"
              >
                <ion-icon name="trash-sharp"></ion-icon>
              </button>
              <button onClick={() => setIdProducto(id)} className=" text-blanco">
                <ion-icon name="pencil-sharp"></ion-icon>
              </button>
            </div>
        </div>
        </article>
    );
  } else {
    return (
      <article className="flex flex-col  border-none outline-none bg-transparent rounded-xl transition-all duration-300 shadow-lg p-6 ">
        <Link
          to={`/producto/${id}`}
          className="mt-5 w-full flex flex-col items-center uppercase font-bold text-white text-lg py-2 cursor-pointer"
        >
          <img
            src={imagen}
            className="h-30 w-full object-cover rounded-xl "
            alt={`Imagen de ${nombre}`}
          />
           </Link>
          <div className="flex flex-col gap-5">
            <h3 className="font-bold text-secundario text-lg">{nombre}</h3>
            <p className="font-semibold text-2xl text-blanco">${precio}</p>
          </div>
      </article>
    );
  }
}
