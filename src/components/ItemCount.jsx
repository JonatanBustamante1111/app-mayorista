import { Add, Remove } from '@mui/icons-material';
import { useState,useEffect } from 'react';

export default function ItemCount ({initial = 1, onAdd}){
    const [count, setCount] = useState(0);
    console.log(count)
    useEffect(() => {
        setCount(initial);
    }, []);

    const increment = () => {
        setCount(count + 1);
        
    }

    const decrement = () => {
        setCount(count - 1);
    }
    if(count <=0){
        setCount(count + 1)
    }
    return (
        <div className="mt-10 ">
            <div className='grid md:grid-cols-2 gap-y-7 md:gap-0'>
                <div className='flex w-full md:w-[80%] items-center justify-between'>
                    <button className='border-none text-2xl font-bold text-indigo-700 px-[3px] pb-[6px] rounded bg-slate-300 ' variant="text" onClick={decrement}><Remove /></button>
                    <div className='text-4xl'>{count}</div>
                    <button className='border-none text-2xl font-bold text-indigo-700 px-[3px] pb-[6px] rounded bg-slate-300 ' variant="text " onClick={increment}><Add /></button>
                </div>
                <button 
                    onClick={()=> onAdd(count)}
                    className='py-2 px-3 bg-indigo-600 text-white font-semibold rounded-lg flex justify-center gap-x-3'
                >
                Agregar al carrito <span className='text-xl'><ion-icon name="cart-sharp"></ion-icon></span>
                </button>
            </div>
        </div>
    )
};
