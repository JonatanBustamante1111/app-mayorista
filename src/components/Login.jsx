import { useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../utils/firebaseconfig";
import { useNavigate } from "react-router-dom";

function Login({ handleChangeLogin, isLoggedAdmin, setIsLoggedAdmin,loggedIn,setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Se ha iniciado sesión con éxito
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    // Limpiar el listener al desmontar el componente
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verifica si el usuario existe en Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("Usuario no encontrado");
        return;
      }

      // Verifica el rol del usuario y redirige a la página correspondiente
      const usuario = querySnapshot.docs[0].data();
      if (usuario.rol === "cliente") {
        console.log("Bienvenido cliente");
        // redireccionar a la pagina de cliente
        navigate("/carrito");
      } else if (usuario.rol === "admin") {
        console.log("Bienvenido administrador");
        navigate("/admin");
        setIsLoggedAdmin(true);
        // redireccionar a la pagina de administrador
      }
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
    clearState();
  };

  const clearState = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <main>
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
          <div className=" place-items-center py-[6px]  border-blanco border-[1px] rounded-lg  bg-inherit text-blanco focus:outline-none text-center my-10 ">
            <button onClick={handleSignInWithGoogle}>
              Iniciar sesión con Google
            </button>
          </div>
          <div className="flex flex-row  items-center gap-4 justify-center">
            <div className="w-8 border h-0 text-blanco font-monsterrat font-medium  text-base"></div>
            <p className="text-blanco font-monsterrat font-medium  text-base ">
              Ó
            </p>
            <div className="w-8 border h-0 text-blanco font-monsterrat font-medium  text-base"></div>
          </div>
          <form onSubmit={handleSubmit} className="my-10">
            <label>
              <input
                type="email"
                value={email}
                placeholder="E-mail:"
                className="grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit w-full  pl-3 pr-3  text-blanco "
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <input
                type="password"
                value={password}
                placeholder="Contraseña:"
                className="grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit w-full  pl-3 pr-3 my-8  text-blanco "
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-center w-11/12 gap-2 py-3 px-6 rounded-lg mx-auto mb-20">
              <button
                type="submit"
                className="text-center font-monsterrat font-semibold  "
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

export default Login;
