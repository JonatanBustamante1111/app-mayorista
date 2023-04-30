import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig';
import Card from "../../components/reutilizables/Card";
import Button from '../../components/reutilizables/Button';



export default function PedidoInfo() {

    const [dato, setDato] = useState({})

    const { nombre, apellido, email, direccion, localidad, codigoPostal, provincia, piso, datos, id } = dato;
    const { pedidoId } = useParams();
    const navigate = useNavigate()

    console.log(id)
    const getProducto = async () => {
        const docRef = doc(db, "pedidosCliente", pedidoId);
        const result = await getDoc(docRef);

        if (result.exists()) {
            const pedidoData = { id: pedidoId, ...result.data() };
            setDato(pedidoData);
        } else {
            console.log("no such document");
        }
    }

    const eliminarPedido = async (id) => {
        const docRef = doc(db, 'pedidosCliente', id)
        await deleteDoc(docRef)
        navigate(-1)
    }

    useEffect(() => {
        getProducto();
    }, []);

    return (
        <main className='w-[75%] ml-[25%]'>
            <section>
                <h2 className="text-blanco text-xl font-semibold text-center ">Aca van a ir los pedidos</h2>
                <article className="w-[90%] mt-20 mb-5 mx-auto grid grid-cols-[2fr,2fr,1fr,1fr,1fr] gap-x-10 place-items-start self-center">
                    <p className="text-lg font-medium text-blanco">Imagen</p>
                    <p className="text-lg font-medium text-blanco">Nombre</p>
                    <p className="text-lg font-medium text-blanco">Cant.</p>
                    <p className="text-lg font-medium text-blanco">Precio</p>
                    <p className="text-lg font-medium text-blanco">Proveedores</p>
                </article>
            </section>

            <section className="flex flex-col  h-3/4  overflow-auto ">
                {
                    datos?.map(producto => {
                        const { nombre, imagen, cantidad, proveedor, precio } = producto
                        console.log(producto)
                        return (
                            <article className=" border-b last:border-none border-blanco w-[90%] mx-auto py-5">
                                <div className="grid grid-cols-[1fr,2fr,1fr,1fr,1fr] gap-x-4 rounded-xl place-items-center ">
                                    <img
                                        src={imagen}
                                        className="object-cover rounded-xl"
                                        alt={`Imagen de ${nombre}`}
                                    />
                                    <h3 className="font-bold  text-blanco text-center text-lg">{nombre}</h3>
                                    <p className="font-medium text-xl text-center text-blanco">{cantidad}</p>
                                    <p className="font-semibold  text-2xl text-center text-blanco">${precio}</p>
                                    <p className="font-semibold  text-2xl text-center text-blanco">{proveedor}</p>
                                </div>
                            </article>
                        )
                    })
                }
            </section>

            <section className='grid grid-cols-3 mt-10'>
                <article className='flex flex-col px-10'>
                    <h3 className='text-2xl text-blanco font-semibold'>Datos del comprador</h3>
                    <div className='grid grid-cols-2 gap-x-2'>
                        <div className='flex flex-col gap-y-5 py-5'>
                            <p className='font-medium text-lg text-blanco'>Nombre</p>
                            <p className='font-medium text-lg text-blanco'>Apellido</p>
                            <p className='font-medium text-lg text-blanco'>Email</p>
                        </div>
                        <div className='flex flex-col gap-y-5 py-5'>
                            <p className='text-gray-400 font-normal text-lg'>{nombre ?? '-'}</p>
                            <p className='text-gray-400 font-normal text-lg'>{apellido ?? '-'}</p>
                            <p className='text-gray-400 font-normal text-lg'>{email ?? '-'}</p>
                        </div>
                    </div>
                </article>
                <article className='flex flex-col px-10'>
                    <h3 className='text-2xl text-blanco font-semibold'>Datos de envio</h3>
                    <div className='grid grid-cols-2 gap-x-2'>
                        <div className='flex flex-col gap-y-5 py-5'>
                            <p className='font-medium text-lg text-blanco'>Direccion</p>
                            <p className='font-medium text-lg text-blanco'>Piso</p>
                            <p className='font-medium text-lg text-blanco'>Localidad</p>
                            <p className='font-medium text-lg text-blanco'>Provincia</p>
                            <p className='font-medium text-lg text-blanco'>Codigo postal</p>
                        </div>
                        <div className='flex flex-col gap-y-5 py-5'>
                            <p className='text-gray-400 font-normal text-lg '>{direccion ?? '-'}</p>
                            <p className='text-gray-400 font-normal text-lg '>{piso ?? '-'}</p>
                            <p className='text-gray-400 font-normal text-lg '>{localidad ?? '-'}</p>
                            <p className='text-gray-400 font-normal text-lg '>{provincia ?? '-'}</p>
                            <p className='text-gray-400 font-normal text-lg '>{codigoPostal ?? '-'}</p>
                        </div>
                    </div>
                </article>
                <article className='flex flex-col flex-end justify-end h-96'>
                    <Button onClick={() => eliminarPedido(id)}>Eliminar pedido</Button>
                </article>
            </section>
        </main>
    )
}
