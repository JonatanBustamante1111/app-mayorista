import React, { useState, useEffect } from "react";
import { db } from "../utils/firebaseconfig";
import Swal from "sweetalert2";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { writeBatch } from "firebase/firestore";
import AgregarProveedor from "../components/AgregarProveedor";

const Provedores = () => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [busqueda, setBusqueda] = useState("");
  const [provedorSeleccionado, setProvedorSeleccionado] = useState("");
  const [proveedores, setProveedores] = useState({});
  const [modal,setModal] = useState(false)

  const handleChangeProvedor = (e) => {
    setProvedorSeleccionado(e.target.value);
  };

  const consultarProveedor = async () => {
    const producto = collection(db, "proveedores")
    const querySnapshot = await getDocs(producto)
    const datos = querySnapshot.docs.map(doc => doc.data())
    setProveedores(datos)
    console.log(datos)
  }
  
  useEffect(() => {
    consultarProveedor()
  }, [])
 
  // actualiza precios por proveedores
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
    <main class="h-full absolute flex flex-col left-1/4">
      {
        modal && <AgregarProveedor setModal={setModal} proveedores={proveedores} />
      }
    <section className='grid grid-rows-2'>
        <article className="flex items-center justify-between  my-8 mx-4">
          <form
            className=" relative w-1/4 flex flex-col"
          >
            <input
              type="search"
              className="
                    bg-transparent font-normal text-xs p-2 border-[1px] border-secundario 
                    rounded-lg text-blanco focus:outline-none
                  "
              placeholder="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <div className="absolute text-blanco right-2 top-2">
              <button type="submit">
                <ion-icon name="search"></ion-icon>
              </button>
            </div>
          </form>
          
          <div className=" flex  items-center gap-x-1 text-secundario text-xl font-medium ">
          <ion-icon name="add-sharp"></ion-icon>
            <button onClick={ () => setModal(true)}>
              Nuevo Proveedor
            </button>
          </div>
        </article>
          <article className="w-[90%] mx-auto grid grid-cols-[2fr,4fr,4fr,1fr] gap-x-10 place-items-start self-center">
            <p className="text-lg font-medium text-blanco">Id</p>
            <p className="text-lg font-medium text-blanco">Nombre</p>
            <p className="text-lg font-medium text-blanco">Registro</p>
            <p className="text-lg font-medium text-blanco">Acciones</p>
          </article>
      </section>
      <section className="flex flex-col  h-3/4 overflow-auto">
      <article className=" border-b last:border-none border-blanco w-[90%] mx-auto py-5">
        {/* {modal && <BorrarProducto eliminarProducto={eliminarProducto} setModal={setModal} id={id}/>} */}
        <div className="grid grid-cols-[2fr,4fr,4fr,1fr] gap-x-4 rounded-xl place-items-center ">
            <h3 className="font-bold  text-blanco text-center text-lg">{''}</h3>
            <p className="font-medium text-xl text-center text-blanco">{''}</p>
            <p className="font-medium text-xl text-center text-blanco">{''}</p>
            <div className="flex justify-end items-center  text-center text-2xl gap-x-7 px-3">
              <button
                className="text-rojo w-full"
              >
                <ion-icon name="trash-sharp"></ion-icon>
              </button>
            </div>
        </div>
        </article>
      </section>
      {/* <section className="w-1/4 mt-40 ml-10 ">
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
      </section> */}
    </main>
  );
};
export default Provedores;
