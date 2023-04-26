import React from 'react'

export default function Error({children}) {
  return (
    <div className='w-full my-6 py-3 text-center  bg-red-700 text-white font-bold text-lg rounded-md'>
        {children}
    </div>
  )
}
