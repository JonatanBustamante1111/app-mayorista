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
  onSnapshot
} from "firebase/firestore";

import AgregarProveedor from "../../components/admin/AgregarProveedor";
import BorrarProveedor from "../../components/admin/BorrarProveedor";
import { useNavigate } from "react-router-dom";
import CardProveedor from "../../components/admin/CardProveedor";
import AumentarPrecioPorProvedores from "../../components/admin/AumentarPrecioPorProveedor";

const Proveedores = () => {
  const [busqueda, setBusqueda] = useState("");
  const [proveedoresBuscados, setProveedoresBuscados] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [id, setId] = useState("");
  const [cant, setCant] = useState([]);
  const [modalTwo,setModalTwo] = useState(false)
  const navigate = useNavigate();


  const consultarProveedor = () => {
    return onSnapshot(collection(db, "proveedores"), (data) => {
      setProveedores(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }
  
  useEffect(() => {
    const unsubscribe = consultarProveedor();
    return () => unsubscribe();
  }, []);

  useEffect(() => {

    if (cant.length < proveedores.length) {
      // Agrega el siguiente número consecutivo a `cant`
      setCant([...cant, cant.length]);
    }
  }, [cant,proveedores.length]);

  const buscarProveedores = (e) => {
    e.preventDefault();
    const buscar = proveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProveedoresBuscados(buscar);
  };

  const eliminarProveedor = async (id) => {
    const documento_A_Eliminar = doc(db, "proveedores", id);
    await deleteDoc(documento_A_Eliminar);

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
    <main className='w-[75%] ml-[25%]'>
      {/* permite abrir y cerrar el modal para agregar proveedores */}
      {modal && (
        <AgregarProveedor
          setModal={setModal}
          proveedores={proveedores}
          consultarProveedor={consultarProveedor}
        />
      )}
        {
        modalTwo && <AumentarPrecioPorProvedores setModalTwo={setModalTwo} />
      }
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
          <div className=" flex  items-center gap-x-1 text-blanco text-xl font-medium ">
            <img className="mx-2" src={'https://i.ibb.co/2NnBDwM/price-change.png'} alt="" />
            <button onClick={ () => {
              setModalTwo(true)
             }}>
             Aumentar precio
            </button>
          </div>
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
          <article className="flex flex-col   border-b last:border-none border-blanco w-[90%] mx-auto py-5 h-3/4 overflow-auto">
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
              ? proveedoresBuscados.map((proveedor,i) => (
                  <CardProveedor
                    key={proveedor.id}
                    setId={setId}
                    setModal2={setModal2}
                    proveedor={proveedor}
                    cant={cant[i]+1}
                  />
                ))
              : proveedores.map((proveedor,i) => (
                  <CardProveedor
                    key={proveedor.id}
                    setId={setId}
                    setModal2={setModal2}
                    proveedor={proveedor}
                    cant={cant[i]+1}
                  />
                ))
              }
          </article>
    </main>
  );
};
export default Proveedores;
