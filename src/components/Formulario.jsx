import { categorias } from '../utils/categorias'

export default function Formulario({
    handleChangeArchivo,
    camposProducto,
    setCamposProducto,
    inputFileRef,
    imagenUrl,
    setSubCategoria
}) {

    
    const handleChangeCategoria = (e) => {
        setCamposProducto({
            ...camposProducto,
            categoria:e.target.value
        })
        console.log(e.target.value)
    }
    // Metodo para acceder al objeto de la categoria seleccionada
    const categoriaFind = categorias.find(cat => cat.label === camposProducto.categoria);
   
    return (
        <div className='bg-terciario'>
            {/*  En el onChange se crea una copia del objeto actual  y se reemplaza el campo seleccionado por el valor nuevo del input*/}
            <div className="mb-8 ">
                <input
                    id="nombre"
                    type="text"
                    className=" grid grid-cols-3 place-items-center p-3  border-secundario border rounded-xl text-secundario bg-inherit w-full"
                    placeholder="Nombre del Producto"
                    name="nombre"
                    value={camposProducto.nombre}
                    onChange={(e) => setCamposProducto({ ...camposProducto, nombre: e.target.value })}
                />
            </div>
            <div className="mb-8">
                <input
                    id="precio"
                    type="number"
                    className=" grid grid-cols-3 place-items-center p-3  border-secundario border rounded-xl  bg-inherit w-full text-secundario"
                    placeholder="Precio del Producto"
                    name="precio"
                    value={camposProducto.precio}
                    onChange={(e) => setCamposProducto({ ...camposProducto, precio: e.target.value })}
                />
            </div>
            <div className="mb-8">
                <input
                    id="descripcion"
                    type="text"
                    className=" grid grid-cols-3 place-items-center p-3  border-secundario border rounded-xl  bg-inherit w-full text-secundario"
                    placeholder="Descripcion del Producto"
                    value={camposProducto.descripcion}
                    onChange={(e) => setCamposProducto({ ...camposProducto, descripcion: e.target.value })}
                />
            </div>
            <div className="mb-8">
                <select
                    name="categoria"
                    id="categoria"
                    className=" grid grid-cols-3 place-items-center p-3  border-secundario border rounded-xl text-secundario bg-inherit w-full"
                    value={camposProducto.categoria}
                    onChange={handleChangeCategoria}
                >
                    <option value="" >-- Seleccione la Categoria --</option>
                    {
                        categorias.map((categoria, i) => (<option key={i} value={categoria.label}>{categoria.label}</option>))
                    }
                </select>

            </div>
            {

                 categoriaFind && categoriaFind.children && categoriaFind.children.length > 0 && (
                    <div className="mb-4">
                        <select 
                             className=" grid grid-cols-3 place-items-center p-3  border-secundario text-secundario border rounded-xl  bg-inherit w-full"
                            id="subcategoria"
                            value={camposProducto.subcategoria}
                            onChange={e => {
                                setSubCategoria(e.target.value) 
                                setCamposProducto({...camposProducto, subcategoria:e.target.value})
                            }}
                            >
                            <option value="">Seleccione una subcategoría</option>
                            {categoriaFind.children.map(subcategoria => (
                                <option key={subcategoria.id} value={subcategoria.label}>
                                    {subcategoria.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )
          
            }
            <div className="mb-4">
                {
                    imagenUrl === null &&
                    <img src={camposProducto.imagen} className='h-40 w-32 py-3 mx-auto' alt={`Imagen del producto ${camposProducto.nombre}`} />
                }
                <label
                    className="text-gray-800"
                    htmlFor="imagen"
                >Seleccionar imagen</label>
                <input
                    id="imagen"
                    type="file"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Selecciona la imagen"
                    name="imagen"
                    ref={inputFileRef}
                    onChange={(e) => {
                        handleChangeArchivo(e),
                            setCamposProducto({ ...camposProducto, imagen: e.target.files[0].name })
                    }}
                />
            </div>

        </div>
    )
}
