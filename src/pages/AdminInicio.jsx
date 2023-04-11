import React, { useState, useEffect } from "react";
import Card from "../components/Card";
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
} from "firebase/firestore";
import AdminNuevoProducto from "../components/AdminNuevoProducto";


export default function AdminInicio() {

  const [productos, setProductos] = useState([]);
  // Estados para manejar las busquedas de los productos
  const [busqueda, setBusqueda] = useState('')
  const [productosBuscados, setProductosBuscados] = useState([])

  const [modalAbierto, setModalAbierto] = useState(false);

  const consultarProductos = async () => {
    const data = await getDocs(collection(db, "productos"));
    setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    consultarProductos();
  }, []);

  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
  };
  const eliminarProducto = (id) => {
    const documento_A_Eliminar = doc(db, "productos", id);
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir el cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(documento_A_Eliminar)
          .then(() => {
            consultarProductos();
            Swal.fire(
              "Eliminado!",
              "El producto fue eliminado correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error eliminando el documento: ", error);
          });
      }
    });
  };
  const buscarProductos = (e) => {
    e.preventDefault()
    const buscar = productos.filter(prod => prod.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    setProductosBuscados(buscar)
  }

  return (
    <main className="h-full absolute flex flex-col left-1/4">
      { (modalAbierto) && <AdminNuevoProducto cerrarModal={cerrarModal} modalAbierto={modalAbierto}/>
      }
      <div className='flex items-center justify-between  m-8 '>
              <form
                className=" relative w-1/4 flex flex-col"
                onSubmit={buscarProductos}
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
              <div className=" flex flex-row items-center gap-x-2 text-secundario text-lg font-medium   ">
            <button to=""  onClick={abrirModal}>
          <ion-icon name="add"></ion-icon>
          Nuevo Producto
        </button>
      </div>
      </div>
      <section className="flex flex-col gap-10 ml-28 h-3/4 overflow-auto">
  {productosBuscados.length > 0
    ? productosBuscados.map((producto) => (
        <Card
          key={producto.id}
          producto={producto}
          eliminarProducto={eliminarProducto}
        />
      ))
    : productos.map((producto) => (
        <Card
          key={producto.id}
          producto={producto}
          eliminarProducto={eliminarProducto}
        />
      ))}
</section>
    </main>
  );
}