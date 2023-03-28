import { useState } from 'react'
import Registro from '../components/Registro'
import Login from '../components/Login'

export default function MiCuenta() {

    const [login, setLogin] = useState(false)

    return (
        <div>
            <input
                onClick={() => setLogin(!login)}
                className='px-2 py-1 rounded bg-slate-800 text-white uppercase font-semibold text-lg mx-auto'
                type="button"
                value={`${!login ? 'iniciar sesion' : 'Registrarse'}`}
            />
            {
                !login ? <Login setLogin={setLogin} login={login}/> : <Registro />
            }

        </div>
    )
}
