import {useState } from "react";
import Registro from "../components/cuenta/Registro";
import Login from "../components/cuenta/Login";
import {auth } from "../utils/firebaseconfig";
import CerrarSesion from "../components/admin/CerrarSesion";

export default function MiCuenta({ setIsLoggedAdmin,setLoggedIn,loggedIn,isLoggedAdmin}) {
  const [login, setLogin] = useState(false);
  const [modal,setModal] = useState(false);

  const handleChangeLogin = () => {
    setLogin(!login);
  };
  
  const sesionCerrada = () =>{
    auth.signOut();
    setLoggedIn(false); // actualiza loggedIn a false
    localStorage.setItem("loggedIn", false);
  }
  return (
    <div className="px-4 my-20 md:my-40 md:w-1/2 md:mx-auto">
      {
        modal && <CerrarSesion sesionCerrada={sesionCerrada} setModal={setModal}/>
      }
      {loggedIn ? (
        <div className="text-blanco text-center">
          <p className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-bold text-3xl sm:text-4xl md:text-5xl   mb-24">¡Bienvenido! Ya has iniciado sesión.</p>
          <div className="flex items-center justify-center text-gray-300 font-normal text-xl gap-x-1 ">
          <ion-icon name="log-out-outline"></ion-icon>
          <button
            onClick={() => setModal(true)}
          >
            Cerrar sesión
          </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex mx-auto rounded-3xl border-secundario border w-80 ">
  <button
    className={`bg-gradient-to-r text-blanco via-yellow-500 to-yellow-600 w-1/2${
      !login ? " from-yellow-400 font-bold text-primario " : ""
    } from-yellow-0 w-11/12 py-3 px-6 rounded-3xl mx-auto text-center font-monsterrat`}
    onClick={() => handleChangeLogin()}
  >
    Iniciar sesión
  </button>
  <button
    className={`bg-gradient-to-r text-blanco via-yellow-500 to-yellow-600  w-1/2 ${
      login ? "from-yellow-400 font-bold text-primario" : ""
    } from-yellow-0 via-yellow-500 to-yellow-600 text-center w-11/12 rounded-3xl mx-auto font-monsterrat`}
    onClick={() => handleChangeLogin()}
  >
    Registrarse
  </button>
</div>
          {!login ? (
            <Login
              setIsLoggedAdmin={setIsLoggedAdmin}
              setLoggedIn={setLoggedIn}
            />
          ) : (
            <Registro  setLoggedIn={setLoggedIn} />
          )}
        </div>
      )}
    </div>
  );
}
