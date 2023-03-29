import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseconfig";
import ItemCount from "../components/ItemCount";

export default function Producto() {
  const [itemCount,setItemCount] = useState(0);
  const { cart } = useContext(CartContext);
  const [dato, setDato] = useState({});
  const { productoId } = useParams();

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
  const { descripcion, imagen, nombre, precio } = dato;

  function onAdd(cantidad) {
    cart.agregarCarrito(dato,cantidad);
    setItemCount(dato,cantidad)
  }

  return (
    <main className=" grid grid-rows-2 mx-auto w-[80%]  md:grid-cols-2 md:grid-rows-1 py-32">
      <section>
        <img
          src={imagen}
          className="h-60  object-cover rounded-xl"
          alt={`Imagen de ${nombre}`}
        />
      </section>
      <section>
        <div className="">
          <h2 className="text-4xl pb-8 font-monsterrat text-indigo-900 font-medium">{`${nombre}`}</h2>
          <p className="font-medium text-slate-500">{`${descripcion}`}</p>
          <p className="font-bold text-slate-700 py-3">{`2 Disponible/s`}</p>
          <h3 className="text-3xl text-slate-800 font-semibold pb-5">${precio}</h3>
          {itemCount === 0 
          ? ( <ItemCount initial={itemCount} onAdd={onAdd} /> ) 
          : (
            <Link  
              to="/carrito"
              className="py-2 px-3 my-10 bg-indigo-600 text-white font-semibold rounded-lg "  
            >
              Ver carrito
            </Link>
            )
          }
        </div>
      </section>
    </main>
  );
}
