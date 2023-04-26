import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({ children, link, onClick }) {
    return (
        <Link
            to={link}
            onClick={onClick}
            className='
            bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
            py-4 px-6 rounded-lg font-semibold text-base'
        >
            {children}
        </Link>
    )
}
