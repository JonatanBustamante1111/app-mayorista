import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'


const router = createBrowserRouter ([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index:true,
        element:<Inicio/>
      }
    ]
  },
  {
    path: '/productos',
    element: <h2>prueba 2</h2>
  },
  {
    path: '/nosotros'
  } 
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
