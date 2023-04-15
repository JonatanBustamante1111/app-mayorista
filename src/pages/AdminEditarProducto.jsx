import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { db, storage } from '../utils/firebaseconfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Formulario from '../components/Formulario'

import Swal from 'sweetalert2'


export default function AdminEditarProducto({ idProducto, setIdProducto }) {

  //const producto = useLoaderData()
  const navigate = useNavigate()
  console.log(idProducto)

  const [camposProducto, setCamposProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    subcategoria: '',
    imagen: ''
  })
  const [archivoSeleccionado, setArchivoSeleccionado] = useState({})
  const [nombreArchivo, setNombreArchivo] = useState('')
  const [subCategoria, setSubCategoria] = useState('')


  // Para Identificar si viene una imagen de firebase, en caso de ser asi la imagen se muestra en el formulario
  const [imagenUrl, setImagenUrl] = useState(null)


  const consultarProducto = async () => {
    const docref = doc(db, 'productos', idProducto)
    const producto = await getDoc(docref)
    const datos = producto.data()

    setCamposProducto({
      nombre: datos.nombre,
      precio: datos.precio,
      descripcion: datos.descripcion,
      categoria: datos.categoria,
      subcategoria: datos.subcategoria,
      imagen: datos.imagen,
    })
  }

  useEffect(() => {
    consultarProducto()
  }, [])

  const handleChangeArchivo = async (e) => {
    const archivo = await e.target.files[0]
    setArchivoSeleccionado(archivo)
    setNombreArchivo(archivo.name)
    setImagenUrl(!imagenUrl)
  }

  const handleUpdate = async e => {
    e.preventDefault()
    // documento a acualizar
    const docref = doc(db, 'productos', idProducto)

    if (imagenUrl !== null) {
      // En caso de seleccionar otra imagen se envia la misma al storeage y despues se obtiene la url para asignarla al documento
      const storageRef = ref(storage, nombreArchivo);
      await uploadBytes(storageRef, archivoSeleccionado)
      const url = await getDownloadURL(storageRef);
      await updateDoc(docref, { ...camposProducto, imagen: url, subcategoria: subCategoria })
    } else {
      await updateDoc(docref, camposProducto)
    }

    Swal.fire({
      icon: 'success',
      title: 'Cambios guardados'
    }).then((result) => {
      if (result.isConfirmed) {

        setIdProducto(null)
      }
    })
    console.log('Producto Actualizado')

  }
  return (

    <section className='bg-terciario z-20 w-full absolute left-[20%] top-[49px] sm:w-[75%] md:w-[660px] rounded-xl'>
      <div className=' w-full flex justify-between items-center py-5 px-9'>
        <h1 className='text-2xl text-blanco font-semibold text-center '>Editar producto</h1>
        <button
          className='text-blanco font-semibold text-3xl '
          onClick={() => setIdProducto(null)}>
          <ion-icon name="close-sharp"></ion-icon>
        </button>
      </div>
      <div className=' shadow rounded-md w-5/6 md:w-full mx-auto  px-5  '>
        <form
          onSubmit={handleUpdate}
          className=' flex flex-col items-center'
        >
          <Formulario
            handleChangeArchivo={handleChangeArchivo}
            camposProducto={camposProducto}
            setCamposProducto={setCamposProducto}
            imagenUrl={imagenUrl}
            setSubCategoria={setSubCategoria}
          />
          <input
            type="submit"
            className='my-5 bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
              py-4 px-6 rounded-lg font-semibold text-base cursor-pointer'
            value='Guardar Cambios'
          />
        </form>
      </div>
    </section>
  )
}
