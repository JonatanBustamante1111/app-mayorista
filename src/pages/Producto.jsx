import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseconfig";

export default function Producto() {
  const {cart} = useContext(CartContext);
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
  const { descripcion, imagen, nombre, precio,id } = dato;
  function agregarAlCarrito() {
    cart.agregarCarrito(dato);
  }

  return (
    <div className="product-view">
      <img
        src={imagen}
        className="h-60 w-full object-cover rounded-xl"
        alt={`Imagen de ${nombre}`}
      />

      <div className="product-info">
        <h1>{`${nombre}`}</h1>
        <p>{`${descripcion}`}</p>
        <h3>{`Precio: ${precio}`}</h3>  
        <p>{`Cantidad disponible: ${nombre}`}</p>
        <button onClick={() => agregarAlCarrito()}>Agregar al carrito</button>
      </div>
    </div>
  );
}
