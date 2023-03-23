import React, { useState, useRef } from 'react'
import Formulario from '../components/Formulario'
import Error from '../components/Error'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { db, storage } from '../utils/firebaseconfig'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export default function AdminNuevoProducto() {

    const [archivoSeleccionado, setArchivoSeleccionado] = useState({})
    const [nombreArchivo, setNombreArchivo] = useState('')

    const [camposProducto, setCamposProducto] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        categoria: '',
        imagen: ''
    })
    const inputFileRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Subimos la imagen al Storage y obtenemos la url para utilizarla en el documento a subir
        if (Object.values(camposProducto).includes('')) {
            errores.push('Rellena todos los campos')
            return
        }
        //const storageRef = ref(storage, nombreArchivo)
        const storageRef = ref(storage, nombreArchivo);
        await uploadBytes(storageRef, archivoSeleccionado)
        const url = await getDownloadURL(storageRef);
        await addDoc(collection(db, 'productos'), { ...camposProducto, imagen: url })
        setCamposProducto({
            nombre: '',
            precio: '',
            descripcion: '',
            categoria: '',
            imagen: ''
        })
        // Restablecer input file despues de subir el producto
        inputFileRef.current.value = null;
        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado correctamente!'
        })
    }

    const handleChangeArchivo = async (e) => {
        const archivo = await e.target.files[0]
        setArchivoSeleccionado(archivo)
        console.log(archivo)
        setNombreArchivo(archivo.name)
    }
    return (
        <main>
            <h1 className='uppercase text-2xl text-slate-800 font-bold text-center py-10'>Agregar producto</h1>
            <section className='w-[80%] mx-auto '>
                <div className=' w-full flex justify-end my-5'>
                    <button
                        className='bg-slate-800 text-white font-semibold text-lg uppercase px-2 py-1 rounded-sm '
                        onClick={() => navigate(-1)}>
                        Volver
                    </button>
                </div>
                <div className='bg-white shadow rounded-md w-5/6 md:w-3/4 mx-auto  px-5 py-10 '>


                    <form
                        onSubmit={handleSubmit}

                    >
                        <Formulario
                            handleChangeArchivo={handleChangeArchivo}
                            camposProducto={camposProducto}
                            setCamposProducto={setCamposProducto}
                            inputFileRef={inputFileRef}
                        />
                        <input
                            type="submit"
                            className='mt-5 w-full bg-purple-500 uppercase font-bold text-white text-lg py-2 cursor-pointer'
                            value="Agregar Producto"
                        />
                        {
                          //  errores?.length && errores.map(error =><Error>{error}</Error>)
                        }
                    </form>
                </div>
            </section>
        </main>
    )
}
