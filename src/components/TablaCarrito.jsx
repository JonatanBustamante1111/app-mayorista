import React from "react";

export default function TablaCarrito({ producto }) {
  const { imagen, nombre, precio } = producto;
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
        <button className="text-red-600">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </td>
    </tr>
  );
}
