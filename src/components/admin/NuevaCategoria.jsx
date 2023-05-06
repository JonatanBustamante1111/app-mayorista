import React from 'react'
import Modal from './Modal'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { useState } from 'react'
import { format } from 'date-fns';
import Swal from 'sweetalert2'



export default function NuevaCategoria({ handleModal }) {

    const [camposCategorias, setCamposCategorias] = useState({
        id: '',
        descripcion: ''
    })
    const fechaActual = new Date();
    const fechaFormateada = format(fechaActual, 'dd/MM/yyyy');
    // Funcion Para agregarle una categoria al documento

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newDoc = doc(db, 'categorias', camposCategorias.id)
        await setDoc(newDoc, {
            idDoc: camposCategorias.id,
            nombre: camposCategorias.descripcion,
            fecha: fechaFormateada,
            subcategorias: []
        })

        setCamposCategorias({
            id: '',
            descripcion: ''
        })

        Swal.fire({
            icon: "success",
            title: "¡Categoria agregada correctamente!",
        });

        handleModal()

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
