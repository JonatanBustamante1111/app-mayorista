import React, { useState, useEffect } from "react";
import { db } from "../utils/firebaseconfig";
import Swal from "sweetalert2";
import { provedores } from "../utils/provedores";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { writeBatch } from "firebase/firestore";

const Provedores = () => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [provedorSeleccionado, setProvedorSeleccionado] = useState("");


  const handleChangeProvedor = (e) => {
    setProvedorSeleccionado(e.target.value);
  };

  const actualizarPrecio = async () => {
    const productosRef = collection(db, "productos");
    const productosQuery = provedorSeleccionado
      ? query(productosRef, where("provedor", "==", provedorSeleccionado))
      : collection(db, "productos");
    const productosSnapshot = await getDocs(productosQuery);

    const batch = writeBatch(db);
    productosSnapshot.forEach((doc) => {
      const producto = doc.data();
      const precioAnterior = producto.precio;
      const nuevoPrecio = Math.round(precioAnterior * (1 + porcentaje / 100)); // Redondear sin decimales
      const productoRef = doc.ref;
      batch.update(productoRef, { precio: nuevoPrecio });
    });
  
    await batch.commit();

    Swal.fire({
      title: "Actualización de precios",
      text: "Los precios se han actualizado correctamente",
      icon: "success",
    });
   setPorcentaje('');
  };

  return (
    <div className="relative left-2/4">
      <div className="w-1/4 mt-40 ml-10">
        <div className="mb-8 flex flex-col gap-y-2">
          <label
            className="text-blanco font-semibold text-base"
            htmlFor="categoria"
          >
            Elija el provedor:
          </label>
          <select
            name="provedor"
            id="provedor"
            className=" p-3 bg-terciario text-center border-secundario border rounded-xl text-blanco focus:outline-none bg-inherit w-full"
            value={provedorSeleccionado}
            onChange={handleChangeProvedor}
          >
            <option value="">-- Seleccione el provedor --</option>
            {provedores.map((provedor, i) => (
              <option key={i} value={provedor.label}>
                {provedor.label}
              </option>
            ))}
          </select> 
        </div>
        <div className="flex flex-col">
        <label
            className="text-blanco font-semibold text-base"
            htmlFor="porcentaje"
          >
            Elija el porcentaje:
          </label>
          <input
            placeholder="Ingrese el porcentaje"
            value={porcentaje}
            type="number"
            onChange={(e) => setPorcentaje(e.target.value)}
            className=" grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit mb-5 text-secundario text-center"
          />
          <button
            onClick={actualizarPrecio}
            className=" w-[90%] mx-auto
                text-center font-semibold py-4 px-6
                bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                rounded-lg
                "
          >
            Aumentar precio
          </button>
        </div>
      </div>
    </div>
  );
};
export default Provedores;
