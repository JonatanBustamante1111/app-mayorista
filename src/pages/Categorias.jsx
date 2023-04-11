import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { db } from "../utils/firebaseconfig";
import Swal from "sweetalert2";
import { categorias } from "../utils/categorias";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { writeBatch } from "firebase/firestore";

const Categorias = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subCategoriasSeleccionada, setSubCategoriaSeleccionada] = useState("");
  const [porcentaje, setPorcentaje] = useState(0);

  const categoriaFind = categorias.find(
    (cat) => cat.label === categoriaSeleccionada
  );

  const handleChangeCategoria = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const actualizarPrecio = async () => {
    const productosRef = collection(db, "productos");
    const productosQuery = subCategoriasSeleccionada
      ? query(
          productosRef,
          where("categoria", "==", categoriaSeleccionada),
          where("subcategoria", "==", subCategoriasSeleccionada)
        )
      : query(productosRef, where("categoria", "==", categoriaSeleccionada));
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
  };

  return (
    <div className="relative left-2/4">
      <div className="w-1/4 mt-40 ml-10">
        <div className="mb-4">
          <select
            name="categoria"
            id="categoria"
            className="w-full py-3 text-center"
            value={categoriaSeleccionada}
            onChange={handleChangeCategoria}
          >
            <option value="">-- Seleccione la Categoria --</option>
            {categorias.map((categoria, i) => (
              <option key={i} value={categoria.label}>
                {categoria.label}
              </option>
            ))}
          </select>
        </div>
          {categoriaFind &&
            categoriaFind.children &&
            categoriaFind.children.length > 0 && (
              <div className="mb-4">
                <select
                  className="w-full py-3 text-center"
                  id="subcategoria"
                  value={subCategoriasSeleccionada}
                  onChange={(e) => {
                    setSubCategoriaSeleccionada(e.target.value);
                  }}
                >
                  <option value="">Seleccione una subcategoría</option>
                  {categoriaFind.children.map((subcategoria) => (
                    <option key={subcategoria.id} value={subcategoria.label}>
                      {subcategoria.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          <div className="flex flex-col">
            <input
              placeholder="Ingrese el porcentaje"
              value={porcentaje}
              type="number"
              onChange={(e) => setPorcentaje(e.target.value)}
              className=' grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit mb-5 text-secundario text-center'
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
      </div>
        </div>
    )
}
export default Categorias