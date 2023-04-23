import Modal from "../Modal"
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'
import { useState } from 'react'

export default function EditarCategoria({ categoriaAEditar, setCategoriaAEditar }) {

    const [camposCategorias, setCamposCategorias] = useState({
        id: categoriaAEditar.id,
        descripcion: categoriaAEditar.nombre
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const docref = doc(db, 'utilidades', 'categorias')
        const docCategorias = await getDoc(docref)

        if (docCategorias.exists()) {
            const categorias = docCategorias.data().categorias
            const categoriasActualizadas = categorias.map(categoria => {
                if (categoria.id === camposCategorias.id) {
                    return {
                        ...categoria,
                        nombre: camposCategorias.descripcion,
                        id: camposCategorias.id
                    }
                } else {
                    return categoria
                }
            })

            await updateDoc(docref, {
                categorias: categoriasActualizadas
            });

            console.log('categoria Actualizada')
            setCategoriaAEditar(null)
        }
    }

    return (
        <Modal
            camposCategorias={camposCategorias}
            setCamposCategorias={setCamposCategorias}
            handleModal={()=> setCategoriaAEditar(null)}
            onSubmit={handleSubmit}

            title={'Editar Categoria'}
            campoId={'categoria'}
            campoDescripcion={'categoria'}
            buttonText={'Guardar Cambios'}
        />
    )
}
