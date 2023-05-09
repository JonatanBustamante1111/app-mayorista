import { useContext } from "react";
import OrdenCompra from "../../components/carrito/OrdenCompra";
import ProductoCarrito from "../../components/carrito/ProductoCarrito";
import { CartContext } from "../../context/CartContext";
import Button from "../../components/reutilizables/Button";

export default function Carrito({loggedIn}) {
  const { cart } = useContext(CartContext);
  const { carrito } = cart;

  let total = 0;

  carrito.forEach((el) => {
    total += el.precio * el.cantidad;
  });
  return (
    <main>
      {carrito.length ? (
        <section>
          <h1 className="w-[280px] h-[34px] md:w-[400px] md:h-[49px] md:text-4xl ml-10 text-blanco font-bold text-2xl md: md:mt-28">
            Carrito de compras
          </h1>
          <div className=" h-3/4  overflow-auto ">
            {carrito.length > 0 &&
              carrito.map((producto) => (
                <ProductoCarrito key={producto.id} producto={producto} />
              ))}
          </div>
          <div className="md:flex md:flex-row md:items-center">
            <div className="text-base px-4 my-10 text-blanco md:w-full md:px-0 md:ml-8 ">
              <p>
                <b>Nota:</b> En nuestra tienda en línea, coordinamos el envío una vez que recibimos el pago. Procesamos los pedidos y despachamos el envío dentro de las 48/72 horas hábiles posteriores a la confirmación del pago. Si necesitas ayuda o tienes dudas, contáctanos a través de nuestro sitio web, redes sociales o whatsapp. ¡Gracias por confiar en nosotros!.{" "}
              </p>
            </div>
            <OrdenCompra total={total} loggedIn={loggedIn} />
          </div>
        </section>
      ) : (
        <section className="h-full w-full flex flex-col items-center my-20">
          <div className="flex flex-col items-center gap-y-8">
            <img
              src="https://i.ibb.co/TmN510Q/emojione-shopping-cart.png"
              alt="imagen carrito vacio"
            />
            <h2 className="font-normal text-center text-2xl text-blanco">
              Aun no has agregado elementos al carrito
            </h2>
            <Button link={"/productos"}>Continuar comprando</Button>
          </div>
        </section>
      )}
    </main>
  );
}
