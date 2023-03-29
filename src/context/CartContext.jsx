import { useState } from "react";
import { createContext } from "react";

// espacio en memoria
export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [carrito, setCarrito] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const agregarCarrito = (producto, cantidad) => {

      const itemEncontrado = carrito.find(item => item.id === producto.id);
    
      if (itemEncontrado) {
        const carritoActualizado = carrito.map(item => {
          if (item.id === producto.id) {
            return { ...item, cantidad: item.cantidad + cantidad };
          } else {
            return item;
          }
        });
        setCarrito(carritoActualizado);
      } else {
        setCarrito([
          ...carrito,
          {
            id: producto.id,
            nombre: producto.nombre,
            imagen: producto.imagen,
            precio: producto.precio,
            cantidad: cantidad,
          },
        ]);
      }
    };
    function eliminarProducto(id){
        const newArray = carrito.filter(element => element.id !== id )
        setCarrito(newArray)
    }  
    const sumaCantidadBadge = () => { 
      let acc = 0;  
      carrito.forEach(item => acc ++);
      return acc;
  }


      const cart = {
        carrito,
        agregarCarrito,
        eliminarProducto,
        loggedIn, 
        setLoggedIn,
        sumaCantidadBadge
      };

    return (

        <CartContext.Provider value={{cart}}>

            {props.children}

        </CartContext.Provider>
    )
}


export default CartContextProvider;