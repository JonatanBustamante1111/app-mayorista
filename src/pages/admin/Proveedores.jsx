import React, { useState, useEffect } from "react";
import { db } from "../../utils/firebaseconfig";
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

import AgregarProveedor from "../../components/admin/AgregarProveedor";
import BorrarProveedor from "../../components/admin/BorrarProveedor";
import { useNavigate } from "react-router-dom";
import CardProveedor from "../../components/admin/CardProveedor";

const Proveedores = () => {
  const [busqueda, setBusqueda] = useState("");
  const [proveedoresBuscados, setProveedoresBuscados] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [id, setId] = useState("");

  const navigate = useNavigate();
  // // trae los proveedores de la base de datos
  const consultarProveedor = async () => {
    const data = await getDocs(collection(db, "proveedores"));
    setProveedores(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    consultarProveedor();
  }, []);

  //Busca proovedores en la base de datos
  const buscarProveedores = (e) => {
    e.preventDefault();
    const buscar = proveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProveedoresBuscados(buscar);
  };

  // Borrar proveedor
  const eliminarProveedor = (id) => {
    const documento_A_Eliminar = doc(db, "proveedores", id);
    deleteDoc(documento_A_Eliminar);

    Swal.fire({
      icon: "success",
      title: "Proveedor borrado",
    }).then((result) => {
      if (result.isConfirmed) {
        consultarProveedor();
        navigate("/admin/proveedores");
      }
    });
  };

  return (
    <main class="h-full absolute flex flex-col left-1/4">
      {/* permite abrir y cerrar el modal para agregar proveedores */}
      {modal && (
        <AgregarProveedor
          setModal={setModal}
          proveedores={proveedores}
          consultarProveedor={consultarProveedor}
        />
      )}
      <section className="grid grid-rows-2">
        <article className="flex items-center justify-between  my-8 mx-4">
          <form
            className=" relative w-1/4 flex flex-col"
            onSubmit={buscarProveedores}
          >
            <input
              type="search"
              className="
                    bg-transparent font-normal text-xs p-2 border-[1px] border-secundario 
                    rounded-lg text-blanco focus:outline-none
                  "
              placeholder="Buscar por nombre"
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
            <button onClick={() => setModal(true)}>Nuevo proveedor</button>
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
          {modal2 && (
            <BorrarProveedor
              key={id}
              eliminarProveedor={eliminarProveedor}
              setModal2={setModal2}
              id={id}
            />
          )}

          {/* renderiza los proveedores */}
          {proveedoresBuscados.length > 0
            ? proveedoresBuscados.map((proveedor) => (
                <CardProveedor
                  key={proveedor.id}
                  setId={setId}
                  setModal2={setModal2}
                  proveedor={proveedor}
                />
              ))
            : proveedores.map((proveedor) => (
                <CardProveedor
                  key={proveedor.id}
                  setId={setId}
                  setModal2={setModal2}
                  proveedor={proveedor}
                />
              ))
            }
        </article>
      </section>
    </main>
  );
};
export default Proveedores;
