import { useState } from "react";
import { categorias } from "../utils/categorias";


export default function DropDown({
    categoriaFiltrada, 
    setCategoriaFiltrada, 
    subCategoriaFiltrada,
    setSubCategoriaFiltrada, 
    filtrarPorTodosLosProductos 
  }) {
  
  // Estado para manejar el div que se abre mostrando las subcategorias  
  const [open, setOpen] = useState(false);

  // Estado para manejar la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  

  // Función que maneja el evento click en la categoría
  const handleCategoriaClick = (categoria) => {
      setSubCategoriaFiltrada('')
    // Si la categoría ya está seleccionada, la deselecciona
    if (categoriaSeleccionada === categoria) {
      setCategoriaSeleccionada(null);
      setOpen(false);
    } else { // Si no, la selecciona
      setCategoriaSeleccionada(categoria);
      setOpen(true);
    }
  };
  return (
    <div className="w-full flex flex-col">
   
        <h2 
            onClick={filtrarPorTodosLosProductos}
            className="font-medium text-blanco py-5 cursor-pointer">
            Todos los productos</h2>
      {/* Recorremos las categorías y generamos un bloque para cada una */}

      {categorias.map((categoria, i) => (
        <div key={i}>
          <div className="flex justify-between items-center">
            {/* Agregamos el evento click en la categoría */}
            <p
              className={`
              block my-2 text-base text-start cursor-pointer
              hover:text-secundario duration-300
              ${categoriaFiltrada === categoria.label 
                 ? 'text-secundario'
                 : 'text-blanco'
                }
              `}
              onClick={() =>  {setSubCategoriaFiltrada(''),setCategoriaFiltrada(categoria.label)}}
            >
              {categoria.label}
            </p>
            {/* Si la categoría tiene subcategorías, mostramos el botón */}
            {categoria.children.length !== 0 && (
              <p
                className={`text-3xl cursor-pointer 
                ${categoriaSeleccionada === categoria.label && open
                 ? 'text-secundario'
                 : 'text-blanco'
                }`} 
                onClick={() => handleCategoriaClick(categoria.label)}>
                  {
                    categoriaSeleccionada === categoria.label 
                    ?<ion-icon name="remove"></ion-icon>
                    :<ion-icon name="add"></ion-icon>
                  }
              </p>

            )}
  
          </div>
          {/* Si la categoría tiene subcategorías y está seleccionada, las mostramos */}
          {categoria.children.length !== 0 && categoriaSeleccionada === categoria.label && open && (
            <div className='bg-[#002633] px-4 py-2 rounded-xl'>
              {/* Recorremos las subcategorías y generamos un bloque para cada una */}
              {categoria.children.map((subCategoria) => (
                <p
                  key={subCategoria.id}
                  className={`
                  block my-2 text-sm text-blanco font-medium leading-6 text-start 
                  cursor-pointer hover:text-secundario duration-300
                  ${subCategoriaFiltrada === subCategoria.label && open
                    ? 'text-secundario'
                    : 'text-blanco'
                   }
                  `}
                  onClick={() => {
                    setCategoriaFiltrada(categoria.label)
                    setSubCategoriaFiltrada(subCategoria.label) 
                  }}
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