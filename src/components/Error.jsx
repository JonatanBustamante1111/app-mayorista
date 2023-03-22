import React from 'react'

export default function Error({children}) {
  return (
    <div className='w-full py-3 bg-red-700 text-white font-bold text-lg'>
        {children}
    </div>
  )
}
