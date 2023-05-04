import { useState, useEffect } from 'react'
import { updateDoc, getDoc, doc, onSnapshot, collection, deleteDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig';
import NuevaCategoria from '../../components/admin/NuevaCategoria';
import EditarCategoria from '../../components/admin/EditarCategoria';
import EditarSubcategoria from '../../components/admin/EditarSubcategoria';
import NuevaSubcategoria from '../../components/admin/NuevaSubcategoria';
import BorrarProducto from '../../components/BorrarProducto'
import Subcategoria from '../../components/admin/Subcategoria';

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    //  Estados para manejar las busquedas de los categorias
    const [busqueda, setBusqueda] = useState('')
    const [categoriasBuscadas, setCategoriasBuscadas] = useState([])

    // estados para las categorias renderizadas
    const [subcategoriasDesplegables, setSubCategoriasDesplegables] = useState(null)
    // Estado para el dropdown de las subcategorias
    const [open, setOpen] = useState(false)
    // Estado para las categorias
    const [modal, setModal] = useState(false)
    const [categoria, setCategoria] = useState({
        nueva: false,
        editar: {},
        nuevaSubcategoria: '',
        editarSubcategoria: {}
    });
    // estado para editar la subcategoria
    const [subCategoriaAEditar, setSubCategoriaAEditar] = useState({})

    // Eliminar categorias y subcategorias
    const [idCategoriaAELiminar, setIdCategoriaAEliminar] = useState(null)
    const [idSubCategoriaAELiminar, setIdSubCategoriaAEliminar] = useState(null)
    // Read Products
    useEffect(() => {
        const docRef = collection(db, "categorias");
        // Escuchar cambios en tiempo real en el documento
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const categorias = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            setCategorias(categorias);
            console.log(categorias)
        });
        return () => unsubscribe();
    }, []);


    // Delete 
    const eliminarCategoria = (id) => {
        const documento_A_Eliminar = doc(db, "categorias", id);
        deleteDoc(documento_A_Eliminar)
    };
    const buscarCategorias = (e) => {
        e.preventDefault()
        const buscar = categorias.filter(cat => cat.nombre.toLowerCase().includes(busqueda.toLowerCase()));
        setCategoriasBuscadas(buscar)
    }
    const handleModal = () => {
        setModal(!modal)
    }
    const eliminarSubcategoria = async (categoriaId, subcategoriaId) => {
        const docref = doc(db, "categorias", categoriaId);
        const categoria = await getDoc(docref);
        const subCategoriasActualizadas = categoria?.data()?.subcategorias?.filter(subcategoria => subcategoria.id !== subcategoriaId);
        await updateDoc(docref, { subcategorias: subCategoriasActualizadas });
    }
    const mostrarModal = () => {
        switch (true) {
            case categoria.nueva:
                return <NuevaCategoria handleModal={ () => setCategoria({ nueva: false, nuevaSubcategoria:'' }) } />;

            case categoria.editar && Object.keys(categoria.editar).length !== 0:
                return <EditarCategoria categoriaAEditar={categoria.editar} setCategoriaAEditar={setCategoria} handleModal={handleModal} />;

            case categoria.nuevaSubcategoria !== '' && categoria.nuevaSubcategoria !== null:
                return <NuevaSubcategoria setCategoria={setCategoria} categoriaId={categoria.nuevaSubcategoria} />;

            case categoria.editarSubcategoria && Object.keys(categoria.editarSubcategoria).length !== 0:
                return <EditarSubcategoria categoria={categoria.editarSubcategoria} setCategoria={setCategoria} subCategoriaAEditar={subCategoriaAEditar} handleModal={handleModal} />;

            default:
                return null;
        }
    }

    return (
        <main className='w-[75%] ml-[25%] '>


            {mostrarModal()}

            <section className='grid grid-rows-2'>
                <article className="flex items-center justify-between  my-8 mx-4">
                    <form
                        className="relative w-1/4 flex flex-col"
                        onSubmit={buscarCategorias}
                    >
                        <input
                            type="search"
                            className="
                            bg-transparent font-normal text-xs p-2 border-[1px] border-secundario 
                    rounded-lg text-blanco focus:outline-none
                          "
                            placeholder="Buscar categorias por nombre"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <div className="absolute text-blanco right-2 top-2">
                            <button type="submit">
                                <ion-icon name="search"></ion-icon>
                            </button>
                        </div>
                    </form>
                    <div className=" flex  items-center gap-x-1 text-secundario text-xl font-medium ">
                        <ion-icon name="add-sharp"></ion-icon>
                        <button onClick={() => setCategoria({ nueva: true })}>
                            Nueva Categoria
                        </button>
                    </div>
                </article>
                <article className="w-[90%] pl-4  mb-5 mx-auto grid grid-cols-5 gap-x-10 place-items-start self-center">
                    <p className="text-lg font-medium text-blanco">Id</p>
                    <p className="text-lg font-medium text-blanco">Descripcion</p>
                    <p className="text-lg font-medium text-blanco">Registro</p>
                    <p className="text-lg font-medium text-blanco pl-4">Acciones</p>
                    <p className="text-lg font-medium text-blanco pl-8">Mas</p>
                </article>
            </section>
            <section className='flex flex-col  h-3/4  '>
                {categorias.map((categoria) => {
                    return (
                        <article key={categoria.id} className='border-b last:border-none border-blanco w-[90%] mx-auto py-5'>
                            <div className='grid grid-cols-5 w-full  rounded-xl place-items-center'>
                                <p className='font-semibold text-base text-blanco pr-32'>{categoria.id}</p>
                                <p className='text-blanco'>{categoria.nombre}</p>
                                <p className='text-blanco'>{categoria.fecha}</p>
                                <div className="flex justify-end items-center  text-center text-2xl gap-x-7 px-3">
                                    <button onClick={() => eliminarCategoria(categoria.id)} className="text-rojo w-full">
                                        <ion-icon name="trash-sharp"></ion-icon>
                                    </button>
                                    <button onClick={() => setCategoria({ editar: categoria })} className=" text-blanco">
                                        <ion-icon name="pencil-sharp"></ion-icon>
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        setOpen(!open)
                                        setSubCategoriasDesplegables(categoria)
                                    }}
                                    className={`text-xl text-blanco border-none  duration-300 transform origin-center  
                                        ${open && subcategoriasDesplegables === categoria ? "-rotate-180" : ""}
                                    `}
                                >
                                    <ion-icon name="caret-up"></ion-icon>
                                </button>

                            </div>
                            {subcategoriasDesplegables?.id === categoria.id && open && (
                                <div className="bg-terciario rounded-xl flex flex-col max-h-[392px] overflow-y-auto">
                                    <div className='flex w-full justify-start p-5'>
                                        <h2 className='text-lg font-normal text-blanco'>Subcategorias de {categoria.nombre}</h2>
                                    </div>
                                    <div className='grid grid-cols-4 my-3 px-4'>
                                        <p className='text-sm text-blanco font-semibold'>Id</p>
                                        <p className='text-sm text-blanco font-semibold'>Descripcion</p>
                                        <p className='text-sm text-blanco font-semibold'>Fecha</p>
                                        <p className='text-sm text-blanco font-semibold pl-32'>Acciones</p>
                                    </div>
                                    {categoria.subcategorias?.map((subcategoria) => (
                                        <Subcategoria
                                            key={subcategoria.id}
                                            categoria={categoria}
                                            subcategoria={subcategoria}
                                            setSubCategoriaAEditar={setSubCategoriaAEditar}
                                            eliminarSubcategoria={eliminarSubcategoria}
                                        />
                                    ))}
                                    <div className=" flex w-full p-5  justify-start items-center text-secundario text-lg font-medium ">
                                        <ion-icon name="add-sharp"></ion-icon>
                                        <button onClick={() => setCategoria({ nuevaSubcategoria: categoria.id })}>
                                            Nueva Subcategoria
                                        </button>
                                    </div>
                                </div>
                            )}

                        </article>
                    )
                })}
                {idSubCategoriaAELiminar !== null &&
                    <BorrarProducto
                        eliminarProducto={() => eliminarSubcategoria(idCategoriaAELiminar, idSubCategoriaAELiminar)}
                        setModal={() => setIdSubCategoriaAEliminar(null)}
                        titulo={'Eliminar Subcategoria'}
                        sustantivo={'la subcategoria'}
                        nombre={subcategoria.nombre}
                    />
                }

            </section>
        </main>
    )
}


