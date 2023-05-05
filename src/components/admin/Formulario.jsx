import { useState, useEffect } from "react"
import { getDocs, collection } from 'firebase/firestore'
import { db } from "../../utils/firebaseconfig"

export default function Formulario({
    handleChangeArchivo,
    camposProducto,
    setCamposProducto,
    inputFileRef,
    imagenUrl,
    setSubCategoria,
    proveedores

}) {
    // const [proveedores,setProveedores] = useState([])
    // const consultarProveedor = async () => {
    //     const producto = collection(db, "proveedores")
    //     const querySnapshot = await getDocs(producto)
    //     const datos = querySnapshot.docs.map(doc => doc.data().nombre)
    //     setProveedores(datos)
    //   }
      
    //   useEffect(() => {
    //     consultarProveedor()
    //   }, [])
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const consultarCategorias = async () => {
            const data = await getDocs(collection(db, 'categorias'))
            setCategorias(
                data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            )
        }
        consultarCategorias()
    }, [])

    const handleChangeProveedor = (e) =>{
        setCamposProducto({
            ...camposProducto,
            proveedor: e.target.value
        })
        console.log(e.target.value)
    }
    const handleChangeCategoria = (e) => {
        setCamposProducto({
            ...camposProducto,
            categoria: e.target.value
        })
        console.log(e.target.value)
    }

    // Metodo para acceder al objeto de la categoria seleccionada
    const categoriaFind = categorias.find(cat => cat.nombre === camposProducto.categoria);

    return (
        <div className='bg-terciario max-h-[448px] overflow-y-scroll px-3'>
            {/*  En el onChange se crea una copia del objeto actual  y se reemplaza el campo seleccionado por el valor nuevo del input*/}
            <div className="mb-8 flex flex-col gap-y-2">
                <label className='text-blanco font-semibold text-base' htmlFor="nombre">Nombre:</label>
                <input
                    required
                    id="nombre"
                    type="text"
                    className="p-3 border-secundario border rounded-xl text-blanco font-normal bg-inherit w-full focus:outline-none"
                    placeholder="Nombre del Producto"
                    name="nombre"
                    value={camposProducto.nombre}
                    onChange={(e) => setCamposProducto({ ...camposProducto, nombre: e.target.value })}
                />
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
                <label className='text-blanco font-semibold text-base' htmlFor="precio">Precio:</label>
                <input
                    required
                    id="precio"
                    type="number"
                    className="p-3 border-secundario border rounded-xl  bg-inherit w-full text-blanco focus:outline-none"
                    placeholder="Precio del Producto"
                    name="precio"
                    value={camposProducto.precio}
                    onChange={(e) => setCamposProducto({ ...camposProducto, precio: e.target.value })}
                />
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
                <label className='text-blanco font-semibold text-base' htmlFor="stock">Stock:</label>
                <input
                    required
                    id="stock"
                    type="number"
                    className="p-3 border-secundario border rounded-xl  bg-inherit w-full text-blanco focus:outline-none"
                    placeholder="Stock del Producto"
                    name="stock"
                    value={camposProducto.stock}
                    onChange={(e) => setCamposProducto({ ...camposProducto, stock: e.target.value })}
                />
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
                <label className='text-blanco font-semibold text-base' htmlFor="descripcion">Descripcion:</label>
                <input
                    required
                    id="descripcion"
                    type="text"
                    className="p-3 border-secundario border rounded-xl  bg-inherit w-full text-blanco focus:outline-none"
                    placeholder="Descripcion del Producto"
                    value={camposProducto.descripcion}
                    onChange={(e) => setCamposProducto({ ...camposProducto, descripcion: e.target.value })}
                />
            </div>
            <div className="mb-8 flex flex-col gap-y-2">
                <label className='text-blanco font-semibold text-base' htmlFor="provedor">Provedor:</label>
                <select
                    required
                    name="provedor"
                    id="provedor"
                    className=" p-3 bg-terciario text-center border-secundario border rounded-xl text-blanco focus:outline-none bg-inherit w-full"
                    value={camposProducto.proveedores}
                    onChange={handleChangeProveedor}
                >
                    <option value="" >-- Seleccione el proveedor --</option>
                    {proveedores.map((proveedor, i) => (
                        <option key={i} value={proveedor.nombre}>
                            {proveedor.nombre}
                        </option>
                    ))}
                </select>

            </div>
            <div className="mb-8 flex flex-col gap-y-2">
                <label className='text-blanco font-semibold text-base' htmlFor="categoria">Categoria:</label>
                <select
                    name="categoria"
                    id="categoria"
                    className=" p-3 bg-terciario text-center border-secundario border rounded-xl text-blanco focus:outline-none bg-inherit w-full"
                    value={camposProducto.categoria}
                    onChange={handleChangeCategoria}
                >
                    <option value="" >-- Seleccione la Categoria --</option>
                    {
                        categorias.map((categoria) => (<option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>))
                    }
                </select>

            </div>
            {

                categoriaFind && categoriaFind.subcategorias && categoriaFind.subcategorias.length > 0 && (
                    <div className="mb-4 flex flex-col gap-y-2">
                        <label className='text-blanco font-semibold text-base' htmlFor="subcategoria">Subcategoria:</label>
                        <select
                            className="p-3 bg-terciario text-center border-secundario text-blanco border rounded-xl focus:outline-none bg-inherit w-full"
                            id="subcategoria"
                            value={camposProducto.subcategoria}
                            onChange={e => {
                                setSubCategoria(e.target.value)
                                setCamposProducto({ ...camposProducto, subcategoria: e.target.value })
                            }}
                        >
                            <option value="">Seleccione una subcategoría</option>
                            {categoriaFind.subcategorias.map(subcategoria => (
                                <option key={subcategoria.id} value={subcategoria.nombre}>
                                    {subcategoria.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                )

            }
            <div className="mb-8 flex flex-col gap-y-2">
                <label className='text-blanco font-semibold text-base' htmlFor="destacado">Destacar producto:</label>
                <select
                    required
                    name="destacado"
                    id="destacado"
                    className=" p-3 bg-terciario text-center border-secundario border rounded-xl text-blanco focus:outline-none bg-inherit w-full"
                    value={camposProducto.destacado}
                    onChange={e => setCamposProducto({
                        ...camposProducto,
                        destacado: e.target.value
                    })}
                >
                    <option value="" >-- Seleccione una opcion --</option>
                    <option value="no">No</option>
                    <option value="si">Si</option>
                </select>

            </div>
            <div className="mb-4 flex flex-col gap-y-2">
                {
                    imagenUrl === null &&
                    <img src={camposProducto.imagen} className='py-3 mx-auto' alt={`Imagen del producto ${camposProducto.nombre}`} />
                }
                <label
                    className="text-blanco text-base font-semibold"
                    htmlFor="imagen"
                >Seleccionar imagen:</label>
                <input
                    id="imagen"
                    type="file"
                    className="mt-2 block w-full p-3 text-blanco"
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
