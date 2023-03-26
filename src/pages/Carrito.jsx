import { useContext } from "react";
import TablaCarrito from "../components/TablaCarrito";
import { CartContext } from "../context/CartContext";

export default function Carrito() {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart.carrito.length ? (
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.carrito.length > 0 &&
              cart.carrito.map((producto) => (
                <TablaCarrito key={producto.id} producto={producto} />
              ))}
          </tbody>
        </table>
      ) : (
        <div>Tu carrito esta vacio</div>
      )}
    </>
  );
}
