import { useState } from "react";
import Registro from "../components/Registro";
import Login from "../components/Login";

export default function MiCuenta({isLoggedAdmin,setIsLoggedAdmin}) {
  const [login, setLogin] = useState(false);

  const handleChangeLogin = () => {
    setLogin(!login);
  };
  return (
    <div>
      {!login ? (
        <Login handleChangeLogin={handleChangeLogin} isLoggedAdmin={isLoggedAdmin} setIsLoggedAdmin={setIsLoggedAdmin} />
      ) : (
        <Registro handleChangeLogin={handleChangeLogin} />
      )}
    </div>
  );
}
