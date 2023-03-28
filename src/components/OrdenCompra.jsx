import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
export default function OrdenCompra() {

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
        navigate('/login');
        // se crea cuenta o se loguea
        // redirecciona al carrito
        // setea el estado de logged
        // nuevamente el cliente clickea en comprar se activa la funcion y entra en el if true.
      }
    };
  return (
    <>
      <div>
        <h1>Orden de Compra | Tu Tienda Online</h1>
        <p>Subtotal: $10,000</p>
        <p>Total: $8,000</p>
        <button onClick={handleCompra}>Comprar ahora</button>
      </div>
    </>
  );
}
