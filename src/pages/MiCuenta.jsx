import { useState } from 'react'
import Registro from '../components/Registro'
import Login from '../components/Login'

export default function MiCuenta() {

    const [login, setLogin] = useState(false)

    const handleChangeLogin = () => {
        setLogin(!login)
    }
    return (
        <div>
            {
                !login ? <Login handleChangeLogin={handleChangeLogin} /> : <Registro handleChangeLogin={handleChangeLogin} />
            }

        </div>
    )
}
