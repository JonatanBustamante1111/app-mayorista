import { Add, Remove } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function ItemCountProductos({ initial = 1, onAdd, stock }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(initial);
    }, []);
    
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
        <div className='flex gap-2 items-center '>
        <div className='grid grid-rows-3 place-items-center  border-secundario  rounded-lg h-20'>
            <button className='border-none text-2xl font-bold text-secundario  rounded ' variant="text " onClick={increment}><Add /></button>
            <div className='text-xl text-blanco mt-2'>{count}</div>
            <button className='border-none text-2xl font-bold text-secundario rounded  ' variant="text" onClick={decrement}><Remove /></button>
        </div>
        <button>
          <div className=" w-[72px] h-[81px] bg-secundario flex flex-row items-center  justify-center ">
            <div className='w-[30px] h-[30px]'>
                <img
                  onClick={() => onAdd(count)}
                  className=" w-[30px] h-[30px] rounded-xl"
                  src={"https://i.ibb.co/Y3GJLVy/shopping-cart.png"}
                  alt=""
                />
            </div>
          </div>
          </button>
    </div>
    ) 
}