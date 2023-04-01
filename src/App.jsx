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
import AdminNuevoProducto from "./pages/AdminNuevoProducto";
import AdminEditarProducto, {
  loader as AdminEditarProductoLoader,
} from "./pages/AdminEditarProducto";
import MiCuenta from "./pages/MiCuenta";

// Components
import Layout from "./components/Layout";
import CartContextProvider from "./context/CartContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] =   useState(false); // Inicialmente el usuario no está logueado como admin
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
          path: "/carrito",
          element: <Carrito />,
        },
        {
          path: "/micuenta",
          element: <MiCuenta/>,
        },
       
      ],
    },
    {
        path: "/admin",
        element: <Layout />,
        children: [
          {
            index: true,
            element: isLoggedIn ? (
       
                <AdminInicio />
            
            ) : (
              // Si el usuario no está logueado, redirige a la página de inicio
              console.log('error')
            ),
          },
          {
            path: "/admin/nuevoproducto",
            element: isLoggedIn ? (
       
                <AdminNuevoProducto />
                
            ) : (
              // Si el usuario no está logueado, redirige a la página de inicio
              console.log('error')
            ),
          },
          {
            path: "/admin/editarproducto/:productoId",
            element: isLoggedIn ? (
       
                <AdminNuevoProducto />
                
            ) : (
              // Si el usuario no está logueado, redirige a la página de inicio
              console.log('error')
            ),
            loader: AdminEditarProductoLoader,
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