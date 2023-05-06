import { collection, onSnapshot } from 'firebase/firestore'
import Pedido from '../../components/admin/Pedido'
import { db } from '../../utils/firebaseconfig'
import { useEffect, useState } from 'react'



const Pedidos = () => {
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        const docRef = collection(db, "pedidosCliente");
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const pedidos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setPedidos(pedidos);
        });
        return () => unsubscribe();
    }, []);
    return (
        <main className='w-[75%] ml-[25%]'>
            <section>

                <article className="w-[90%] mt-20 mb-5 mx-auto grid grid-cols-[2fr,2fr,1fr,1fr,1fr] gap-x-10 place-items-start self-center">
                    <p className="text-lg font-medium text-blanco">Total del pedido</p>
                    <p className="text-lg font-medium text-blanco">Nombre / Apellido</p>
                    <p className="text-lg font-medium text-blanco">Fecha</p>
                    <p className="text-lg font-medium text-blanco">Estado</p>
                    <p className="text-lg font-medium text-blanco">Ver pedido</p>
                </article>
            </section>
            <section className="flex flex-col  h-3/4  overflow-auto ">
                {pedidos.map(pedido => (
                    pedido.status === 'approved'
                        ? <Pedido key={pedido.id} pedido={pedido} />
                        : null
                ))}
            </section>
        </main>
    )
}
export default Pedidos