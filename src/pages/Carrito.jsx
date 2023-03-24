import TablaCarrito from "./TablaCarrito";

export default function Carrito() {
    return(
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
            <TablaCarrito/>
        </tbody>
      </table>
    )
}