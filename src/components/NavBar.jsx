import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@mui/material";
import { CartContext } from "../context/CartContext";
import MenuHamburguesa from "./MenuHamburguesa";
export default function Navbar() {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const { sumaCantidadBadge } = cart;

  const handleNav = () => {
    setNav(!nav);
  };
  const isAdminRoute = location.pathname == "/admin" ||
  location.pathname == "/admin/nuevoproducto" ||
  location.pathname.startsWith("/admin/editarproducto/")
  return (
    <>
      <div className="flex px-5 md:px-2  justify-between  items-center  shadow">
        {location.pathname == "/admin" ||
        location.pathname == "/admin/nuevoproducto" ||
        location.pathname == "/admin/editarproducto/:productoId" ? (
          <>

            <img

              src="https://i.ibb.co/G9ptDww/logo-crv4-removebg-preview-3.png"
              alt="logo-crv4-removebg-preview-3"
            />

            <ul className="navegacion  hidden md:flex gap-x-7  font-normal leading-5 text-[18px]">
              <Link className="relative" to={"/admin"}>
                <li className={`link 
                  ${location.pathname === '/admin' ? 'activo': ''}`}>
                    Home admin</li>
              </Link>
              <Link to={"/admin/nuevoproducto"}>
                <li className={`link 
                  ${location.pathname === '/admin/nuevoproducto' ? 'activo': ''}`}>
                  Nuevo producto</li>
              </Link>
            </ul>
            <div className="hidden md:flex items-center gap-x-5">
              <Link
                to={"/micuenta"}
                className="hidden md:flex text-xs font-semibold  "
              >
                Mi cuenta222
              </Link>
            </div>
          </>
        ) : (
          <>
            <img

              src="https://i.ibb.co/G9ptDww/logo-crv4-removebg-preview-3.png"
              alt="logo-crv4-removebg-preview-3"
            />
            <ul className="hidden md:flex navegacion gap-x-4">
              <Link className="" to={'/'}>
                <li 
                  className={`link 
                  ${location.pathname === '/' ? 'activo': ''}`}>
                Home</li>
              </Link>
              <Link to={'/productos'}>
                <li className={`link 
                  ${location.pathname === '/productos' ? 'activo': ''}`}>
                  Productos</li>
              </Link>
              <Link to={'/nosotros'}>
                <li className={`link 
                  ${location.pathname === '/nosotros' ? 'activo': ''}`}>
                  Nosotros</li>
              </Link>
              <Link to={'/contacto'}>
                <li className={`link 
                  ${location.pathname === '/contacto' ? 'activo': ''}`}>
                  Contacto</li>
              </Link>
            </ul>
            <div className='flex  items-center  text-blanco font-normal leading-5 text-[18px] z-10'>

              <Link className='text-3xl mr-20 pb-2' to={'/carrito'}>
                <Badge badgeContent={sumaCantidadBadge()} color="secondary" >
                  <ion-icon name="cart"></ion-icon>
                </Badge>
              </Link>
              <div className="hidden md:flex  items-center gap-x-1 text-xl">
                <ion-icon name="person-circle-outline"></ion-icon>
                <Link to={'/micuenta'} >
                  Ingresar
                </Link>
              </div>

             <MenuHamburguesa handleNav={handleNav} nav={nav}/>
            </div>
          </>
        )}

      </div>
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-0 w-full h-screen transition-colors duration-300 bg-black/5 z-auto"
            : "z-30"
        }
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[65%] md:w-[45%] h-screen bg-white shadow-md p-10 ease-in duration-500 z-30"
              : "fixed left-[-100%] top-0 p-10 ease-in transition-all duration-500 z-20"
          }
        >
          <div>
            <div className="flex items-center text-indigo-500 text-xl gap-x-2 border-b w-full border-gray-300">
              <ion-icon name="cash-outline"></ion-icon>
              <p className="font-normal py-3 text-xl lg:text-2xl text-slate-900  tracking-widest">
                millionare mind
              </p>
            </div>
          </div>
          <div className="py-4 flex flex-col mt-10 items-start">
            <ul className="uppercase " onClick={handleNav}>
              {location.pathname == "/admin" ||
              location.pathname == "/admin/nuevoproducto" ||
              location.pathname == "/admin/editarproducto/:productoId" ? (
                <>
                  <Link to={"/admin"}>
                    <li className="py-4">Home Admin</li>
                  </Link>
                  <Link to={"/admin/nuevoproducto"}>
                    <li className="py-4">Nuevo Producto</li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/"}>
                    <li className="py-4 ">Home</li>
                  </Link>
                  <Link to={"/productos"}>
                    <li className="py-4 ">Productos</li>
                  </Link>
                  <Link to={"/nosotros"}>
                    <li className="py-4 ">Nosotros</li>
                  </Link>
                </>
              )}
            </ul>
            <div className="flex flex-col gap-y-3 md:hidden items-start">
              <Link to={"/micuenta"} className="">
                Mi cuenta
              </Link>
            </div>
            <div className="pt-20">
              <p className="text-sm sm:text-lg  tracking-widest text-indigo-600">
                ¡Sigamos conectados!
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <div className="icons__menu">
                  <ion-icon name="logo-whatsapp"></ion-icon>
                </div>
                <div className="icons__menu">
                  <ion-icon name="logo-instagram"></ion-icon>
                </div>
                <div className="icons__menu">
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
