import { useState } from 'react'
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseconfig';
import Modal from './Modal';

export default function EditarSubcategoria({ subCategoriaAEditar, setSubCategoriaAEditar, handleModal }) {

    const [camposCategorias, setCamposCategorias] = useState({
        id: subCategoriaAEditar.id,
        descripcion: subCategoriaAEditar.nombre
    })


    const actualizarSubCategoria = async (e) => {
        e.preventDefault()
        const docref = doc(db, "utilidades", 'categorias');
        const categorias = await getDoc(docref);
        try {
            console.log(categorias.data().categorias)

            const dataCategorias = categorias.data().categorias
            const categoriaIndex = dataCategorias.findIndex((categoria) => {
                return categoria.subcategorias.some((subcategoria) => subcategoria.id === subCategoriaAEditar.id);
            });

            if (categoriaIndex !== -1) {
                const categoria = dataCategorias[categoriaIndex];
                const subcategorias = categoria.subcategorias.map((subcategoria) => {
                    if (subcategoria.id === subCategoriaAEditar.id) {
                        return {
                            ...subcategoria,
                            nombre: camposCategorias.descripcion,
                            id: camposCategorias.id
                        };
                    } else {
                        return subcategoria;
                    }
                });

                const updatedCategoria = { ...categoria, subcategorias };
                const updatedCategorias = [...dataCategorias];
                updatedCategorias[categoriaIndex] = updatedCategoria;

                await updateDoc(docref, { categorias: updatedCategorias });

                console.log("Subcategory label updated successfully");
            } else {
                console.log("Subcategory not found");
            }
        } catch (error) {
            console.error("Error updating subcategory label:", error);
        }
        setSubCategoriaAEditar(null)
    };


    return (
        <Modal
            camposCategorias={camposCategorias}
            setCamposCategorias={setCamposCategorias}
            handleModal={handleModal}
            onSubmit={actualizarSubCategoria}

            title={'Editar Subcategoria'}
            campoId={'subcategoria'}
            campoDescripcion={'subcategoria'}
            buttonText={'Guardar Subcategoria'}
        />
    )
}
