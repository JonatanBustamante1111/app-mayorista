import Modal from "./Modal"
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { useState } from 'react'
import { format } from 'date-fns';

export default function EditarCategoria({ categoriaAEditar, setCategoriaAEditar }) {

    const [camposCategorias, setCamposCategorias] = useState({
        id: categoriaAEditar.idDoc,
        descripcion: categoriaAEditar.nombre
    })
    const fechaActual = new Date();
    const fechaFormateada = format(fechaActual, 'dd/MM/yyyy');

    const handleSubmit = async (e) => {
        e.preventDefault()
        const docref = doc(db, 'categorias', categoriaAEditar.id)

        await updateDoc(docref, { 
            idDoc: camposCategorias.id,
            nombre: camposCategorias.descripcion,
            fecha:fechaFormateada
        });

        console.log('categoria Actualizada')
        // Resetear estado para cerrar el modal que se abre si el objeto tiene algo
        setCategoriaAEditar({ editar: {}, nuevaSubcategoria:''})
    }


return (
    <Modal
        camposCategorias={camposCategorias}
        setCamposCategorias={setCamposCategorias}
        handleModal={() => setCategoriaAEditar({ editar: {}, nuevaSubcategoria:'' })}
        onSubmit={handleSubmit}

        title={'Editar Categoria'}
        campoId={'categoria'}
        campoDescripcion={'categoria'}
        buttonText={'Guardar Cambios'}
    />
)
}
