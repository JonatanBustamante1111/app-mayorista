import React, { useState, useRef, useEffect } from "react";
import Formulario from "./Formulario";

//import Error from '../components/Error'

import { ref, uploadBytes, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../../utils/firebaseconfig";

import Swal from "sweetalert2";

export default function AdminNuevoProducto({ handleModal,proveedores }) {
  // Hooks del input file
  const [archivoSeleccionado, setArchivoSeleccionado] = useState({});
  const [nombreArchivo, setNombreArchivo] = useState("");
  const inputFileRef = useRef(null);
  const [camposProducto, setCamposProducto] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    proveedor:"",
    categoria: "",
    destacado: "",
    imagen: "",
  });
  const [subCategoria, setSubCategoria] = useState("");

  // Verificar si la descripción ya existe en la base de datos
  const verificarDescripcionExistente = async (descripcion) => {
  const productosRef = collection(db, "productos");
  const q = query(productosRef, where("descripcion", "==", descripcion));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
  };

  // Create Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validacion
    if (Object.values(camposProducto).includes("")) {
      console.log("Rellena todos los campos");
      return;
    }

    // Verificar si la descripción ya existe
    const descripcionExistente = await verificarDescripcionExistente(camposProducto.descripcion);
    if (descripcionExistente) {
        // Alerta
        Swal.fire({
          icon: "warning",
          title: "¡Alerta!",
          text: "El codigo se encuentra cargado",
        });
      return;
    }
  

    // Subimos la imagen al Storage y obtenemos la url para utilizarla en el documento a subir
    const storageRef = ref(storage, nombreArchivo);
    await uploadBytes(storageRef, archivoSeleccionado);
    const url = await getDownloadURL(storageRef);

    // Agregar documento a la collecion
    await addDoc(collection(db, "productos"), {
      ...camposProducto,
      imagen: url,
      subcategoria: subCategoria,
    });

    // Restablecer campos
    setCamposProducto({
      nombre: "",
      precio: "",
      stock: "",
      descripcion: "",
      proveedor:"",
      categoria: "",
      destacado: "",
      imagen: "",
    });
    setSubCategoria("");
    inputFileRef.current.value = null;
    // Alerta
    Swal.fire({
      icon: "success",
      title: "¡Producto agregado correctamente!",
    });
  };

  const handleChangeArchivo = async (e) => {
    const archivo = await e.target.files[0];
    setArchivoSeleccionado(archivo);
    setNombreArchivo(archivo.name);
  };
  return (

    <section className="bg-terciario z-20 w-full absolute left-[40%] top-[10%] sm:w-[75%] md:w-[660px] rounded-xl">
      <div className=' w-full flex justify-between items-center py-5 px-9'>
        <h1 className='text-2xl text-blanco font-semibold text-center '>Agregar producto</h1>
        <button
          className='text-blanco font-semibold text-3xl '
          onClick={handleModal}>
          <ion-icon name="close-sharp"></ion-icon>
        </button>
      </div>
      <div className="shadow rounded-md w-5/6 md:w-full mx-auto  px-5">
        <form
          className='flex flex-col'
          onSubmit={handleSubmit}
        >
          <Formulario
            handleChangeArchivo={handleChangeArchivo}
            camposProducto={camposProducto}
            setCamposProducto={setCamposProducto}
            inputFileRef={inputFileRef}
            setSubCategoria={setSubCategoria}
            proveedores={proveedores}
          />
          <input
            type="submit"
            className='my-5 mx-auto bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
              py-4 px-6 rounded-lg font-semibold text-base cursor-pointer'
            value='Agregar Producto'
          />
        </form>
      </div>
    </section>


  );
}
