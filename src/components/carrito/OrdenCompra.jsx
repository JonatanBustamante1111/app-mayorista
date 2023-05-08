import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Button from '../reutilizables/Button';
import eApi from '../../api/api'


export default function OrdenCompra({ total,loggedIn }) { 
  const [totalAmount, setTotalAmount] = useState(0);
  
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const sumTotal = () => {
    let total = 0
    const carrito = cart.carrito
    for (let i = 0; i < carrito.length; i++) {
      total += (parseFloat(carrito[i]['precio']) * parseInt(carrito[i]['cantidad']))
    }
    setTotalAmount(total)
  };


  useEffect(() => {
    sumTotal();
  }, [])

  const handleCheckOut = (e) => {
    e.preventDefault()
    if(loggedIn){
      navigate('/checkout')
    }else{
      navigate('/micuenta')
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
          <Button onClick={handleCheckOut}>Orden de compra</Button>
        </div>
      </div>
    </>
  );
}
