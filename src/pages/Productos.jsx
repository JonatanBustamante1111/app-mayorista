import { useEffect, useState } from 'react'
import { db, storage } from '../utils/firebaseconfig'
import { doc, getDoc, getDocs, collection } from 'firebase/firestore'
import Card from '../components/Card'

export default function Productos() {

  const [productos, setProductos] = useState([])
  const [categoriaFiltrada, setCategoriaFiltrada] = useState('')
  const [subCategoriaFiltrada, setSubCategoriaFiltrada] = useState('')

  const categorias = [
    'Bijou',
    'Electro',
    'Marroquinería',
    'Cosmética',
    'Packaging',
    'Pelo',
    'Relojería',
    'Librería',
    'otros'
  ]
  const categorias2 = [
    {
      id: 1,
      label: "Category 1",
      children: [
        { id: 11, label: "Subcategory 1.1" },
        { id: 12, label: "Subcategory 1.2" },
        { id: 13, label: "Subcategory 1.3" },
      ],
    },
    {
      id: 2,
      label: "Category 2",
      children: [{ id: 21, label: "Subcategory 2.1" },],
    },
    {
      id: 2,
      label: "Category 2",
      children: [{
        id: 21, label: "Subcategory 2.1",
        id: 22, label: "Subcategory 2.1",
      },],
    },
    {
      id: 2,
      label: "Category 2",
      children: [{ id: 21, label: "Subcategory 2.1" },],
    },
    {
      id: 3,
      label: "Category 2",
      children: [],
    },
    {
      id: 4,
      label: "Category 2",
      children: [],
    },

  ]


  useEffect(() => {
    const consultarProductos = async () => {
      const data = await getDocs(collection(db, "productos"));
      setProductos(
        data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      )
    }
    consultarProductos()
  }, [])


  const filtrar = productos.filter(producto => (
    producto.categoria === categoriaFiltrada 
  ))




  return (
    <main>
      <h2 className='text-center py-8 font-semibold text-teal-400'> Productos</h2>
      <section className='grid md:grid-cols-[1fr,4fr]'>
        <aside className=''>
          <h2 className='text-center text-xl font-semibold text-slate-800'>Categorias</h2>
          <div className='ml-5'>
            {
              categorias2.map((categoria, i) =>
                <div key={i}>
                  <p className='block my-2 text-lg text-indigo-500 font-normal text-start cursor-pointer hover:underline'
                    onClick={() => setCategoriaFiltrada(categoria.label)}
                  >{categoria.label}
                  </p>
                  {
                    categoria.children.length ? (
                      <div className='pl-4'>
                        {categoria.children.map((child) => (
                          <p  
                            key={child.id}
                            className='block my-2 text-lg text-indigo-500 font-normal text-start cursor-pointer hover:underline' >
                              {child.label}
                            </p>
                        ))}
                      </div>
                    ) : null}

                </div>)
            }
          </div>

        </aside>
        <article className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 w-full '>

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
        </article>
      </section>
    </main>
  )
}
