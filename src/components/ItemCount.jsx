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
        <div className="d-flex gap-3 justify-content-center w-100">
            <div className='px-2 d-flex gap-2 align-items-center'>
                <button className='border-0' variant="text " onClick={increment}><Add /></button>
                <div className='fs-4'>{count}</div>
                <button className='border-0' variant="text" onClick={decrement}><Remove /></button>
            </div>
            <button onClick={()=> onAdd(count)}>AGREGAR A CARRITO</button>
        </div>
    )
};
