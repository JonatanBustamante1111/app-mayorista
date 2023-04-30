import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebaseconfig';
import Button from '../../components/reutilizables/Button';



export default function PedidoInfo() {

    const [dato, setDato] = useState({})
    const { pedidoId } = useParams();
    const navigate = useNavigate()
    const [estadoDelPedido, setEstadoDelPedido] = useState('');

    const { nombre, apellido, email, direccion, localidad, codigoPostal, provinciaSeleccionada, piso, datos, id, date } = dato;


    let fondoDelSelect = 'bg-secundario'

    switch (estadoDelPedido) {
        case 'En proceso':
            fondoDelSelect = 'bg-secundario';
            break;
        case 'Enviado':
            fondoDelSelect = 'bg-[#34A853]';
            break;
        case 'Cancelado':
            fondoDelSelect = 'bg-[#F24236]';
            break;
        default:
            fondoDelSelect = 'bg-secundario';
    }

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
                <article className='w-full flex flex-start p-8'>
                    <div
                        onClick={() => navigate(-1)}
                        className='text-secundario font-medium text-xl flex items-center gap-x-2 cursor-pointer'>
                        <ion-icon name="arrow-back"></ion-icon>
                        <p>Volver</p>
                    </div>
                </article>
                <article className='w-full flex justify-between px-8 '>
                    <div className=' flex flex-col gap-y-4'>
                        <p className='text-3xl font-medium text-blanco'>N° de pedido:{''} <span className='font-bold'> 0000003 </span></p>
                        <p className='text-xl font-medium text-blanco'>Fecha: <span className='font-bold'> 30/04/23 </span></p>
                    </div>
                    <div>
                        <select
                            onChange={(e) => setEstadoDelPedido(e.target.value)}
                            className={`py-3 rounded-xl px-2 text-blanco font-medium ${fondoDelSelect} bg-opacity-70`}
                            name=""
                            id=""
                            value={estadoDelPedido}
                        >
                            <option value="En proceso">En proceso</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                </article>
            </section>
            <section>
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
                            <p className='text-gray-400 font-normal text-lg '>{provinciaSeleccionada ?? '-'}</p>
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
