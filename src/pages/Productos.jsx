import { useEffect, useState } from 'react'
import { db} from '../utils/firebaseconfig'
import {  getDocs, collection } from 'firebase/firestore'
import Card from '../components/Card'
import DropDown from '../components/DropDown'

export default function Productos() {

  const [productos, setProductos] = useState([])
  const [categoriaFiltrada, setCategoriaFiltrada] = useState('')
  const [subCategoriaFiltrada, setSubCategoriaFiltrada] = useState('')

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
    if(subCategoriaFiltrada == ''){
      return producto.categoria === categoriaFiltrada
    }else{
      return producto.categoria === categoriaFiltrada && producto.subcategoria === subCategoriaFiltrada
    }
  }
  )

 const filtrarPorTodosLosProductos =  () =>{
    setCategoriaFiltrada('')
    setSubCategoriaFiltrada('')
 }


  return (
    <main>
     <div className='w-[30%] mx-auto flex justify-center'>
       <h2 className=' mt-20 py-8 font-semibold text-blanco uppercase '>
         {categoriaFiltrada === '' && subCategoriaFiltrada === '' 
       ? 'Todos los productos'
       : `Mostrando resultados de: ${categoriaFiltrada} / ${subCategoriaFiltrada} 
       `}
       </h2>
     </div>
      <section className='grid md:grid-cols-[1fr,4fr] gap-x-7'>
        <aside className=''>
          <h2 className='pl-5 mb-5 text-xl font-semibold text-blanco'>Buscar</h2>
          <div className='ml-5'>
            <DropDown
              categoriaFiltrada={categoriaFiltrada}  
              setCategoriaFiltrada={setCategoriaFiltrada}
              subCategoriaFiltrada={subCategoriaFiltrada} 
              setSubCategoriaFiltrada={setSubCategoriaFiltrada} 
              filtrarPorTodosLosProductos={filtrarPorTodosLosProductos}
              />
          </div>
        </aside>
        <article >

          <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 w-full h-auto'>
            {
              categoriaFiltrada !== ''
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
