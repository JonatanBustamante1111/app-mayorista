import { useState } from 'react'
import Modal from '../Modal'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig'

export default function NuevaSubcategoria({ setModalSubcategoria, categoriaId }) {

    const [camposCategorias, setCamposCategorias] = useState({
        id: '',
        descripcion: ''
    })

    // Funcion Para agregarle una categoria al documento

    const handleSubmit = async (e) => {
        e.preventDefault()
        const docRef = doc(db, 'utilidades', 'categorias')
        const docSnapshot = await getDoc(docRef)

        if (!docSnapshot.exists()) {
            console.log('No se encontró el documento de categorías')
            return
        }

        const categoriasData = docSnapshot.data()

        const nuevaCategorias = [...categoriasData.categorias]

        const categoriaIndex = nuevaCategorias.findIndex(categoria => categoria.id === categoriaId)

        if (categoriaIndex === -1) {
            console.log('No se encontró la categoría')
            return
        }

        nuevaCategorias[categoriaIndex].subcategorias.push({ id: camposCategorias.id, nombre: camposCategorias.descripcion })

        await updateDoc(docRef, { categorias: nuevaCategorias })

        console.log('subcategoria Agregada')
        setModalSubcategoria(false)
    }

    return (
        <Modal
            camposCategorias={camposCategorias}
            setCamposCategorias={setCamposCategorias}
            handleModal={()=> setModalSubcategoria(false)}
            onSubmit={handleSubmit}

            title={'Nueva Subcategoria'}
            campoId={'subcategoria'}
            campoDescripcion={'subcategoria'}
            buttonText={'Nueva Subcategoria'}
        />
    )
}
