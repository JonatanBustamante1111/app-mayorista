import { useEffect, useState } from "react";
import { createContext } from "react";

// espacio en memoria
export const CartContext = createContext();
const CartContextProvider = (props) => {
    const [carrito, setCarrito] = useState([]);
    const[nombrePedido,setNombrePedido] = useState('');
    const[numeroPedido,setNumeroPedido]= useState('');
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
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado)); // Agregar el estado actualizado al localStorage
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
        localStorage.setItem('carrito', JSON.stringify([...carrito, {...producto, cantidad}])); // Agregar el nuevo producto al localStorage
      }
    };
    
    useEffect(() => {
      const localStorageValue = localStorage.getItem('carrito');
      if (localStorageValue) {
        setCarrito(JSON.parse(localStorageValue));
      }
    }, []);
    function eliminarProducto(id){
      const newArray = carrito.filter(element => element.id !== id );
      localStorage.setItem('carrito', JSON.stringify(newArray));
      setCarrito(newArray);
    }
    
    const sumaCantidadBadge = () => { 
      let acc = 0;  
      carrito.forEach(item => acc ++);
      return acc;
    } 
    

      const cart = {
        carrito,
        setCarrito,
        agregarCarrito,
        eliminarProducto,
        sumaCantidadBadge,
        nombrePedido,
        setNombrePedido,
        numeroPedido,
        setNumeroPedido
      };

    return (

        <CartContext.Provider value={{cart}}>

            {props.children}

        </CartContext.Provider>
    )
}


export default CartContextProvider;