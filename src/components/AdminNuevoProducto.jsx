import React, { useState, useRef } from "react";
import Formulario from "../components/Formulario";

//import Error from '../components/Error'

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../utils/firebaseconfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AdminNuevoProducto({ handleModal }) {
  // Hooks del input file
  const [archivoSeleccionado, setArchivoSeleccionado] = useState({});
  const [nombreArchivo, setNombreArchivo] = useState("");
  const inputFileRef = useRef(null);

  const [camposProducto, setCamposProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    imagen: "",
  });
  const [subCategoria, setSubCategoria] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validacion
    if (Object.values(camposProducto).includes("")) {
      console.log("Rellena todos los campos");
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
      descripcion: "",
      categoria: "",
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
    console.log(archivo);
    setNombreArchivo(archivo.name);
  };
  return (

    <section className="bg-terciario z-20 w-full absolute left-[20%] top-[49px] sm:w-[75%] md:w-[660px] rounded-xl">
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
