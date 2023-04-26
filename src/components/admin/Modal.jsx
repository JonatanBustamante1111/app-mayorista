import React from 'react'

export default function Modal({
    camposCategorias,
    setCamposCategorias,
    title,
    handleModal,
    campoId,
    campoDescripcion,
    onSubmit,
    buttonText
}) {
    return (
        <form
            onSubmit={onSubmit}
            className='bg-terciario flex flex-col px-5 z-20 w-full absolute left-[20%] top-[49px] sm:w-[75%] md:w-[660px] rounded-xl'>

            <div className=' w-full flex justify-between items-center py-5 '>
                <h1 className='text-2xl text-blanco font-semibold text-center '>{title}</h1>
                <button
                    className='text-blanco font-semibold text-3xl '
                    onClick={handleModal}>
                    <ion-icon name="close-sharp"></ion-icon>
                </button>
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
                <label className='text-blanco font-semibold text-base' htmlFor="Id">Id:</label>
                <input
                    required
                    id="Id"
                    type="text"
                    className="p-3 border-secundario border rounded-xl text-blanco font-normal bg-inherit w-full focus:outline-none"
                    placeholder={`Id de la ${campoId}`}
                    name="Id"
                    value={camposCategorias.id}
                    onChange={(e) => setCamposCategorias({ ...camposCategorias, id: e.target.value })}
                />
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
                <label className='text-blanco font-semibold text-base' htmlFor="precio">Descripcion:</label>
                <input
                    required
                    id="Descripcion"
                    type="text"
                    className="p-3 border-secundario border rounded-xl  bg-inherit w-full text-blanco focus:outline-none"
                    placeholder={`Descripcion de la ${campoDescripcion}`}
                    name="Descripcion"
                    value={camposCategorias.descripcion}
                    onChange={(e) => setCamposCategorias({ ...camposCategorias, descripcion: e.target.value })}
                />
            </div>
            <div className='flex justify-center'>
                <button
                    type='submit'
                    className='
                    bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
                    py-4 px-6 rounded-lg font-semibold text-base'>
                    {buttonText}
                </button>
            </div>
        </form>
    )
}
