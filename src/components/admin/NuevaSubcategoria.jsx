import { useState } from 'react'
import Modal from './Modal'
import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { format } from 'date-fns';
import Swal from 'sweetalert2';

export default function NuevaSubcategoria({ setCategoria, categoriaId }) {
    // Funcion Para agregarle una categoria al documento
    const fechaActual = new Date();
    const fechaFormateada = format(fechaActual, 'dd/MM/yyyy');

    const [camposCategorias, setCamposCategorias] = useState({
        id: '',
        descripcion: ''
    })

    // Funcion Para agregarle una categoria al documento

    const handleSubmit = async (e) => {
        e.preventDefault()
        const docref = doc(db, 'categorias', categoriaId)
        const docCategorias = await getDoc(docref)
        const nuevaSubcategoria = {
            id: camposCategorias.id,
            nombre: camposCategorias.descripcion,
            fecha: fechaFormateada
        }

        if (docCategorias.exists()) {
            await updateDoc(docref, {
                subcategorias: arrayUnion(nuevaSubcategoria)
            });
        }
        setCamposCategorias({
            id: '',
            descripcion: ''
        })
        setCategoria({ nuevaSubcategoria: '' })
        Swal.fire({
            icon: "success",
            title: "¡Subcategoria agregada correctamente!",
        });

        console.log('Subcategoria Agregada')
    }
    return (
        <Modal
            camposCategorias={camposCategorias}
            setCamposCategorias={setCamposCategorias}
            handleModal={() => setCategoria({ nuevaSubcategoria: '' })}
            onSubmit={handleSubmit}

            title={'Nueva Subcategoria'}
            campoId={'subcategoria'}
            campoDescripcion={'subcategoria'}
            buttonText={'Nueva Subcategoria'}
        />
    )
}
