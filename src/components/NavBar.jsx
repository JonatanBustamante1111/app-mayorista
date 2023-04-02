import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@mui/material';
import { CartContext } from '../context/CartContext';
export default function Navbar() {

  const [nav, setNav] = useState(false)
  const location = useLocation()
  const {cart} = useContext(CartContext)
  const {sumaCantidadBadge} = cart

  const handleNav = () => {
    setNav(!nav)
  }
  
  return (
    <>
      <div className='flex px-5 md:px-2  justify-between  items-center  shadow'>
        <div className='flex justify-between items-center w-[70%] px-4'>
          <div className='flex items-center text-indigo-500 text-xl gap-x-2'>
            <ion-icon name="cash-outline"></ion-icon>
            <p className='font-normal py-3 text-xl lg:text-2xl text-slate-900 uppercase tracking-widest'>millionare mind</p>
          </div>
          <ul className='hidden md:flex gap-x-7 uppercase font-semibold text-xs'>
            {     
                location.pathname !== '/admin' ||
                location.pathname !== '/admin/nuevoproducto' || 
                location.pathname !== '/admin/editarproducto/:productoId' 
                ? (
                  <>
                    <Link to={'/'}>
                      <li className='py-4 '>Home</li>
                    </Link>
                    <Link to={'/productos'}>
                      <li className='py-4 '>Productos</li>
                    </Link>
                    <Link to={'/nosotros'}>
                      <li className='py-4 '>Nosotros</li>
                    </Link>
                  </>
                )
                :
                (
                  <>
                    <Link to={'/admin'}>
                      <li className='py-4  '>Home Admin</li>
                    </Link>
                    <Link to={'/admin/nuevoproducto'}>
                      <li className='py-4'>Nuevo Producto</li>
                    </Link>
                  </>
                )
            }
          </ul>
        </div>
        <div className='hidden md:flex items-center gap-x-5'>
          <Link className='text-2xl' to={'/carrito'}>
            <Badge badgeContent={sumaCantidadBadge()} color="secondary" >
               <ion-icon name="cart-outline"></ion-icon>
            </Badge>
          </Link>
          <Link to={'/micuenta'} className='text-xs font-semibold hidden md:block uppercase'
          >Mi cuenta</Link> 
        </div>
        <div className='relative py-5'>

          <div onClick={handleNav} className='bars__menu absolute top-1 right-5 z-50 md:hidden'>
            <span className={nav ? 'line1__bars-menu' : ''}></span>
            <span className={nav ? 'line2__bars-menu' : ''}></span>
            <span className={nav ? 'line3__bars-menu' : ''}></span>
          </div>

        </div>
      </div>
      <div className={nav ? 'md:hidden fixed left-0 top-0 w-full h-screen transition-colors duration-300 bg-black/5 z-20' : 'z-30'}>
        <div
          className={
            nav
              ? 'fixed left-0 top-0 w-[75%] sm:w-[65%] md:w-[45%] h-screen bg-white shadow-md p-10 ease-in duration-500 z-20'
              : 'fixed left-[-100%] top-0 p-10 ease-in transition-all duration-500 z-20'
          }
        >
          <div >
            <div className='flex items-center text-indigo-500 text-xl gap-x-2 border-b w-full border-gray-300'>
              <ion-icon name="cash-outline"></ion-icon>
              <p className='font-normal py-3 text-xl lg:text-2xl text-slate-900 uppercase tracking-widest'>millionare mind</p>
            </div>

          </div>
          <div className='py-4 flex flex-col mt-10 items-start'>
            <ul className='uppercase ' onClick={handleNav}>
            {     
                location.pathname !== '/admin' ||
                location.pathname !== '/admin/nuevoproducto' || 
                location.pathname !== '/admin/editarproducto/:productoId' 
                ? (
                  <>
                    <Link to={'/'}>
                      <li className='py-4 '>Home</li>
                    </Link>
                    <Link to={'/productos'}>
                      <li className='py-4 '>Productos</li>
                    </Link>
                    <Link to={'/nosotros'}>
                      <li className='py-4 '>Nosotros</li>
                    </Link>
                  </>
                )
                :
                (
                  <>
                    <Link to={'/admin'}>
                      <li className='py-4  '>Home Admin</li>
                    </Link>
                    <Link to={'/admin/nuevoproducto'}>
                      <li className='py-4'>Nuevo Producto</li>
                    </Link>
                  </>
                )
            }
            </ul>
            <div className='flex flex-col gap-y-3 md:hidden items-start'>
              <Link to={'/micuenta'} className='uppercase'>Mi cuenta</Link>
            </div>
            <div className="pt-20">
              <p className='text-sm sm:text-lg uppercase tracking-widest text-indigo-600'>¡Sigamos conectados!</p>
              <div className='flex items-center justify-between my-4 w-full sm:w-[80%]'>
                <div className='icons__menu'>
                  <ion-icon name="logo-whatsapp"></ion-icon>
                </div>
                <div className='icons__menu'>
                  <ion-icon name="logo-instagram"></ion-icon>
                </div>
                <div className='icons__menu'>
                  <ion-icon name="mail-outline"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
