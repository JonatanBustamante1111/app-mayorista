import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Button from './Button';
export default function OrdenCompra({ total }) {

    const{cart} = useContext(CartContext)
    const {loggedIn} = cart;
    const navigate = useNavigate();
    const handleCompra = () => {
      if (loggedIn) {
        // crea un input para rellenar con sus datos
        // implementa pasarela de pago
        // Hacer la compra
        // una vez realizada la compra setea el estado de compra
        console.log("Compra realizada");
      } else {
        // Redirigir al usuario al formulario de inicio de sesión
        console.log("Debe iniciar sesión para hacer la compra");
        navigate('/micuenta');
      }
    };
  return (
    <>
      <div className='flex w-full  md:justify-end  mt-10'>
        <div className='
        flex flex-col w-[90%] mx-auto md:mx-8 md:w-auto justify-center  md:justify-items-end
        gap-y-3 border-t-[1px] border-gray-400 py-7'
        
        >
         <div className='flex justify-between'>
           <p className='text-3xl font-bold text-white '>Total:</p>
           <p className='text-3xl font-bold text-white '>${total}</p>
         </div>
          <Button onClick={handleCompra}>Ir al checkout</Button>
        </div>
      </div>
    </>
  );
}
