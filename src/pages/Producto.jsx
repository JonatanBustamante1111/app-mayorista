import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseconfig";
import ItemCount from "../components/ItemCount";

export default function Producto() {
  const [itemCount, setItemCount] = useState(0);
  const { cart } = useContext(CartContext);
  const [dato, setDato] = useState({});
  const { productoId } = useParams();
  
  const { descripcion, imagen, nombre, precio, stock, categoria, subcategoria } = dato;
  
  async function getProducto() {
    const docRef = doc(db, "productos", productoId);
    const result = await getDoc(docRef);

    if (result.exists()) {
      return {
        id: productoId,
        ...result.data(),
      };
    } else {
      console.log("no such document");
    }
  }
  useEffect(() => {
    getProducto()
      .then((result) => setDato(result))
      .catch((err) => console.log(err));
  }, []);

  function onAdd(cantidad) {
    cart.agregarCarrito(dato, cantidad);
    setItemCount(dato, cantidad)
  }

  return (
    <main className="
    w-full flex-col mx-auto flex items-start justify-between sm:items-center 
    md:w-[90%] md:my-36 md:flex-row gap-y-8
    lg:w-[80%]  lg:justify-evenly 
    ">
      <section>
        <h2 className=" text-sm font-medium text-blanco py-5">{`${categoria} / ${subcategoria} `}{''} / <span className="text-secundario"> {nombre}</span></h2>
        <img
          src={imagen}
          className="h-[262px] w-[360px] lg:w-[588px] lg:h-[400px] lg:rounded-xl object-cover "
          alt={`Imagen de ${nombre}`}
        />
      </section>
      <section className=" w-[358px] lg:w-[500px] flex flex-col justify-center items-start p-4 gap-y-5 md:mt-10">
        <h2 className="md:text-3xl lg:text-4xl  font-monsterrat text-secundario font-bold">{`${nombre}`}</h2>
        <p className="font-normal text-gray-300">{`${descripcion}`}</p>
       { stock > 1 
        ?<p className="font-semibold text-blanco">{`${stock} Disponible/s`}</p> 
        :<p className="font-semibold text-rojo">Sin stock</p> 
        }
        <h3 className="text-2xl text-blanco font-bold ">${precio}</h3>
        {
          stock > 0 

          ? itemCount === 0
              ? (<ItemCount initial={itemCount} stock={+stock} onAdd={onAdd} />)
              : (
                <Link
                  to="/carrito"
                  className="lg:w-[300px]
                  bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600
                  py-4 px-6 text-sm text-primario font-bold
                  rounded-lg  "
                >
                  Ver carrito
                </Link>
              )
        :''
        }
      </section>
    </main>
  );
}
