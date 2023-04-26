import React, { useState } from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Producto from "./pages/Producto";
import Nosotros from "./pages/Nosotros";
import Carrito from "./pages/Carrito";
import AdminInicio from "./pages/AdminInicio";
import AdminEditarProducto from "./pages/AdminEditarProducto";
import MiCuenta from "./pages/MiCuenta";
import Contacto from "./pages/Contacto"; 
import Pedidos from "./pages/Pedidos";
import Categorias from "./pages/Categorias";

// Components
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Proveedores from "./pages/Proveedores";


// Context
import CartContextProvider from "./context/CartContext";
import CheckOut from "./pages/CheckOut";
const App = () => {
  const [isLoggedAdmin, setIsLoggedAdmin] = useState(
    localStorage.getItem("isLoggedAdmin") === "true" ? true : false
  );
    const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true" ? true : false
  );
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout loggedIn={loggedIn} />,
      children: [
        {
          index: true,
          element: <Inicio />,
        },
        {
          path: "/productos",
          element: <Productos />,
        },
        {
          path: "/producto/:productoId",
          element: <Producto />,
        },
        {
          path: "/nosotros",
          element: <Nosotros />,
        },
        {
          path: "/contacto",
          element: <Contacto/> ,
        },
        {
          path: "/carrito",
          element: <Carrito loggedIn={loggedIn} />,
        },
        {
          path: "/checkout",
          element: <CheckOut  />,
        },
        {
          path: "/micuenta",
          element: <MiCuenta  setIsLoggedAdmin={setIsLoggedAdmin} setLoggedIn={setLoggedIn} loggedIn={loggedIn} isLoggedAdmin={isLoggedAdmin}/>,
        },
       
      ],
    },
    {
        path: "/admin",
        element: <Dashboard setIsLoggedAdmin={setIsLoggedAdmin} setLoggedIn={setLoggedIn}/>,
        children: [
          {
            index: true,
            element: isLoggedAdmin ? (
       
                <AdminInicio />
            
            ) : (
              // Si el usuario no está logueado, redirige a la página de inicio
              console.log('error')
            ),
          },
          {
            path: "/admin/proveedores",
            element: isLoggedAdmin ? (
       
                <Proveedores/>
                
            ) : (
              // Si el usuario no está logueado, redirige a la página de inicio
              console.log('error')
            ),
          },
          {
            path: "/admin/pedidos",
            element: isLoggedAdmin ? (
       
                <Pedidos/>
                
            ) : (
              // Si el usuario no está logueado, redirige a la página de inicio
              console.log('error')
            ),
          },
          {
            path: "/admin/categorias",
            element: 
            isLoggedAdmin 
              ? <Categorias/>                
              : console.log('error, no se puedo acceder a categorias')
          },
          {
            path: "/admin/editarproducto/:productoId",
            element: isLoggedAdmin ? (
       
                <AdminEditarProducto />
                
            ) : (
              // Si el usuario no está logueado, redirige a la página de inicio
              console.log('error')
            ),
            //loader: AdminEditarProductoLoader,
          },
        ],
      },    
  ]);
  return (
    <React.StrictMode>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </React.StrictMode>
  );
};
    export default App;