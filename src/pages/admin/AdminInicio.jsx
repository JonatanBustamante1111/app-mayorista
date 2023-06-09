import React, { useState, useEffect } from "react";
import Card from "../../components/reutilizables/Card";
import { db } from "../../utils/firebaseconfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import AdminNuevoProducto from "../../components/admin/AdminNuevoProducto";
import AdminEditarProducto from "./AdminEditarProducto";


export default function AdminInicio() {
  const [proveedores,setProveedores] = useState([])
  const [productos, setProductos] = useState([]);
  // Estados para manejar las busquedas de los productos
  const [busqueda, setBusqueda] = useState('')
  const [productosBuscados, setProductosBuscados] = useState([])

  const [modal, setModal] = useState(false)
  const [idProducto, setIdProducto] = useState(null)

  // Read Products  
  const consultarProductos = async () => {
    const data = await getDocs(collection(db, "productos"));
    setProductos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    consultarProductos();
  }, [productos]);

// trae los proveedores de la base de datows
  const consultarProveedor = async () => {
    const producto = collection(db, "proveedores")
    const querySnapshot = await getDocs(producto)
    const datos = querySnapshot.docs.map(doc => doc.data().nombre)
    setProveedores(datos)
  }

  useEffect(() => {
    consultarProveedor()
  }, [proveedores])


  // Borra productos de la base de datos

  const eliminarProducto = (id) => {
    const documento_A_Eliminar = doc(db, "productos", id);
    deleteDoc(documento_A_Eliminar)
    consultarProductos();
  };

//Busca productos en la base de datos 
  const buscarProductos = (e) => {
    e.preventDefault()
    const buscar = productos.filter(prod => prod.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    setProductosBuscados(buscar)
  }
  // abre y cierra el modal
  const handleModal = () => {
    setIdProducto(null)
    setModal(!modal)
  }

  return (
    <main className="w-[75%] ml-[25%]">
      {
        idProducto !== null && <AdminEditarProducto idProducto={idProducto} setIdProducto={setIdProducto}/>
      }
      {
        modal && <AdminNuevoProducto handleModal={handleModal} proveedores={proveedores} setProveedores={setProveedores} />
      }
      <section className='grid grid-rows-2'>
        <article className="flex items-center justify-between  m-8 ">
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
            <button onClick={handleModal}>

              Nuevo Producto
            </button>
          </div>
        </article>
        <article className="w-[90%] mx-auto grid grid-cols-[2fr,2fr,1fr,1fr,1fr] gap-x-10 place-items-start self-center">
          <p className="text-lg font-medium text-blanco">Imagen</p>
          <p className="text-lg font-medium text-blanco">Nombre</p>
          <p className="text-lg font-medium text-blanco">Stock</p>
          <p className="text-lg font-medium text-blanco">Precio</p>
          <p className="text-lg font-medium text-blanco">Acciones</p>
        </article>
      </section>
      <section className="flex flex-col  h-3/4  overflow-auto ">
        {productosBuscados.length > 0
          ? productosBuscados.map((producto) => (
            <Card
              key={producto.id}
              setIdProducto={setIdProducto}
              producto={producto}
              setModal={setModal}
              eliminarProducto={eliminarProducto}
            />
          ))
          : productos.map((producto) => (
            <Card
              key={producto.id}
              setIdProducto={setIdProducto}
              producto={producto}
              setModal={setModal}
              eliminarProducto={eliminarProducto}
            />
          ))}
      </section>

    </main>
  );
}