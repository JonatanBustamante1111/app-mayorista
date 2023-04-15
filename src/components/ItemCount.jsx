import { Add, Remove } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function ItemCount({ initial = 1, onAdd, stock }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        setCount(initial);
    }, []);
    console.log(stock)
    const increment = () => {
        if(stock > count){
        setCount(count + 1);
        }
       
    }

    const decrement = () => {
        setCount(count - 1);
    }
    if (count <= 0) {
        setCount(count + 1)
    }
    return (


        <div className='flex w-full  justify-between'>
            <div className='w-36 grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg'>
                <button className='border-none text-2xl font-bold text-secundario px-[3px] pb-[6px] rounded' variant="text" onClick={decrement}><Remove /></button>
                <div className='text-xl text-blanco'>{count}</div>
                <button className='border-none text-2xl font-bold text-secundario px-[3px] pb-[6px] rounded' variant="text " onClick={increment}><Add /></button>
            </div>

            <button
                onClick={() => onAdd(count)}
                className=' lg:w-[300px]
                bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600
                py-4 px-6 text-sm text-primario font-bold
                rounded-lg  '
            >
                Agregar al carrito 
            </button>
        </div>
    )
};
