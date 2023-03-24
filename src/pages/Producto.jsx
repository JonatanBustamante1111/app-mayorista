import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Producto() {
  const { carrito, setCarrito } = useContext(CartContext);
  const producto = {
    name: "hola",
    apellido: "cualq"
  }
  const agregarProducto = () => {
    setCarrito(producto);
  }
  
  console.log(carrito)
  return (
    <div className="product-view">
      <div className="product-image">{/* imagen del producto */}</div>
      <div className="product-info">
        <h1>Nombre del Producto</h1>
        <p>Descripción del producto</p> 
        <h3>Precio: $X</h3>
        <p>Cantidad disponible: X</p>
        <button onClick={() => agregarProducto()}>Agregar al carrito</button>
      </div>
    </div>
  );
}
