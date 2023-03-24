import { useState } from "react";
import { createContext } from "react";

// espacio en memoria
export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [carrito, setCarrito] = useState();

 
    return (

        <CartContext.Provider value={{carrito,setCarrito}}>

            {props.children}

        </CartContext.Provider>
    )
}


export default CartContextProvider;