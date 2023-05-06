import { useState } from 'react'
import Subcategoria from './Subcategoria';


export default function Categoria({ categoria, setCategoriaAcciones, setCategoriaAEliminar, setSubCategoriaAEditar, setSubCategoriaAEliminar }) {
    // estados para las categorias renderizadas
    const [subcategoriasDesplegables, setSubCategoriasDesplegables] = useState(null);
    // Estado para el dropdown de las subcategorias
    const [open, setOpen] = useState(false);

    return (
        <article
            className="border-b last:border-none border-blanco w-[90%] mx-auto py-5"
        >
            <div className="grid grid-cols-5 w-full  rounded-xl place-items-center">
                <p className=" e text-blanco pr-32">
                    {categoria.idDoc}
                </p>
                <p className="text-blanco">{categoria.nombre}</p>
                <p className="text-blanco">{categoria.fecha}</p>
                <div className="flex justify-end items-center  text-center  gap-x-7 px-3">
                    <button
                        onClick={() => setCategoriaAEliminar({
                            idCategoria: categoria.id,
                            nombre: categoria.nombre
                        })}
                        className="text-rojo w-full"
                    >
                        <ion-icon name="trash-sharp"></ion-icon>
                    </button>
                    <button
                        onClick={() => setCategoriaAcciones({ editar: categoria })}
                        className=" text-blanco"
                    >
                        <ion-icon name="pencil-sharp"></ion-icon>
                    </button>
                </div>

                <button
                    onClick={() => {
                        setOpen(!open);
                        setSubCategoriasDesplegables(categoria);
                    }}
                    className={`text-xl text-blanco border-none  duration-300 transform origin-center  
                                        ${open &&
                            subcategoriasDesplegables ===
                            categoria
                            ? "-rotate-180"
                            : ""
                        }
                                    `}
                >
                    <ion-icon name="caret-up"></ion-icon>
                </button>
            </div>
            {subcategoriasDesplegables?.id === categoria.id && open && (
                <div className="bg-terciario rounded-xl flex flex-col max-h-[392px] overflow-y-auto">
                    <div className="flex w-full justify-start p-5">
                        <h2 className="text-lg font-normal text-blanco">
                            Subcategorias de {categoria.nombre}
                        </h2>
                    </div>
                    <div className="grid grid-cols-4 my-3 px-4">
                        <p className="text-sm text-blanco font-semibold">Id</p>
                        <p className="text-sm text-blanco font-semibold">
                            Descripcion
                        </p>
                        <p className="text-sm text-blanco font-semibold">Fecha</p>
                        <p className="text-sm text-blanco font-semibold pl-32">
                            Acciones
                        </p>
                    </div>
                    {categoria.subcategorias?.map((subcategoria) => (
                        <Subcategoria
                            key={subcategoria.id}
                            setCategoriaAcciones={setCategoriaAcciones}
                            categoria={categoria}
                            subcategoria={subcategoria}
                            setSubCategoriaAEditar={setSubCategoriaAEditar}
                            setSubCategoriaAEliminar={setSubCategoriaAEliminar}
                        />
                    ))}
                    <div className=" flex w-full p-5  justify-start items-center text-secundario text-lg font-medium ">
                        <ion-icon name="add-sharp"></ion-icon>
                        <button
                            onClick={() =>
                                setCategoriaAcciones({ nuevaSubcategoria: categoria.id })
                            }
                        >
                            Nueva Subcategoria
                        </button>
                    </div>
                </div>
            )}
        </article>
    )
}
