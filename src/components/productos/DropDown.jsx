import { useEffect, useState } from "react";
import { getDoc, doc ,getDocs, collection } from "firebase/firestore";
import { db } from "../../utils/firebaseconfig";


export default function DropDown({
  categoriaFiltrada,
  setCategoriaFiltrada,
  subCategoriaFiltrada,
  setSubCategoriaFiltrada,
  filtrarPorTodosLosProductos
})  {

  const [categorias, setCategorias] = useState([])

  // Estado para manejar el div que se abre mostrando las subcategorias  
  const [open, setOpen] = useState(false);


  // Estado para manejar la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const consultarCategorias = async () => {
      const data = await getDocs(collection(db,'categorias'))
      setCategorias(
        data.docs.map( doc => ({ ...doc.data(), id:doc.id }) )
      )
    }
    consultarCategorias()
  }, [])

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

      {categorias?.map((categoria, i) => (
        <div key={i}>
          <div className="flex justify-between items-center">
            {/* Agregamos el evento click en la categoría */}
            <p
              className={`
              block my-2 text-base text-start cursor-pointer
              hover:text-secundario duration-300
              ${categoriaFiltrada === categoria.nombre
                  ? 'text-secundario'
                  : 'text-blanco'
                }
              `}
              onClick={() => { setSubCategoriaFiltrada(''), setCategoriaFiltrada(categoria.nombre) }}
            >
              {categoria.nombre}
            </p>
            {/* Si la categoría tiene subcategorías, mostramos el botón */}
            {categoria.subcategorias.length !== 0 && (
              <p
                className={`text-3xl cursor-pointer 
                ${categoriaSeleccionada === categoria.nombre && open
                    ? 'text-secundario'
                    : 'text-blanco'
                  }`}
                onClick={() => handleCategoriaClick(categoria.nombre)}>
                {
                  categoriaSeleccionada === categoria.nombre
                    ? <ion-icon name="remove"></ion-icon>
                    : <ion-icon name="add"></ion-icon>
                }
              </p>

            )}

          </div>
          {/* Si la categoría tiene subcategorías y está seleccionada, las mostramos */}
          {categoria.subcategorias.length !== 0 && categoriaSeleccionada === categoria.nombre && open && (
            <div className='bg-[#002633] px-4 py-2 rounded-xl'>
              {/* Recorremos las subcategorías y generamos un bloque para cada una */}
              {categoria.subcategorias.map((subCategoria) => (
                <p
                  key={subCategoria.id}
                  className={`
                  block my-2 text-sm text-blanco font-medium leading-6 text-start 
                  cursor-pointer hover:text-secundario duration-300
                  ${subCategoriaFiltrada === subCategoria.nombre && open
                      ? 'text-secundario'
                      : 'text-blanco'
                    }
                  `}
                  onClick={() => {
                    setCategoriaFiltrada(categoria.nombre)
                    setSubCategoriaFiltrada(subCategoria.nombre)
                  }}
                >
                  {subCategoria.nombre}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}