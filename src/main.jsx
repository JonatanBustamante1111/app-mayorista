import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Pages
import Inicio from './pages/Inicio'
import Carrito from './pages/Carrito'
import AdminInicio from './pages/AdminInicio'
import AdminNuevoProducto  from './pages/AdminNuevoProducto'
import AdminEditarProducto, { loader as AdminEditarProductoLoader } from './pages/AdminEditarProducto'

// Components
import Layout from './components/Layout'
import Productos from './pages/Productos'

const router = createBrowserRouter ([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index:true,
        element:<Inicio/>
      },
      {
        path: '/productos',
        element: <Productos/>
      },
      {
        path: '/nosotros',
        element: <h2>nosotros</h2>
      },
      {
        path: '/carrito',
        element: <Carrito/>
      }
    ],
  },
  {
    path:'/admin',
    element:<Layout/>,
    children: [
        {
          index: true,
          element: <AdminInicio/>
        },
        {
          path:'/admin/productos',
          element: <h2>Productos</h2>
        },
        {
          path:'/admin/nuevoproducto',
          element: <AdminNuevoProducto/>,
        },
        {
          path:'/admin/editarproducto/:productoId',
          element: <AdminEditarProducto/>,
          loader:AdminEditarProductoLoader
        },
    ]
  }
 
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)