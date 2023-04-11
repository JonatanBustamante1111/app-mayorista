import { Link, useLocation } from "react-router-dom"


export const Links = [
    {
        nombre: '',
        path: '',
        rol: ''
    },
]
import React from 'react'

export default function NavbarLinks({flexDirection}) {
    const location = useLocation()
    return (
        <ul className={`navegacion flex items-center gap-x-7 font-normal leading-5 text-[18px] z-10
            ${flexDirection}
        `}>
            {
                location.pathname == "/admin" ||
                    location.pathname == "/admin/nuevoproducto" ||
                    location.pathname == "/admin/editarproducto/:productoId"
                    ? (<>
                        {/* <li className={`link ${location.pathname === '/admin' ? 'activo' : ''}`}>
                            <Link className="relative " to={"/admin"}>Home admin</Link>
                        </li>
                        <li className={`link ${location.pathname === '/admin/nuevoproducto' ? 'activo' : ''}`}>
                            <Link to={"/admin/nuevoproducto"}>Nuevo producto</Link>
                        </li> */}
                        
                    </>


                    )
                    : (

                        <>
                            <li className={`link ${location.pathname === '/' ? 'activo' : ''}`}>
                                <Link className="" to={'/'}>
                                    Home
                                </Link>
                            </li>
                            <li className={`link ${location.pathname === '/productos' ? 'activo' : ''}`}>
                                <Link to={'/productos'}>
                                    Productos
                                </Link>
                            </li>
                            <li className={`link ${location.pathname === '/nosotros' ? 'activo' : ''}`}>
                                <Link to={'/nosotros'}>
                                    Nosotros
                                </Link>
                            </li>
                            <li className={`link ${location.pathname === '/contacto' ? 'activo' : ''}`}>
                                <Link to={'/contacto'}>
                                    Contacto
                                </Link>
                            </li>
                        </>
                    )
            }
        </ul >


    )
}


