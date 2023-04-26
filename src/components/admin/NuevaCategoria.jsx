import React from 'react'
import Modal from './Modal'
import { getDoc, doc, arrayUnion, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { useState } from 'react'
import { format } from 'date-fns';
import Swal from 'sweetalert2'

const fechaActual = new Date();
const fechaFormateada = format(fechaActual, 'dd/MM/yyyy');

export default function NuevaCategoria({ handleModal }) {

    const [camposCategorias, setCamposCategorias] = useState({
        id: '',
        descripcion: ''
    })

    // Funcion Para agregarle una categoria al documento

    const handleSubmit = async (e) => {
        e.preventDefault()
        const docref = doc(db, 'utilidades', 'categorias')
        const docCategorias = await getDoc(docref)
        const nuevaCategoria = {
            id: camposCategorias.id,
            nombre: camposCategorias.descripcion,
            subcategorias: [],
            fecha: fechaFormateada
        }

        if (docCategorias.exists()) {
            await updateDoc(docref, {
                categorias: arrayUnion(nuevaCategoria)
            });
        }
        Swal.fire({
            icon: "success",
            title: "¡Categoria agregada correctamente!",
          });
    }

    return (

        <Modal
            camposCategorias={camposCategorias}
            setCamposCategorias={setCamposCategorias}
            handleModal={handleModal}
            onSubmit={handleSubmit}

            title={'Nueva Categoria'}
            campoId={'categoria'}
            campoDescripcion={'categoria'}
            buttonText={'Nueva Categoria'}
        />

    )
}
