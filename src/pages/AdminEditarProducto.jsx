import { useState } from 'react'
import { useLoaderData,  useNavigate } from 'react-router-dom'
import { db, storage } from '../utils/firebaseconfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Formulario from '../components/Formulario'

import Swal from 'sweetalert2'


export async function loader({ params }) {
  const docref = doc(db, 'productos', params.productoId)
  const producto = await getDoc(docref)
  // Mensaje de error en caso de no encontrar el producto
  if (Object.values(producto).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'No hay resultados'
    })
  }
  return producto
}


export default function AdminEditarProducto() {

  const producto = useLoaderData()
  const navigate = useNavigate()

  const [camposProducto, setCamposProducto] = useState({
    nombre: producto.data().nombre,
    precio: producto.data().precio,
    descripcion: producto.data().descripcion,
    categoria: producto.data().categoria,
    subcategoria: producto.data().subcategoria,
    imagen: producto.data().imagen
  })
  const [archivoSeleccionado, setArchivoSeleccionado] = useState({})
  const [nombreArchivo, setNombreArchivo] = useState('')
  const [ subCategoria, setSubCategoria ] = useState('')


  // Para Identificar si viene una imagen de firebase, en caso de ser asi la imagen se muestra en el formulario
  const [imagenUrl, setImagenUrl] = useState(null)



  const handleChangeArchivo = async (e) => {
    const archivo = await e.target.files[0]
    setArchivoSeleccionado(archivo)
    setNombreArchivo(archivo.name)
    setImagenUrl(!imagenUrl)
  }

  const handleUpdate = async e => {
    e.preventDefault()
    // documento a editar
    const docref = doc(db, 'productos', producto.id)

    if (imagenUrl !== null) {
      // En caso de seleccionar otra imagen se envia la misma al storeage y despues se obtiene la url para asignarla al documento
      const storageRef = ref(storage, nombreArchivo);
      await uploadBytes(storageRef, archivoSeleccionado)
      const url = await getDownloadURL(storageRef);
      await updateDoc(docref, { ...camposProducto, imagen: url, subcategoria:subCategoria })
    } else {
      await updateDoc(docref, camposProducto)
    }

    Swal.fire({
      icon: 'success',
      title: 'Cambios guardados'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1)
      }
    })
    console.log('Producto Actualizado')

  }
  return (
    <section className='w-full sm:w-[80%] mx-auto '>
      <h1 className='uppercase text-2xl text-slate-800 font-bold text-center py-10'>Editar producto</h1>
     <div className=' w-full flex justify-end my-5'>
       <button 
        className='bg-slate-800 text-white font-semibold text-lg uppercase px-2 py-1 rounded-sm ' 
        onClick={() => navigate(-1)}> 
          Volver
        </button>
     </div>
      <div className='bg-white shadow rounded-md w-5/6 md:w-3/4 mx-auto  px-5 py-10 my-10 '>

        {
          // errores?.length && <Error>{errores}</Error>
        }
        <form
          onSubmit={handleUpdate}

        >
          <Formulario
            producto={producto}
            handleChangeArchivo={handleChangeArchivo}
            camposProducto={camposProducto}
            setCamposProducto={setCamposProducto}
            imagenUrl={imagenUrl}
            setSubCategoria={setSubCategoria}
          />
          <input
            type="submit"
            className='mt-5 w-full bg-purple-500 uppercase font-bold text-white text-lg py-2 cursor-pointer'
            value='Guardar Cambios'
          />
        </form>
      </div>
    </section>
  )
}
