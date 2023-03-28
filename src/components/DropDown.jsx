import { useState } from "react";
import { categorias } from "../utils/categorias";

export default function DropDown({ setCategoriaFiltrada, setSubCategoriaFiltrada, filtrarPorTodosLosProductos }) {

  const [open, setOpen] = useState(false);
  // Estado para manejar la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Función que maneja el evento click en la categoría
  const handleCategoriaClick = (categoria) => {
    // Si la categoría ya está seleccionada, la deselecciona
    // Si no, la selecciona
    if (categoriaSeleccionada === categoria) {
      setCategoriaSeleccionada(null);
      setOpen(false);
    } else {
      setCategoriaSeleccionada(categoria);
      setOpen(true);
    }
  };

  return (
    <div className="w-full flex flex-col">
        <h2 
            onClick={filtrarPorTodosLosProductos}
            className="font-semibold text-slate-700 uppercase py-3 cursor-pointer">
            Todos los productos</h2>
      {/* Recorremos las categorías y generamos un bloque para cada una */}

      {categorias.map((categoria, i) => (
        <div key={i}>
          <div className="flex justify-between items-center">
            {/* Agregamos el evento click en la categoría */}
            <p
              className="block my-2 text-base text-slate-700 font-semibold uppercase text-start cursor-pointer hover:underline"
              onClick={() =>  {setSubCategoriaFiltrada(''),setCategoriaFiltrada(categoria.label)}}
            >
              {categoria.label}
            </p>
            {/* Si la categoría tiene subcategorías, mostramos el botón */}
            {categoria.children.length !== 0 && (
              <button 
                className=""
                onClick={() => handleCategoriaClick(categoria)}>
               <ion-icon name="chevron-up-outline"></ion-icon>
              </button>
            )}
          </div>
          {/* Si la categoría tiene subcategorías y está seleccionada, las mostramos */}
          {categoria.children.length !== 0 && categoriaSeleccionada === categoria && open && (
            <div>
              {/* Recorremos las subcategorías y generamos un bloque para cada una */}
              {categoria.children.map((subCategoria) => (
                <p
                  key={subCategoria.id}
                  className="block my-2 text-lg text-indigo-500 font-normal text-start cursor-pointer hover:underline"
                  onClick={() => 
                    setSubCategoriaFiltrada(subCategoria.label) 
                }
                >
                  {subCategoria.label}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
