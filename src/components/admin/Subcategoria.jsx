import React from 'react'

export default function Subcategoria({ subcategoria, categoria, setSubCategoriaAEliminar, setCategoria, setSubCategoriaAEditar }) {
    return (
        <div
            className='grid grid-cols-4 w-[95%] mx-auto py-3 border-b last:border-none border-blanco '
        >
            <p className=' text-blanco'>{subcategoria.id}</p>
            <p className=' text-blanco'>{subcategoria.nombre}</p>
            <p className=' text-blanco'>{subcategoria.fecha}</p>
            <div className="flex justify-end items-center  text-center text-xl  gap-x-7 ">
                <button
                    onClick={() => setSubCategoriaAEliminar({
                        idCategoria:categoria.id, 
                        idSubcategoria:subcategoria.id,
                        nombre:subcategoria.nombre
                    })}
                    className="text-rojo"
                >
                    <ion-icon name="trash-sharp"></ion-icon>
                </button>
                <button onClick={() => {
                    setCategoria({ nuevaSubcategoria: '', editarSubcategoria: categoria })
                    setSubCategoriaAEditar(subcategoria)
                }} className=" text-blanco">
                    <ion-icon name="pencil-sharp"></ion-icon>
                </button>
            </div>
        </div>
    )
}
