import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { db } from '../utils/firebaseconfig'
import Swal from 'sweetalert2'

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

export default function AdminInicio() {
    const [productos, setProductos] = useState([])

    const consultarProductos = async () => {
        const data = await getDocs(collection(db, "productos"));
        setProductos(
            data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        )
    }
    useEffect(() => {
        consultarProductos()
    }, [])

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
                 deleteDoc(documento_A_Eliminar)
                consultarProductos()
                Swal.fire(
                    'Eliminado!',
                    'El producto fue eliminado correctamente.',
                    'success'
                )
            }
        })

    }
    return (
        <main className='w-full h-full'>
            <h1 className='text-center text-cyan-700 font-bold uppercase text-2xl pt-20 tracking-widest'>admin</h1>

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
