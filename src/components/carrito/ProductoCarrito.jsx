import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Add, Remove } from '@mui/icons-material';


export default function ProductoCarrito({ producto }) {
  // context
  const { cart } = useContext(CartContext)
  const { eliminarProducto, agregarCarrito } = cart;
  // product destructuring
  const { id, imagen, nombre, cantidad, precio, categoria } = producto


  const [cantidadProducto, setCantidadProducto] = useState(cantidad);

  const increment = () => {
    const nuevoProducto = { ...producto, cantidad: cantidadProducto + 1 };
    agregarCarrito(nuevoProducto, nuevoProducto.cantidad - cantidadProducto);
    setCantidadProducto(nuevoProducto.cantidad);
  }

  const decrement = () => {
    if (cantidadProducto > 1) {
      const nuevoProducto = { ...producto, cantidad: cantidadProducto - 1 };
      agregarCarrito(nuevoProducto, nuevoProducto.cantidad - cantidadProducto);
      setCantidadProducto(nuevoProducto.cantidad);
    }
  }

  return (
    <article className=" 
    flex flex-col gap-y-8 justify-around py-6 border-[1px] border-gray-800 rounded-lg
    md:mt-2 md:flex-row md:justify-between md:mx-8
    ">
      <div className="flex ustify-start gap-x-16 items-center px-5">
        <img
          src={imagen}
          className="h-[83px] w-[108px] object-cover rounded-xl"
          alt={`Imagen de ${nombre}`}
        />
       
       <div className="flex flex-col ">
          <h2 className="text-xl text-blanco font-bold">{nombre}</h2>
          <p className="font-normal text-lg text-gray-300">{categoria}</p>
        </div>
      </div>

      <div className=" flex justify-between gap-x-16 items-center px-5 ">
        
        <div className='w-[111px] grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg'>
          <button className='border-none text-2xl font-bold text-secundario px-[3px] pb-[6px] rounded' variant="text" onClick={decrement}><Remove /></button>
          <div className='text-xl text-blanco'>{cantidadProducto}</div>
          <button className='border-none text-2xl font-bold text-secundario px-[3px] pb-[6px] rounded' variant="text " onClick={increment}><Add /></button>
        </div>
        <div className="flex justify-end  flex-col">
          <p className="font-bold text-blanco text-2xl">${cantidad * precio}</p>
          <div className="text-rojo py-1 flex items-center">
            <ion-icon name="trash-sharp"></ion-icon>
            <button onClick={() => eliminarProducto(id)} className="text-rojo">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
