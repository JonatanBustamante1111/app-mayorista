import { useEffect, useState } from 'react'
import { db, storage } from '../utils/firebaseconfig'
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'
import Card from '../components/Card'
import { categorias } from '../utils/categorias'
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
      <h2 className='text-center py-8 font-semibold text-teal-400'> Productos</h2>
      <section className='grid md:grid-cols-[1fr,4fr] gap-x-7'>
        <aside className=''>
          <h2 className='text-center text-xl font-semibold text-slate-800'>Categorias</h2>
          <div className='ml-5'>
            <DropDown  setCategoriaFiltrada={setCategoriaFiltrada} setSubCategoriaFiltrada={setSubCategoriaFiltrada} filtrarPorTodosLosProductos={filtrarPorTodosLosProductos}/>
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
