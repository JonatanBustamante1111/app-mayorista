import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Card({ producto, eliminarProducto }) {
  const location = useLocation();
  const { nombre, precio, imagen, categoria, descripcion, id } = producto;

  if (location.pathname === "/admin") {
    return (
      <div className=" border-b-2 border-secundario py-2 w-full">
      <div className="flex flex-row  items-center outline-none bg-transparent rounded-xl transition-all duration-300 shadow-lg gap-20 w-full">
        <img
          src={imagen}
          className="h-30 w-1/4 object-cover rounded-xl"
          alt={`Imagen de ${nombre}`}
        />
          <h3 className="font-bold w-1/4 text-secundario text-center text-lg">{nombre}</h3>
          <p className="font-semibold  w-1/4 text-2xl text-center text-blanco">${precio}</p>
          <div className="flex justify-end items-center w-1/4  text-center text-2xl gap-x-7 px-3">
            <button
              onClick={() => eliminarProducto(id)}
              className="text-red-500 w-full"
            >
              <ion-icon name="trash-sharp"></ion-icon>
            </button>
            <Link to={``} className=" text-cyan-500 w-full">
              <ion-icon name="pencil-sharp"></ion-icon>
            </Link>
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
