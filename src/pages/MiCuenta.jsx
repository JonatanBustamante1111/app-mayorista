import { useState } from "react";
import Registro from "../components/Registro";
import Login from "../components/Login";

export default function MiCuenta({isLoggedAdmin,setIsLoggedAdmin}) {
  const [login, setLogin] = useState(false);

  const handleChangeLogin = () => {
    setLogin(!login);
  };
  return (
    <div className="px-4 my-20 md:my-40 md:w-1/2 md:mx-auto">
       <div className="flex mx-auto rounded-3xl border-secundario border-2 w-80 ">
            <button 
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 w-11/12 py-3 px-6 rounded-3xl mx-auto text-center font-monsterrat font-bold"
             onClick={() => handleChangeLogin()} >Iniciar sesión</button>
            <button 
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-center w-11/12  rounded-3xl mx-auto font-monsterrat font-bold"
            onClick={() => handleChangeLogin()} >Regristrarse</button>
          </div>
      {!login ? (
        <Login handleChangeLogin={handleChangeLogin} isLoggedAdmin={isLoggedAdmin} setIsLoggedAdmin={setIsLoggedAdmin} />
      ) : (
        <Registro handleChangeLogin={handleChangeLogin} />
      )}
    </div>
  );
}
