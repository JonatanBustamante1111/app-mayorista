import { useContext } from "react";
import OrdenCompra from "../components/OrdenCompra";
import TablaCarrito from "../components/TablaCarrito";
import { CartContext } from "../context/CartContext";

export default function Carrito() {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart.carrito.length ? (
        <div>
          <div>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Sub total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              cart.carrito.map(element => console.log(element))
            }
            {cart.carrito.length > 0 &&
              cart.carrito.map((item) => (
                <TablaCarrito key={item.id} id={item.id} imagen={item.imagen} nombre={item.nombre} cantidad={item.cantidad} precio={item.precio}/>
              ))}
          </tbody>
        </table>
        </div>
        <div>
          <OrdenCompra/>
        </div>
        </div>
      ) : (
        <div>Tu carrito esta vacio</div>
      )}
    </>
  );
}
