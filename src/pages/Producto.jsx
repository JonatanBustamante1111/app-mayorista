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
    <div className="product-view">
      <img
        src={imagen}
        className="h-60 w-full object-cover rounded-xl"
        alt={`Imagen de ${nombre}`}
      />

      <div>
        <h1>{`${nombre}`}</h1>
        <p>{`${descripcion}`}</p>
        <p>{`Cantidad disponible: 2`}</p>
        <h3>{`Precio: ${precio}`}</h3>
        {itemCount === 0 
        ? ( <ItemCount initial={itemCount} onAdd={onAdd} /> ) 
        : (
          <Link to="/carrito">
            <button>Ver carrito</button>
          </Link>
          )
        }
      </div>
    </div>
  );
}
