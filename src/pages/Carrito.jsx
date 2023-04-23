import { useContext } from "react";
import OrdenCompra from "../components/OrdenCompra";
import ProductoCarrito from "../components/ProductoCarrito";
import { CartContext } from "../context/CartContext";
import Button from "../components/Button";

export default function Carrito() {
  const { cart } = useContext(CartContext);
  const { carrito } = cart

  let total = 0


  carrito.forEach(el => {
    total += el.precio * el.cantidad
  })
  return (
    <main>
      {carrito.length ? (
        <section>
          <h1 className="w-[280px] h-[34px] md:w-[400px] md:h-[49px] md:text-4xl ml-10 text-blanco font-bold text-2xl md: md:mt-28">Carrito de compras</h1>
          <div>
            {carrito.length > 0 &&
              carrito.map(producto => (
                <ProductoCarrito key={producto.id} producto={producto} />
              ))
            }
          </div>
          <div className="w-full">
            <OrdenCompra total={total} />
          </div>
        </section>
      ) : (
        <section className="h-full w-full flex flex-col items-center my-20">
          <div className="flex flex-col items-center gap-y-8">
            <img src="https://i.ibb.co/TmN510Q/emojione-shopping-cart.png" alt="imagen carrito vacio" />
            <h2 className="font-normal text-center text-2xl text-blanco">Aun no has agregado elementos al carrito</h2>
            <Button link={'/productos'}>Continuar comprando</Button>
          </div>
        </section>
      )}
    </main>
  );
}
