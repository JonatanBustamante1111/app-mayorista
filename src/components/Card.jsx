import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BorrarProducto from "./BorrarProducto";
import { CartContext } from "../context/CartContext";

export default function Card({ eliminarProducto, producto, setIdProducto }) {
  const [modal, setModal] = useState(false);
  const { cart } = useContext(CartContext);
  const { nombre, precio, imagen, id, stock } = producto;

  const location = useLocation();
  const cantidad = 1;
  // funcion que guarda los productos en el carrito
  function onAdd() {
    cart.agregarCarrito(producto, cantidad);
    console.log('funciona')
  }

  if (location.pathname === "/admin") {
    return (
      <article className=" border-b last:border-none border-blanco w-[90%] mx-auto py-5">
        {modal && (
          <BorrarProducto
            eliminarProducto={eliminarProducto}
            setModal={setModal}
            id={id}
          />
        )}
        <div className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr] gap-x-4 rounded-xl place-items-center ">
          <img
            src={imagen}
            className="object-cover rounded-xl"
            alt={`Imagen de ${nombre}`}
          />
          <h3 className="font-bold  text-blanco text-center text-lg">
            {nombre}
          </h3>
          <p className="font-medium text-xl text-center text-blanco">{stock}</p>
          <p className="font-semibold  text-2xl text-center text-blanco">
            ${precio}
          </p>
          <div className="flex justify-end items-center  text-center text-2xl gap-x-7 px-3">
            <button onClick={() => setModal(true)} className="text-rojo w-full">
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
    return stock > "0" ? (
      <article className="flex flex-col transition-all duration-300">
        <Link
          to={`/producto/${id}`}
          className="mt-5 w-full flex flex-col items-center uppercase font-bold text-white text-lg  cursor-pointer"
        >
          <img
            src={imagen}
            className="h-40 w-full object-cover  rounded-t-xl  "
            alt={`Imagen de ${nombre}`}
          />
        </Link>
        <div className=" flex flex-row items-center justify-between  bg-terciario rounded-b-xl ">
          <div className="ml-4 rounded-xl">
            <h3 className="font-bold text-secundario text-lg">{nombre}</h3>
            <p className="font-semibold text-2xl text-blanco">${precio}</p>
          </div>
          <div>
            <Link to={"/carrito"}>
              <div className=" w-[72px] h-[81px] bg-secundario flex flex-row items-center  justify-center ">
                <img
                  onClick={() => onAdd()}
                  className="w-[30px] h-[30px] rounded-xl"
                  src={"https://i.ibb.co/Y3GJLVy/shopping-cart.png"}
                  alt=""
                />
              </div>
            </Link>
          </div>
        </div>
      </article>
    ) : (
      <article className="flex flex-col transition-all duration-300 ">
        <div className="w-[92px] h-[41px] bg-terciario flex flex-row items-center justify-center absolute rounded-md">
            <h3 className=" text-sm font-light  font-monsterrat text-blanco">Agotado</h3>
        </div>
        <Link
          to={`/producto/${id}`}
          className="mt-5 w-full flex flex-col items-center uppercase font-bold text-white text-lg  cursor-pointer"
        >
          <img
            src={imagen}
            className="h-40 w-full object-cover  rounded-t-xl  "
            alt={`Imagen de ${nombre}`}
          />
        </Link>
        <div className=" flex flex-row items-center justify-between  bg-terciario rounded-b-xl ">
          <div className="ml-4 rounded-xl">
            <h3 className="font-bold text-secundario text-lg">{nombre}</h3>
            <p className="font-semibold text-2xl text-blanco">${precio}</p>
          </div>
          <div>
              <div className=" w-[72px] h-[81px] bg-secundario flex flex-row items-center  justify-center ">
                <img
                  className="w-[30px] h-[30px] rounded-xl"
                  src={"https://i.ibb.co/Y3GJLVy/shopping-cart.png"}
                  alt=""
                />
              </div>
          </div>
        </div>
      </article>
    );
  }
}
