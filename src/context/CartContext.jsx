import { useState } from "react";
import { createContext } from "react";

// espacio en memoria
export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [carrito, setCarrito] = useState([]);

    function agregarCarrito(producto) {
        setCarrito([...carrito, producto]);
      }
      const cart = {
        carrito,
        agregarCarrito,
      };
    console.log(carrito)
    return (

        <CartContext.Provider value={{cart}}>

            {props.children}

        </CartContext.Provider>
    )
}


export default CartContextProvider;