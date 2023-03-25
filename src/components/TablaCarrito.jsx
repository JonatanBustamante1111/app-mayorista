import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function TablaCarrito({ producto }) {
  const { imagen, nombre, precio,id } = producto;
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
      <td>`2`</td>
      <td>`${precio}`</td>
      <td>`${precio * 2}`</td>
      <td>
        <button onClick={() => eliminarProducto(id)} className="text-red-600">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
}
