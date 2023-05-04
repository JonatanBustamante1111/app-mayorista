import React from 'react'

export default function Error({children}) {
  return (
    <div className=" text-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-bold text-3xl sm:text-4xl md:text-5xl">
        {children}
    </div>
  )
}
