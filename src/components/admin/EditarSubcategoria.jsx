import { useState } from 'react';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseconfig';
import Modal from './Modal';
import { format } from 'date-fns';

export default function EditarSubcategoria({ subCategoriaAEditar, categoria, setCategoria, handleModal }) {

    const [camposCategorias, setCamposCategorias] = useState({
        id: subCategoriaAEditar.id,
        descripcion: subCategoriaAEditar.nombre
    });
    const fechaActual = new Date();
    const fechaFormateada = format(fechaActual, 'dd/MM/yyyy');

    const actualizarSubCategoria = async (e) => {
        e.preventDefault();
        const docref = doc(db, 'categorias', categoria.id);
        const categorias = await getDoc(docref);
        try {
            const dataCategorias = categorias.data();
            const categoriaIndex = dataCategorias.subcategorias.findIndex((subcategoria) => {
                return subcategoria.id === subCategoriaAEditar.id;
            });

            if (categoriaIndex !== -1) {
                const categoria = dataCategorias.subcategorias[categoriaIndex];
                const subcategorias = dataCategorias.subcategorias.map((subcategoria) => {
                    if (subcategoria.id === subCategoriaAEditar.id) {
                        return {
                            ...subcategoria,
                            nombre: camposCategorias.descripcion,
                            id: camposCategorias.id,
                            fecha: fechaFormateada
                        };
                    } else {
                        return subcategoria;
                    }
                });

                const updatedCategoria = { ...dataCategorias, subcategorias };
                await updateDoc(docref, updatedCategoria);

                console.log('Subcategory label updated successfully');
                setCategoria({nuevaSubcategoria:'', editarSubcategoria:{}})
            } else {
                console.log('Subcategory not found');
            }
        } catch (error) {
            console.error('Error updating subcategory label:', error);
        }
    };

    return (
        <Modal
            camposCategorias={camposCategorias}
            setCamposCategorias={setCamposCategorias}
            handleModal={() => setCategoria({nuevaSubcategoria:'', editarSubcategoria:{}})}
            onSubmit={actualizarSubCategoria}
            title={'Editar Subcategoria'}
            campoId={'subcategoria'}
            campoDescripcion={'subcategoria'}
            buttonText={'Guardar Subcategoria'}
        />
    );
}
