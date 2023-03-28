import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function TablaCarrito({id,imagen,nombre,cantidad,precio}) {
  const {cart} = useContext(CartContext)
  const {eliminarProducto} = cart;  
  return (
    <tr>
      <td>
        <img
          src={imagen}
          className="h-60 w-full object-cover rounded-xl"
          alt={`Imagen de ${nombre}`}
        />
      </td>
      <td>{cantidad}</td>
      <td>${precio}</td>
      <td>${cantidad * precio}</td>
      <td>
        <button onClick={() => eliminarProducto(id)} className="text-red-600">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
}
