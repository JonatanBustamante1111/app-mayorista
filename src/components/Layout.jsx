import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import NavBar from './NavBar'
export default function Layout({loggedIn}) {
  return (
    <>
        <NavBar loggedIn={loggedIn}/>
        <Outlet/>
        <Footer/>
    </>
  )
}
