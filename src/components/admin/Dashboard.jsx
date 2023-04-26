import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardAdmin from './DashboardAdmin'
export default function Dashboard({setIsLoggedAdmin,setLoggedIn}) {
  return (
    <>
        <DashboardAdmin setIsLoggedAdmin={setIsLoggedAdmin} setLoggedIn={setLoggedIn} />
        <Outlet/>
    </>
  )
}
