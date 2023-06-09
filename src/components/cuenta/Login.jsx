import { useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../utils/firebaseconfig";
import { useNavigate } from "react-router-dom";
import Error from "../reutilizables/Error";

function Login({ setIsLoggedAdmin,setLoggedIn }) {
  const [err , setErr] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      let verificarEmail = false;
      const result = await signInWithPopup(auth, provider);
      // Se ha iniciado sesión con éxito
      const user = result.user.email;
      const uid = result.user.uid
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      // verifica si el email no existe en la base de datos
      if (querySnapshot.empty) {
        verificarEmail = false
      }else{
        // si existe en la base de datos, setea la variable
        verificarEmail = true
      }

      if(result.user.emailVerified && verificarEmail){
      setLoggedIn(true)
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("token",result.user.accessToken);
      navigate('/carrito')
      setErr(false)
      }else{
        setErr(true)
      }
    } catch (error) {
      console.log(error)
    }
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verifica si el usuario existe en Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      const uid = user.uid;
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Usuario no encontrado");
        setErr(true)
        return;
      }
      // Verifica el rol del usuario y redirige a la página correspondiente
      const usuario = querySnapshot.docs[0].data();
      if (usuario.rol === "cliente") {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", true);
        // redireccionar a la pagina de cliente
        navigate("/carrito");
      } else if (usuario.rol === "admin") {
        localStorage.setItem("isLoggedAdmin", true);
        setIsLoggedAdmin(true);      
        // redireccionar a la pagina de administrador
        navigate("/admin");
      }
    } catch (error) {
      setErr(true)
    }
    clearState();
  };

  const clearState = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <main>
        <div>
          <div className=" place-items-center py-[8px]  border-blanco border-[1px] rounded-lg  bg-inherit text-blanco focus:outline-none text-center my-10 flex flex-row items-center justify-center gap-2 font-semibold ">
            <img className="w-[24px] " src={"https://i.ibb.co/S7kKGdz/1486146475-google-plus-79440.png"} alt="" />
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
          {err && <Error cla children={"El usuario no existe"} />}
          <form onSubmit={handleSubmit} className="my-10 flex flex-col ">
            <label>
              <input
                required
                type="email"
                value={email}
                placeholder="E-mail:"
                className="w-full py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit  pl-4 pr-3  text-blanco "
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <input
                required
                type="password"
                value={password}
                placeholder="Contraseña:"
                className="grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit w-full  pl-4 pr-3 my-8  text-blanco "
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className=" font-monsterrat bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
                py-4 px-6 rounded-lg font-semibold text-base mb-10 "
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
    </main>
  );
}

export default Login;
