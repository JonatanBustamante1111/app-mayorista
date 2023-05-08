import { Link } from "react-router-dom";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseconfig";
import Swal from 'sweetalert2'

export default function Pedido({ pedido }) {
    const { nombre, apellido, id, fecha, estado,total_amount } = pedido
    let fondoDelSelect = 'bg-secundario'

    

    switch (estado) {
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

    const handleChangeEstadoDelPedido = async (newState) => {
        const docRef = doc(db, 'pedidosCliente', id)
        await updateDoc(docRef, {
            estado: newState
        })
        Swal.fire({
            icon: "success",
            title: "¡Estado del pedido actualizado!",
          })
    }

    return (
        <article className="py-3 mx-auto w-[95%]  grid grid-cols-[1fr,2fr,1fr,1fr,1fr] gap-x-4  place-items-center  last:border-none border-b border-gray-200">
            <p className="text-center text-blanco">$ {total_amount}</p>
            <h3 className=" text-blanco text-center ">
                {nombre} {apellido}
            </h3>
            <p className="text-center text-blanco">{fecha}</p>
            <select
                onChange={(e) => handleChangeEstadoDelPedido(e.target.value)}
                className={`py-3 rounded-xl px-2 text-blanco ${fondoDelSelect} bg-opacity-70`}
                name=""
                id=""
                value={estado}
            >
                <option value="En proceso">En proceso</option>
                <option value="Enviado">Enviado</option>
                <option value="Cancelado">Cancelado</option>
            </select>
            <div className="flex justify-end items-center  text-center text-blanco text-xl gap-x-7 px-3">
                <Link to={`/admin/pedidos/pedido/${id}`}>
                    <ion-icon name="arrow-forward"></ion-icon>
                </Link>
            </div>
        </article>
    );
}
