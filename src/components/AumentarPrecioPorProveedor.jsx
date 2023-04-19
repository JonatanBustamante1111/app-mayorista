import React, { useState, useEffect } from "react";
import { db } from "../utils/firebaseconfig";
import Swal from "sweetalert2";
import { collection, getDocs, query, where } from "firebase/firestore";
import { writeBatch } from "firebase/firestore";

const AumentarPrecioPorProvedores = ({setModalTwo}) => {
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
  const [porcentaje, setPorcentaje] = useState('');
  const [proveedores, setProveedores] = useState([]);
  
  const consultarProveedor = async () => {
    const producto = collection(db, "proveedores")
    const querySnapshot = await getDocs(producto)
    const datos = querySnapshot.docs.map(doc => doc.data().nombre)
    setProveedores(datos)
  }
  
  useEffect(() => {
    consultarProveedor()
  }, [])
  // actualiza precios por proveedores
  const actualizarPrecio = async () => {
    const productosRef = collection(db, "productos");
    const productosQuery = proveedorSeleccionado
      ? query(productosRef, where("proveedor", "==", proveedorSeleccionado))
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
    setPorcentaje("");
    setModalTwo(false)
    
  };

  return (
    <section className="bg-terciario z-20 w-full absolute left-[20%] top-[16%] sm:w-[75%] md:w-[660px] rounded-xl p-4">
           <div className="w-full flex justify-between items-center py-5 ">
        <h1 className="text-2xl text-blanco font-semibold  text-left  ">
          Aumentar precio productos
        </h1>
        <button className="text-blanco font-semibold text-3xl " onClick={ () => setModalTwo(false)}>
          <ion-icon name="close-sharp"></ion-icon>
        </button>
      </div>
      <div className="mb-8 flex flex-col gap-y-2">
        <label
          required  
          className="text-blanco font-semibold text-base"
          htmlFor="categoria"
        >
          Elija el proveedor:
        </label>
        <select
          required
          name="provedor"
          id="provedor"
          className=" p-3 bg-terciario text-center border-secundario border rounded-xl text-blanco focus:outline-none bg-inherit w-full"
          value={proveedorSeleccionado}
          onChange={ (e) => setProveedorSeleccionado(e.target.value)}
        >
          <option value="">-- Seleccione el proveedor --</option>
          {proveedores.map((proveedor, i) => (
            <option key={i} value={proveedor}>
              {proveedor}
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
          onClick={ actualizarPrecio}
          className=" w-[90%] mx-auto
                text-center font-semibold py-4 px-6
                bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                rounded-lg
                "
        >
          Aumentar precio
        </button>
      </div>
    </section>
  );
};

export default AumentarPrecioPorProvedores;
