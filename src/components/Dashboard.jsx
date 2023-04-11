import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardAdmin from './DashboardAdmin'
export default function Dashboard({setIsLoggedAdmin}) {
  return (
    <>
        <DashboardAdmin setIsLoggedAdmin={setIsLoggedAdmin} />
        <Outlet/>
    </>
  )
}
