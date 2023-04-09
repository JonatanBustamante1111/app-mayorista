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
import Contacto from "./pages/Contacto";

const App = () => {
  const [isLoggedAdmin, setIsLoggedAdmin] = useState(false);
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
          path: "/contacto",
          element: <Contacto/> ,
        },
        {
          path: "/carrito",
          element: <Carrito />,
        },
        {
          path: "/micuenta",
          element: <MiCuenta  setIsLoggedAdmin={setIsLoggedAdmin}/>,
        },
       
      ],
    },
    {
        path: "/admin",
        element: <Layout />,
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
            path: "/admin/nuevoproducto",
            element: isLoggedAdmin ? (
       
                <AdminNuevoProducto />
                
            ) : (
              // Si el usuario no está logueado, redirige a la página de inicio
              console.log('error')
            ),
          },
          {
            path: "/admin/editarproducto/:productoId",
            element: isLoggedAdmin ? (
       
                <AdminEditarProducto />
                
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