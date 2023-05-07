import React from 'react'

export default function MenuHamburguesa({ handleNav, nav }) {
  return (
    <div className="relative py-5 z-50">
    <div
      onClick={handleNav}
      className="bars__menu right-[2px] z-50 absolute top-1 md:hidden"
    >
      <span className={nav ? "line1__bars-menu" : ""}></span>
      <span className={nav ? "line2__bars-menu" : ""}></span>
      <span className={nav ? "line3__bars-menu" : ""}></span>
    </div>
  </div>
  )
}
