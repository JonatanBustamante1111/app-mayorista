import React from 'react'

export default function MenuHamburguesa({ handleNav, nav }) {
  return (
    <div className="relative py-5">
    <div
      onClick={handleNav}
      className="bars__menu right-[2px]  absolute top-1 z-50 md:hidden"
    >
      <span className={nav ? "line1__bars-menu" : ""}></span>
      <span className={nav ? "line2__bars-menu" : ""}></span>
      <span className={nav ? "line3__bars-menu" : ""}></span>
    </div>
  </div>
  )
}
