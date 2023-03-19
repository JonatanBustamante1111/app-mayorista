import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter ([
  {
    path: '/',
  },
  {
    path: '/nosotros',
    element: <h2>prueba 2</h2>
  },
  {
    path: '/contacto'
  } 
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
