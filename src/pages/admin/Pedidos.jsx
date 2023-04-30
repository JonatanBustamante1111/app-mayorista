import { collection, getDocs } from 'firebase/firestore'
import Pedido from '../../components/admin/Pedido'
import { db } from '../../utils/firebaseconfig'
import { useEffect, useState } from 'react'


const Pedidos = () => {
    const [pedidos, setPedidos] = useState([])
    const consultarPedidos = async () => {
        const data = await getDocs(collection(db, "pedidosCliente"));
        setPedidos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(pedidos)
    }
    useEffect(() => {
        consultarPedidos()
    }, [])
    return (
        <main className='w-[75%] ml-[25%]'>
            <section>
                
                <article className="w-[90%] mt-20 mb-5 mx-auto grid grid-cols-[2fr,2fr,1fr,1fr,1fr] gap-x-10 place-items-start self-center">
                    <p className="text-lg font-medium text-blanco">Numero de pedido</p>
                    <p className="text-lg font-medium text-blanco">Nombre</p>
                    <p className="text-lg font-medium text-blanco">fecha</p>
                    <p className="text-lg font-medium text-blanco">Estado</p>
                    <p className="text-lg font-medium text-blanco">ver pedido</p>
                </article>
            </section>
            <section className="flex flex-col  h-3/4  overflow-auto ">
                {

                    pedidos.map(pedido =>
                        <Pedido key={pedido.id} pedido={pedido} />
                    )
                }
            </section>
        </main>
    )
}
export default Pedidos