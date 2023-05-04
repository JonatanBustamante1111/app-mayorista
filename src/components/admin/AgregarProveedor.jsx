import React, { useState, useEffect } from "react";
import { db } from "../../utils/firebaseconfig";
import Swal from "sweetalert2";
import { addDoc, collection,  getDocs, } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AgregarProveedor = ({ setModal, proveedores,consultarProveedor }) => {
  const [id, setId] = useState(0);
  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  // se encarga de generar un ID unico segun la cantidad de objetos
  const cantId = proveedores.length;
  useEffect(() => {
    setId(cantId + 1);
  }, [cantId]);


    useEffect(() => {
      consultarProveedor();
    }, []);
  // genera la fecha actual del dia
  useEffect(() => {
    const intervalId = setInterval(() => {
      const fecha = new Date();
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const anio = fecha.getFullYear();
      const diaFormateado = dia < 10 ? `0${dia}` : dia;
      const mesFormateado = mes < 10 ? `0${mes}` : mes;
      const fechaActualFormateada = `${diaFormateado}-${mesFormateado}-${anio}`;
      setFecha(fechaActualFormateada);
    });
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // crea un arreglo con la informacion del formulario
  const newProveedor = { id: id, fecha: fecha, nombre: nombre };

  // Create proveedor
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Agregar documento a la collecion
    await addDoc(collection(db, "proveedores"), newProveedor);

    // Restablece los campos a vacio del formulario
    const clearState = () => {
      setId(0);
      setFecha("");
      setNombre("");
    };

    clearState();
      // cierra el modal
      setModal(false);

    // muestra un mensaje si la carga es correcta
    Swal.fire({
      icon: "success",
      title: "¡Proveedor agregado correctamente!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin/proveedores");
        consultarProveedor()
      }
    })

  };

  return (
    <section className="bg-terciario z-20 w-full absolute left-[40%] top-[10%] sm:w-[75%] md:w-[660px] rounded-xl p-4">
      <div className="w-full flex justify-between items-center py-5 ">
        <h1 className="text-2xl text-blanco font-semibold  text-left  ">
          Agregar proveedor
        </h1>
        <button
          className="text-blanco font-semibold text-3xl "
          onClick={() => setModal(false)}
        >
          <ion-icon name="close-sharp"></ion-icon>
        </button>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-8 flex flex-col gap-y-2">
          <label className="text-blanco font-semibold text-base" htmlFor="id">
            ID:
          </label>
          <input
            required
            id="id"
            type="number"
            className="p-3 border-secundario border rounded-xl bg-inherit w-full text-blanco focus:outline-none"
            placeholder="Id del proveedor"
            name="id"
            value={id}
            readOnly
          />
        </div>
        <div className="mb-8 flex flex-col gap-y-2">
          <label
            className="text-blanco font-semibold text-base"
            htmlFor="nombre"
          >
            Nombre:
          </label>
          <input
            required
            id="nombre"
            type="text"
            className="p-3 border-secundario border rounded-xl bg-inherit w-full text-blanco focus:outline-none"
            placeholder="Nombre del proveedor"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-10">
          <label htmlFor="alta" className="text-blanco font-semibold text-base">
            Alta
          </label>
          <input
            id="alta"
            type="text"
            placeholder="nombre del propietario"
            className="p-3 border-secundario border rounded-xl  bg-inherit w-full text-blanco focus:outline-none"
            value={fecha}
            readOnly
          />
        </div>
        <button
          type="submit"
          className="my-5 mx-auto bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
              py-4 px-6 rounded-lg font-semibold text-base cursor-pointer"
         >
          Agregar proveedor
        </button>
      </form>
    </section>
  );
};
export default AgregarProveedor;
