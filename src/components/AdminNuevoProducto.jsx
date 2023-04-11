import React, { useState, useRef } from "react";
import Formulario from "../components/Formulario";
import Modal from "react-modal";

//import Error from '../components/Error'

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../utils/firebaseconfig";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AdminNuevoProducto({ cerrarModal,modalAbierto }) {
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
    <main>
      <Modal
        isOpen={modalAbierto}
        onRequestClose={cerrarModal}
        className="Modal"
        overlayClassName="Overlay"
      >
      <section>
        <div className=" w-full">
          <div className=" font-bold text-3xl text-blanco">
            Agregar producto
            </div>  
          <button
            className=" text-blanco font-normal text-2xl uppercase"
            onClick={cerrarModal}
          >
            X
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <Formulario
              handleChangeArchivo={handleChangeArchivo}
              camposProducto={camposProducto}
              setCamposProducto={setCamposProducto}
              inputFileRef={inputFileRef}
              setSubCategoria={setSubCategoria}
            />
               <button
            type="submit"
            className=" w-full 
            text-center font-semibold py-4 px-6
            bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
            rounded-lg
            "
            
          >
            Agregar producto
          </button>
            {
              //  errores?.length && errores.map(error =><Error>{error}</Error>)
            }
          </form>
        </div>
      </section>
      </Modal>
      
    </main>
  );
}
