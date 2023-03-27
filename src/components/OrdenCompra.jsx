import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
export default function OrdenCompra() {
    const{cart} = useContext(CartContext)
    const {loggedIn} = cart;
    const navigate = useNavigate();
    const handleCompra = () => {
      if (loggedIn) {
        // Hacer la compra
        console.log("Compra realizada");
      } else {
        // Redirigir al usuario al formulario de inicio de sesión
        console.log("Debe iniciar sesión para hacer la compra");
        navigate('/login');
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
