import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { db } from '../utils/firebaseconfig'
import Swal from 'sweetalert2'
import { categorias } from '../utils/categorias'
import { collection, getDocs, doc, updateDoc, query, where, deleteDoc } from 'firebase/firestore';
import { writeBatch } from "firebase/firestore";


export default function AdminInicio() {
    const [categoriaSeleccionada,setCategoriaSeleccionada] = useState('')
    const [subCategoriasSeleccionada,setSubCategoriaSeleccionada] = useState('')
    const categoriaFind = categorias.find(cat => cat.label === categoriaSeleccionada);
    const [productos, setProductos] = useState([])
    const [porcentaje,setPorcentaje] = useState('')
    console.log(categoriaSeleccionada)
    console.log(subCategoriasSeleccionada)
    const consultarProductos = async () => {
        const data = await getDocs(collection(db, "productos"));
        setProductos(
            data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        )
    }
    useEffect(() => {
        consultarProductos()
    }, [])
        
    const handleChangeCategoria = (e) => {
        setCategoriaSeleccionada(e.target.value)
    }
    const actualizarPrecio = async () => {
        const productosRef = collection(db, 'productos');
        const productosQuery = subCategoriasSeleccionada 
          ? query(productosRef, where('categoria', '==', categoriaSeleccionada), where('subcategoria', '==', subCategoriasSeleccionada))
          : query(productosRef, where('categoria', '==', categoriaSeleccionada));
        const productosSnapshot = await getDocs(productosQuery);
      
        const batch = writeBatch(db);   
        productosSnapshot.forEach((doc) => {
          const producto = doc.data();
          const precioAnterior = producto.precio;
          const nuevoPrecio = precioAnterior * (1 + porcentaje / 100);
          const productoRef = doc.ref;
          batch.update(productoRef, { precio: nuevoPrecio });
        });
      
        await batch.commit();
        Swal.fire(
          'Actualizado!',
          'El precio de los productos fue actualizado correctamente.',
          'success'
        );
        consultarProductos();
        setPorcentaje('');
        setPorcentaje('');
      }
    const eliminarProducto =  id => {
        const documento_A_Eliminar = doc(db, 'productos', id)
        Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertir el cambio!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText:'Cancelar',
            confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(documento_A_Eliminar).then(() => {
                    consultarProductos()
                    Swal.fire(
                        'Eliminado!',
                        'El producto fue eliminado correctamente.',
                        'success'
                    )
                }).catch((error) => {
                    console.error("Error eliminando el documento: ", error);
                });
            }
        })
    }
      
    return (
        <main className='w-full h-full'>
            <h1 className='text-center text-cyan-700 font-bold uppercase text-2xl pt-20 tracking-widest'>admin</h1>
            <div className="mb-4">
                <label
                    className="text-gray-800 "
                    htmlFor="categoria"
                >Seleccionar categoria:</label>
                <select
                    name="categoria"
                    id="categoria"
                    className='w-full py-3 text-center'
                    value={categoriaSeleccionada}
                    onChange={handleChangeCategoria}
                >
                    <option value="">-- Seleccione la Categoria --</option>
                    {
                        categorias.map((categoria, i) => (<option key={i} value={categoria.label}>{categoria.label}</option>))
                    }
                </select>

            </div>
            {

                 categoriaFind && categoriaFind.children && categoriaFind.children.length > 0 && (
                    <div className="mb-4">
                        <label className="text-gray-800" htmlFor="subcategoria">Subcategoría:</label>
                        <select 
                            className='w-full py-3 text-center' 
                            id="subcategoria"
                            value={subCategoriasSeleccionada}
                            onChange={e => {
                                setSubCategoriaSeleccionada(e.target.value) 
                               
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
            <div>
                <label htmlFor="">Ingrese el porcentaje</label>
                <input value={porcentaje} type="number" onChange={(e) => setPorcentaje(e.target.value)}/>
                <button onClick={actualizarPrecio}>AUMENTAR PRECIO</button>
            </div>
            <div className='flex items-center text-cyan-400 text-2xl text-center mt-10 justify-center'>
                <Link to='/admin/nuevoproducto'><ion-icon name="add"></ion-icon>
                    Nuevo Producto
                </Link>
            </div>
            <h2 className='text-center py-8 font-semibold text-teal-400'> Productos</h2>
            <section className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 w-[80%] mx-auto'>

                {
                    productos.map(producto =>
                        <Card key={producto.id} producto={producto} eliminarProducto={eliminarProducto} />
                    )
                }
            </section>
        </main>
    )
}
