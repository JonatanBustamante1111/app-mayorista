import { useState } from "react";
import Registro from "../components/Registro";
import Login from "../components/Login";

export default function MiCuenta({isLoggedAdmin,setIsLoggedAdmin}) {
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleChangeLogin = () => {
    setLogin(!login);
  };
  return (
    <div className="px-4 my-20 md:my-40 md:w-1/2 md:mx-auto">
        {loggedIn ? (
        <div>
          <p>¡Bienvenido! Ya has iniciado sesión.</p>
          <button
            onClick={() => {
              auth.signOut();
              setIsLoggedAdmin(false);
            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : ( 
        <div>
          <div className="flex mx-auto rounded-3xl border-secundario border-2 w-80 ">
            <button 
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 w-11/12 py-3 px-6 rounded-3xl mx-auto text-center font-monsterrat font-bold"
              onClick={() => handleChangeLogin()} >Iniciar sesión</button>
            <button 
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-center w-11/12  rounded-3xl mx-auto font-monsterrat font-bold"
              onClick={() => handleChangeLogin()} >Registrarse</button>
          </div>
          {!login ? (
            <Login handleChangeLogin={handleChangeLogin} isLoggedAdmin={isLoggedAdmin} setIsLoggedAdmin={setIsLoggedAdmin} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          ) : (
            <Registro handleChangeLogin={handleChangeLogin} />
          )}
        </div>
      )}
    </div>
  );
}
