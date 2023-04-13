import React from "react";
import { Link, useLocation } from "react-router-dom";
import AdminEditarProducto from '../pages/AdminEditarProducto'

export default function Card({ producto, eliminarProducto, setIdProducto }) {
  const location = useLocation();
  const { nombre, precio, imagen, categoria, descripcion, id } = producto;

  if (location.pathname === "/admin") {
    return (
      <div className=" border-b-2 border-secundario py-2">
      <div className="flex flex-row outline-none bg-transparent rounded-xl transition-all duration-300 shadow-lg gap-20">
        <img
          src={imagen}
          className="h-30 w-1/4 object-cover rounded-xl"
          alt={`Imagen de ${nombre}`}
        />
        <div className="flex flex-row items-center gap-10">
          <h3 className="font-bold text-secundario text-lg">{nombre}</h3>
          <p className="font-semibold text-2xl text-blanco">${precio}</p>
          <div className="flex justify-end items-center w-full text-2xl gap-x-7 px-3">
            <button
              onClick={() => eliminarProducto(id)}
              className="text-red-500"
            >
              <ion-icon name="trash-sharp"></ion-icon>
            </button>
            <button onClick={() => setIdProducto(id)} className=" text-cyan-500">
              <ion-icon name="pencil-sharp"></ion-icon>
            </button>
          </div>
        </div>
      </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col  border-none outline-none bg-transparent rounded-xl transition-all duration-300 shadow-lg p-6 ">
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
      </div>
    );
  }
}
