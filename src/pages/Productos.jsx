import { useEffect, useState } from 'react'
import { db } from "../utils/firebaseconfig";
import { getDocs, collection} from "firebase/firestore";
import Card from '../components/Card'
import DropDown from '../components/DropDown'

export default function Productos() {

  const [productos, setProductos] = useState([])
  // Estados para manejar las busquedas de los productos
  const [busqueda, setBusqueda] = useState('')
  const [productosBuscados, setProductosBuscados] = useState([])
  // Estados para las categorias y subcategorias
  const [categoriaFiltrada, setCategoriaFiltrada] = useState('')
  const [subCategoriaFiltrada, setSubCategoriaFiltrada] = useState('')

  const [filtradoResponsive, setFiltradoResponsive] = useState(false)

  useEffect(() => {
    const consultarProductos = async () => {
      const data = await getDocs(collection(db, "productos"));
      setProductos(
        data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      )
    }
    consultarProductos()
  }, [])



  const filtrar = productos.filter(producto => {
    if (subCategoriaFiltrada == '') {
      return producto.categoria === categoriaFiltrada
    } else {
      return producto.categoria === categoriaFiltrada && producto.subcategoria === subCategoriaFiltrada
    }
  }
  )

  const filtrarPorTodosLosProductos = () => {
    setCategoriaFiltrada('')
    setSubCategoriaFiltrada('')
    setProductosBuscados([])
  }

  const buscarProductos = (e) => {
    e.preventDefault()
    const buscar = productos.filter(prod => prod.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    setProductosBuscados(buscar)
  }


  return (
    <main>
      <div className='hidden md:flex w-full px-10 mx-auto justify-center'>
        <h2 className=' mt-20 py-8 font-semibold text-blanco uppercase '>
          {categoriaFiltrada === '' && subCategoriaFiltrada === ''
            ? 'Todos los productos'
            : `Mostrando resultados de:${categoriaFiltrada} / ${subCategoriaFiltrada} 
       `}
        </h2>
      </div>
      <section className='grid md:grid-cols-[1fr,4fr] gap-x-7'>
        <aside className=''>
          <h2 className='pl-5 mb-5 text-xl font-semibold text-blanco'>Buscar</h2>
          <article className='ml-5 flex flex-col'>
            <div className='flex items-center gap-x-4'>
              <form
                className=" relative w-[85%] flex flex-col"
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
              <button
                onClick={() => setFiltradoResponsive(!filtradoResponsive)}
                className={`
                  md:hidden
                  text-xl px-1 pb-[1.2px] pt-1 border-[1px] border-secundario rounded-lg duration-300
                  ${filtradoResponsive ? 'bg-secundario text-primario' : 'text-blanco'}
                `}>
                <ion-icon name="filter"></ion-icon>
              </button>
            </div>
            <div className={`md:block ${filtradoResponsive ? 'block' : 'hidden'}`}>
              <DropDown
                categoriaFiltrada={categoriaFiltrada}
                setCategoriaFiltrada={setCategoriaFiltrada}
                subCategoriaFiltrada={subCategoriaFiltrada}
                setSubCategoriaFiltrada={setSubCategoriaFiltrada}
                filtrarPorTodosLosProductos={filtrarPorTodosLosProductos}
              />
            </div>
            <div className='flex md:hidden w-full px-10 mx-auto justify-center'>
              <h2 className=' my-10 font-semibold text-blanco uppercase '>
                {categoriaFiltrada === '' && subCategoriaFiltrada === ''
                  ? 'Todos los productos'
                  : `Mostrando resultados de:${categoriaFiltrada} / ${subCategoriaFiltrada} 
                `}
              </h2>
            </div>
          </article>
        </aside>
        <article >

          <div className='w-full grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 h-auto'>
            {
              productosBuscados.length
                ? productosBuscados.map(producto =>
                  <Card key={producto.id} producto={producto} />
                )
                : categoriaFiltrada !== ''
                  ?
                  filtrar.map(producto =>
                    <Card key={producto.id} producto={producto} />
                  )
                  : productos.map(producto =>
                    <Card key={producto.id} producto={producto} />
                  )
            }
          </div>
        </article>
      </section>
    </main>
  )
}
