import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseconfig";
import ItemCount from "../../components/productos/ItemCount";
import ProductosRelacionados from "../../components/productos/ProductosRelacionados";


export default function Producto() {
  const [itemCount, setItemCount] = useState(0);
  const { cart } = useContext(CartContext);
  const [dato, setDato] = useState({});
  const [productos, setProductos] = useState([]);
  const { productoId } = useParams();

  const { descripcion, imagen, nombre, precio, stock, categoria,subcategoria} = dato;

    const getProducto =  async () => {
    const docRef = doc(db, "productos", productoId);
    const result = await getDoc(docRef);
  
    if (result.exists()) {
      const productoData = { id: productoId, ...result.data() };
      setDato(productoData);
      if (productoData.subcategoria && productoData.categoria) {
        getRelatedProducts(productoData.subcategoria, productoData.categoria);
      }
    } else {
      console.log("no such document");
    }
  }
  const getRelatedProducts =  async (subcategoria, categoria) => {

    if (!subcategoria || !categoria || !productoId) {
      return;
    }

    const q = query(
      collection(db, "productos"),
      where("subcategoria", "==", subcategoria)
    );
    const querySnapshot = await getDocs(q);
    
    const productosArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    setProductos(productosArray);
  }
  
  function onAdd(cantidad) {
    cart.agregarCarrito(dato, cantidad);
    setItemCount(cantidad);
  }

  useEffect(() => {
    getProducto();

  }, []);

  return (
    <main className=" flex 
     flex-col w-full items-center justify-center md:flex md:p-4 md:gap-10">
      <div className="flex-col w-full items-center justify-center md:flex md:flex-row md:p-4 md:gap-10">
        <section className=" md:mt-24 md:w-1/2 md:px-4">
          <h2 className="pl-4 w-4/5  text-sm font-medium text-blanco py-5 lg:mx-0 lg:pl-0">{`${categoria} / ${subcategoria} `}{''} / <span className="text-secundario"> {nombre}</span></h2>
          <img
            src={imagen}
            className=" w-full h-[262px] md:w-full md:p-2 lg:w-[588px] lg:h-[400px] lg:rounded-xl object-cover lg:px-0"
            alt={`Imagen de ${nombre}`}
          />
        </section>
        <section className=" flex flex-col justify-center items-start p-4 gap-y-5 md:w-1/2  mt-24">
          <h2 className="md:text-3xl lg:text-4xl  font-monsterrat text-secundario font-bold">{`${nombre}`}</h2>
          <p className="font-normal text-gray-300">{`${descripcion}`}</p>
         { stock >= 1
          ?<p className="font-semibold text-blanco">{`${stock} Disponible/s`}</p>
          :<p className="font-semibold text-rojo">Sin stock</p>
          }
          <h3 className="text-2xl text-blanco font-bold ">${precio}</h3>
          {
            stock > 0
            ? itemCount === 0
                ? (<ItemCount initial={itemCount} stock={+stock} onAdd={onAdd} />)
                : (
                  <Link
                    to="/carrito"
                    className="lg:w-[300px]
                    bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600
                    py-4 px-6 text-sm text-primario font-bold
                    rounded-lg  "
                  >
                    Ver carrito
                  </Link>
                )
          :''
          }
        </section>
      </div>
      <ProductosRelacionados productos={productos} />
    </main>
  );
  
}
