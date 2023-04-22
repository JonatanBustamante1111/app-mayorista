import { useState, useEffect } from 'react'
import { updateDoc, getDoc, doc } from 'firebase/firestore'
import { db } from '../utils/firebaseconfig';
import NuevaCategoria from '../components/admin/NuevaCategoria';
import EditarCategoria from '../components/admin/EditarCategoria';
import EditarSubcategoria from '../components/admin/EditarSubcategoria';
import NuevaSubcategoria from '../components/admin/NuevaSubcategoria';

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    // Estados para manejar las busquedas de los categorias
    const [busqueda, setBusqueda] = useState('')
    const [categoriasBuscadas, setCategoriasBuscadas] = useState([])

    const [categoriaAEditar, setCategoriaAEditar] = useState(null)
    const [subCategoriaAEditar, setSubCategoriaAEditar] = useState(null)
    const [ categoriaId, setCategoriaId ] = useState(null)
    // estados para las categorias renderizadas
    const [subcategoriasDesplegables, setSubCategoriasDesplegables] = useState(null)

    const [open, setOpen] = useState(false)
    // Estado para las categorias
    const [modal, setModal] = useState(false)
    // Estado para las subcategorias
    const [modalSubcategoria, setModalSubcategoria] = useState(false)
    // Read Products
    const consultarCategorias = async () => {
        const docref = doc(db, "utilidades", "categorias")
        const categorias = await getDoc(docref)
        setCategorias(categorias.data().categorias)
        //setCategorias(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    console.log(categoriaAEditar)
    useEffect(() => {
        consultarCategorias();
    }, []);


    // Delete 
    const eliminarCategoria = async (id) => {
        const docref = doc(db, "utilidades", "categorias");
        const categorias = await getDoc(docref);
        const categoriasActualizadas = categorias.data().categorias.filter(categoria => categoria.id !== id);
        await updateDoc(docref, { categorias: categoriasActualizadas });
        consultarCategorias();
    };

    const buscarCategorias = (e) => {
        e.preventDefault()
        const buscar = categorias.filter(cat => cat.nombre.toLowerCase().includes(busqueda.toLowerCase()));
        setCategoriasBuscadas(buscar)
    }
    const handleModal = () => {
        // setIdProducto(null)
        setModal(!modal)
    }
    return (
        <main className='w-[65%] absolute flex flex-col left-1/4 '>
            {
                modal && <NuevaCategoria handleModal={handleModal} />
            }
            {
                categoriaAEditar !== null && <EditarCategoria categoriaAEditar={categoriaAEditar} setCategoriaAEditar={setCategoriaAEditar} handleModal={handleModal} />
            }
            {
                subCategoriaAEditar !== null && <EditarSubcategoria subCategoriaAEditar={subCategoriaAEditar} setSubCategoriaAEditar={setSubCategoriaAEditar} handleModal={handleModal}/>
            }
            {
                modalSubcategoria && <NuevaSubcategoria setModalSubcategoria={setModalSubcategoria} categoriaId={categoriaId} handleModal={handleModal} /> 
            }
            <section className='grid grid-rows-2'>
                <article className="flex w-full items-center justify-between m-8 ">
                    <form
                        className="w-[532px]  relative flex flex-col"
                        onSubmit={buscarCategorias}
                    >
                        <input
                            type="search"
                            className="
                                bg-transparent font-normal text-xs py-2 px-3 border-[1px] border-secundario 
                                rounded-lg text-blanco focus:outline-none
                                "
                            placeholder="Buscar categorias por nombre"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <div className="absolute text-blanco right-4 top-2">
                            <button type="submit">
                                <ion-icon name="search"></ion-icon>
                            </button>
                        </div>
                    </form>
                    <div className=" flex  items-center gap-x-1 text-secundario text-xl font-medium ">
                        <ion-icon name="add-sharp"></ion-icon>
                        <button onClick={handleModal}>
                            Nueva Categoria
                        </button>
                    </div>
                </article>
                <article>

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
                                    <button onClick={() => setCategoriaAEditar(categoria)} className=" text-blanco">
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
                                    {categoria.subcategorias.map((subcategoria) => (
                                        <div
                                            key={subcategoria.id}
                                            className='grid grid-cols-4 w-[95%] mx-auto py-3 border-b last:border-none border-blanco '
                                        >
                                            <p className='font-normal text-base text-blanco'>{subcategoria.id}</p>
                                            <p className='font-medium text-base text-blanco'>{subcategoria.nombre}</p>
                                            <p className='font-normal text-base text-blanco'>{subcategoria.fecha}</p>
                                            <div className="flex justify-end items-center  text-center text-xl  gap-x-7 ">
                                                <button
                                                    onClick={() => setModal(true)}
                                                    className="text-rojo"
                                                >
                                                    <ion-icon name="trash-sharp"></ion-icon>
                                                </button>
                                                <button onClick={() => setSubCategoriaAEditar(subcategoria)} className=" text-blanco">
                                                    <ion-icon name="pencil-sharp"></ion-icon>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className=" flex w-full p-5  justify-start items-center text-secundario text-lg font-medium ">
                                        <ion-icon name="add-sharp"></ion-icon>
                                        <button onClick={() =>{ setModalSubcategoria(true), setCategoriaId(categoria.id)}}>
                                            Nueva Subcategoria
                                        </button>
                                    </div>
                                </div>
                            )}

                        </article>
                    )
                })}

            </section>
        </main>
    )
}

