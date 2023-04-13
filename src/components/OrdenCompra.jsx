import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { eApi } from '../api/api';
export default function OrdenCompra() {

  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState({});

  const { cart } = useContext(CartContext);
  const { loggedIn } = cart;
  const navigate = useNavigate();

  const sumTotal = () => {
    let total = 0
    const carrito = cart.carrito
    for (let i = 0; i < carrito.length; i++) {
      total += (parseFloat(carrito[i]['precio']) * parseInt(carrito[i]['cantidad']))
    }
    setTotalAmount(total)
  };

  const fillItems = () => {
    const carrito = cart.carrito
    let itemsArray = [] 
    for (let i = 0; i < carrito.length; i++) {
      const item = {
        title: carrito[i]['nombre'],
        unit_price: parseFloat(carrito[i]['precio']),
        quantity: parseInt(carrito[i]['cantidad']),
        currency_id: "ARS"
      }

      itemsArray.push(item)
    }
    setItems({items: itemsArray})

  }

  useEffect(() => {
    sumTotal();
    fillItems();
  }, [])

  const handleCompra = (e) => {
    e.preventDefault()
    eApi.post('pagar', items).then(
      res => {
        window.open(res.data)
      }
    )
    /*  if (loggedIn) {
       console.log("Compra realizada");
     } else {
       // Redirigir al usuario al formulario de inicio de sesión
       console.log("Debe iniciar sesión para hacer la compra");
       navigate('/micuenta');
     } */
  };
  return (
    <>
      <div>
        <h1>Orden de Compra | Tu Tienda Online</h1>
        <p>Subtotal: $10,000</p>
        <p>Total: {totalAmount}</p>
        <button onClick={(e) => handleCompra(e)}>Comprar ya</button>
      </div>
    </>
  );
}
