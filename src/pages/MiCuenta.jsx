import { useState } from "react";
import Registro from "../components/Registro";
import Login from "../components/Login";
import { auth } from "../utils/firebaseconfig";

export default function MiCuenta({ setIsLoggedAdmin }) {
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleChangeLogin = () => {
    setLogin(!login);
  };
  return (
    <div className="px-4 my-20 md:my-40 md:w-1/2 md:mx-auto">
      {loggedIn ? (
        <div className="text-blanco text-center">
          <p>¡Bienvenido! Ya has iniciado sesión.</p>
          <button
            onClick={() => {
              auth.signOut();
              setLoggedIn(false); // actualiza loggedIn a false
            }}
          >
            Cerrar sesión
          </button>
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
            <Registro handleChangeLogin={handleChangeLogin} />
          )}
        </div>
      )}
    </div>
  );
}
