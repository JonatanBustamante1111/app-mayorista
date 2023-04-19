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

import AgregarProveedor from "../components/AgregarProveedor";

const Provedores = () => {
  const [busqueda, setBusqueda] = useState("");
 
  const [proveedores, setProveedores] = useState({});
  const [modal,setModal] = useState(false)

  const consultarProveedor = async () => {
    const producto = collection(db, "proveedores")
    const querySnapshot = await getDocs(producto)
    const datos = querySnapshot.docs.map(doc => doc.data())
    setProveedores(datos)
  }
  
  useEffect(() => {
    consultarProveedor()
  }, [])
 
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
              Nuevo proveedor
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
    </main>
  );
};
export default Provedores;
