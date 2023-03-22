import { useEffect, useState } from 'react'
import { db, storage } from '../utils/firebaseconfig'
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'
import Card from '../components/Card'

export default function Productos() {

  const [productos, setProductos] = useState([])


  useEffect(() => {
    const consultarProductos = async () => {
      const data = await getDocs(collection(db, "productos"));
      setProductos(
        data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      )
    }
    consultarProductos()
  }, [])
  console.log(productos)

  return (
    <main>
      <h2 className='text-center py-8 font-semibold text-teal-400'> Productos</h2>
     <section className='grid md:grid-cols-[1fr,4fr]'>
      <aside className='bg-white'>

      </aside>
       <article className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 w-full '>
      
         {
           productos.map(producto =>
             <Card key={producto.id} producto={producto} />
           )
         }
       </article>
     </section>
    </main>
  )
}
