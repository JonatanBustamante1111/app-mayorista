import { useState } from "react";
import { createContext } from "react";

// espacio en memoria
export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [carrito, setCarrito] = useState([]);

    function agregarCarrito(producto) {
        setCarrito([...carrito, producto]);
      }

    function eliminarProducto(id){
        const newArray = carrito.filter(element => element.id !== id )
        setCarrito(newArray)
    }  
      const cart = {
        carrito,
        agregarCarrito,
        eliminarProducto
      };

    return (

        <CartContext.Provider value={{cart}}>

            {props.children}

        </CartContext.Provider>
    )
}


export default CartContextProvider;