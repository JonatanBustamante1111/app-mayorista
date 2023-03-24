import CartTable from "./CartTable";

export default function Cart() {
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
            <CartTable/>
        </tbody>
      </table>
    )
}