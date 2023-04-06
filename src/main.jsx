import React from "react";
import ReactDOM from "react-dom/client";
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
import PasarelaPago from "./components/PasarelaPago";

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
      {
        path: '/try-pay',
        element: <PasarelaPago/>
      }
    ],
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AdminInicio />,
      },
      {
        path: "/admin/nuevoproducto",
        element: <AdminNuevoProducto />,
      },
      {
        path: "/admin/editarproducto/:productoId",
        element: <AdminEditarProducto />,
        loader: AdminEditarProductoLoader,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </React.StrictMode>
);
