import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import eApi from "../api/api";
import CardCheckOut from "../components/CardCheckOut";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebaseconfig";
import Button from "../components/reutilizables/Button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const CheckOut = () => {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [piso, setPiso] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [cliente, setCliente] = useState('');
  const [numClicks, setNumClicks] = useState(0);

  const [id, setId] = useState(null);
  const [items, setItems] = useState({});
  const [datos, setDatos] = useState([]);

  const { cart } = useContext(CartContext);
  const { carrito, setCarrito } = cart;

  const navigate = useNavigate();

  // muestra el total a pagar
  let total = 0;
  carrito.forEach((el) => {
    total += el.precio * el.cantidad;
  });

  const fechaActual = new Date();
  const fecha = format(fechaActual, "dd/MM/yyyy");

  function generarIdUnico() {
    const fechaActual = new Date().getTime();
    const numeroAleatorio = Math.floor(Math.random() * 1000000);
    return `${fechaActual}_${numeroAleatorio}`;
  }

  // objeto que guarda la informacion del pedido
  const pedido = {
    nombre,
    apellido,
    numero,
    email,
    direccion,
    piso,
    provinciaSeleccionada,
    localidad,
    codigoPostal,
    datos,
    fecha,
    dni,
    cliente,
    estado: "En proceso",
  };

  // guarda los productos actuales del carrito en un array
  useEffect(() => {
    const data = [];
    // construir el array temporal con los objetos del carrito
    carrito.map((producto) => {
      data.push({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
        imagen: producto.imagen,
        proveedor: producto.proveedor,
      });
    });
    setDatos(data);
  }, [carrito]);

  // genera un id para los pedidos & para la base de datos
  useEffect(() => {
    setId(generarIdUnico());
  }, []);

  // aca creamos un objeto con la informacion para Mpago.
  useEffect(() => {
    setItems({
      items: fillItems(),
      notifyId: id,
    });
  }, [id]);

  // sirve para crear un objeto que se envia a Mpago
  const fillItems = () => {
    const carrito = cart.carrito;
    let itemsArray = [];
    for (let i = 0; i < carrito.length; i++) {
      const item = {
        title: carrito[i]["nombre"],
        unit_price: parseFloat(carrito[i]["precio"]),
        quantity: parseInt(carrito[i]["cantidad"]),
        currency_id: "ARS",
      };
      itemsArray.push(item);
    }
    return itemsArray;
  };

  const handleCompra = async (e) => {
    e.preventDefault();
    setNumClicks(numClicks + 1);

    // Valida que los campos obligatorios del form se llenen.
    if (
      !nombre ||
      !direccion ||
      !email ||
      !apellido ||
      !numero ||
      !dni ||
      !piso ||
      !localidad ||
      !provinciaSeleccionada ||
      !codigoPostal ||
      !cliente
    ) {
      Swal.fire({
        icon: "warning",
        title: "¡Por favor, completa todos los campos obligatorios!",
      });
      return;
    }
    // si clickea mas de 1 veces, inabilita el boton pagar
    if (numClicks > 1) {
      return;
    }
    // asigna el id generado al pedido del cliente
    pedido.id = id;

    // enviamos el pedido del cliente por la api de Mpago
    eApi
      .post("pagar", items)
      .then((res) => {
        window.open(res.data);
        //  cargamos el pedido a la base de datos
        pedidoBd();
        // vaciamos toda la infomacion a cero
        VaciarInfoCliente();
        //  mandamos una alerta de exito
        Swal.fire({
          icon: "success",
          title: "¡En 48/72 hs habiles, despacharemos tu pedido!",
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        alert("Ha ocurrido un error al procesar la compra");
      });
  };

  const pedidoBd = async () => {
    // crea un document en la database y guarda un pedido,
    // el id documento y el id pedido son los mismos en la database.
    const docRef = doc(db, "pedidosCliente", pedido.id);
    await setDoc(docRef, pedido);
  };
  const VaciarInfoCliente = () => {
    // vacio los datos del carrito
    setCarrito([]);
    // vacio los datos del pedido
    setNombre("");
    setApellido("");
    setNumero("");
    setEmail("");
    setDireccion("");
    setPiso("");
    setProvinciaSeleccionada("");
    setLocalidad("");
    setCodigoPostal("");
    setDni("");
    setCliente("");
    setDatos([]);
  };

  return (
    <main className="mt-20 font-monsterrat p-4 md:flex md:flex-row md:mt-5 ">
      <div className="flex flex-col gap-4 md:w-1/2 md:px-6 md:mt-20">
        <h2 className=" font-bold  text-3xl text-blanco">Orden de compra</h2>
        <p className=" font-light text-base text-blanco mb-5">
          Para completar el proceso de compra, es necesario ingresar toda la
          información de envío para que el producto llegue correctamente al
          destino. Es importante asegurarse de que toda la información sea
          precisa y esté actualizada para evitar retrasos o problemas con la
          entrega del producto. Gracias!
        </p>
        <h3 className=" font-semibold text-2xl text-blanco">
          Datos del comprador
        </h3>
        <form className="my-10 flex flex-col">
          <div className="md:flex md:gap-6">
            <label className="md:w-1/2">
              <input
                required
                type="name"
                value={nombre}
                placeholder="Nombre (obligatorio)"
                className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-3  text-blanco mb-5 "
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            <label className="md:w-1/2">
              <input
                required
                type="name"
                value={apellido}
                placeholder="Apellido (obligatorio) "
                className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-3  text-blanco mb-5 "
                onChange={(e) => setApellido(e.target.value)}
              />
            </label>
          </div>
          <label>
            <input
              required
              type="number"
              value={numero}
              placeholder="Numero de telefono (obligarorio)"
              className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-3  text-blanco mb-5 "
              onChange={(e) => setNumero(e.target.value)}
            />
          </label>
          <label>
            <input
              required
              type="email"
              value={email}
              placeholder="E-mail (obligarorio)"
              className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-3  text-blanco mb-5 "
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              required
              type="name"
              value={dni}
              placeholder="Dni / Cuit (obligarorio)"
              className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-3  text-blanco mb-5 "
              onChange={(e) => setDni(e.target.value)}
            />
          </label>
          <select
            required
            className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-3  text-blanco mb-5 "
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          >
            <option value="">Conficion frente al IVA   *obligatorio*</option>
            <option value="consumidor final">Consumidor Final</option>
            <option value="responsable inscripto">Responsable inscripto</option>
            <option value="monotributo">Monotributo</option>
          </select>
          <h3 className=" font-semibold text-2xl mb-14 text-blanco">
            Datos de envío
          </h3>
          <div className="md:flex md:flex-row md:gap-6">
            <label className="md:w-3/4">
              <input
                required
                type="text"
                value={direccion}
                placeholder="Dirección (obligarorio) "
                className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-3  text-blanco mb-5 "
                onChange={(e) => setDireccion(e.target.value)}
              />
            </label>
            <label className="md:w-1/4">
              <input
                type="text"
                value={piso}
                placeholder="Piso"
                className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-3  text-blanco mb-5 "
                onChange={(e) => setPiso(e.target.value)}
              />
            </label>
          </div>
          <label>
            <input
              required
              type="text"
              value={provinciaSeleccionada}
              placeholder="Provincia (obligarorio)"
              className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-3  text-blanco mb-5 "
              onChange={(e) => setProvinciaSeleccionada(e.target.value)}
            />
          </label>
          <div className="md:flex md:flex-row md:gap-6">
            <label className="md:w-1/2">
              <input
                required
                type="text"
                value={localidad}
                placeholder="Localidad (obligarorio)"
                className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1 pr-1  text-blanco mb-5 "
                onChange={(e) => setLocalidad(e.target.value)}
              />
            </label>
            <label className="md:w-1/2">
              <input
                required
                type="text"
                value={codigoPostal}
                placeholder="Cod Postal (obligarorio)"
                className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-1  text-blanco mb-5 "
                onChange={(e) => setCodigoPostal(e.target.value)}
              />
            </label>
          </div>
        </form>
      </div>
      <div className="md:w-1/2 md:mt-20">
        <div className=" h-3/4  overflow-auto md:h-3/5">
          {carrito.length > 0 &&
            carrito.map((producto) => (
              <CardCheckOut key={producto.id} producto={producto} />
            ))}
        </div>
        <div className="flex w-full  md:justify-end  mt-10">
          <div
            className="
                      flex flex-col w-[90%] mx-auto md:mx-8 md:w-auto justify-center  md:justify-items-end
                      gap-y-3 border-t-[1px] border-gray-400 py-7 md:mt-12"
          >
            <div className="flex justify-between">
              <p className="text-3xl font-bold text-white mb-10 ">Total:</p>
              <p className="text-3xl font-bold text-white ">${total}</p>
            </div>
            <Button
              className="text-black"
              onClick={(e) => {
                handleCompra(e);
              }}
            >
              Pagar
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckOut;
