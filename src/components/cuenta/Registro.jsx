import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { collection, addDoc, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../utils/firebaseconfig";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Error from "../reutilizables/Error";

function Registro({setLoggedIn}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr] = useState(false);
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let verificarEmail = false;
      // Crea un nuevo usuario con el rol "cliente"
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      const userDocRef = await addDoc(collection(db, "usuarios"), {
        uid,
        email,
        password,
        rol: "cliente",
      });
      Swal.fire({
        icon: "success",
        title: "¡El usuario ha sido creado con exito!",
      });
      // guarda el estado logueo
      setLoggedIn(true)
      localStorage.setItem("loggedIn", true);
      setErr(false)
      navigate("/carrito");
    } catch (error) {
      setErr(true)
    }
    clearState();
  };

  const handleSignUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      let verificarEmail = false;
      // Se ha iniciado sesión con éxito
      const user = result.user;
      const email = result.user.email;
      const uid = result.user.uid;
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
     
      if (querySnapshot.empty) {
        verificarEmail = false;
      } else {
        verificarEmail = true;
      }

      if (result.user.emailVerified && !verificarEmail) {
        // Crea un nuevo usuario en Firestore
        const usuarioDoc = doc(usuariosRef, uid);
         // Se ha iniciado sesión con éxito
        const displayName = user.displayName;
        await setDoc(usuarioDoc, { displayName, email, uid, rol: "cliente" }).then(
          res => {
            // guarda el token 
            // guarda el estado logueo
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("token", result.user.accessToken);
            setLoggedIn(true);
            setErr(false)
            navigate("/carrito");
          }
        );
      }else{
        setErr(true)
      }

    } catch (error) {
      console.error(error);
    }
  };
  const clearState = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className=" place-items-center py-[8px]  border-blanco border-[1px] rounded-lg  bg-inherit text-blanco focus:outline-none text-center my-10 flex flex-row items-center justify-center gap-2 font-semibold ">
        <img
          className="w-[24px] "
          src={"https://i.ibb.co/S7kKGdz/1486146475-google-plus-79440.png"}
          alt=""
        />
        <button onClick={handleSignUpWithGoogle}>Registrarse con Google</button>
      </div>
      <div className="flex flex-row  items-center gap-4 justify-center">
        <div className="w-8 border h-0 text-blanco font-monsterrat font-medium  text-base"></div>
        <p className="text-blanco font-monsterrat font-medium  text-base ">Ó</p>
        <div className="w-8 border h-0 text-blanco font-monsterrat font-medium  text-base"></div>
      </div> 
      {err && <Error children={"El usuario ya existe"} />}
      <form onSubmit={handleSubmit} className="my-10">
        <input
          required
          type="email"
          value={email}
          placeholder="E-mail:"
          onChange={(e) => setEmail(e.target.value)}
          className="grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit w-full  pl-4 pr-3 my-8  text-blanco "
        />

        <input
          required
          type="password"
          value={password}
          placeholder="Contraseña:"
          onChange={(e) => setPassword(e.target.value)}
          className="grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit w-full  pl-4 pr-3 my-8  text-blanco "
        />
        <div className=" w-full flex justify-center">
          <button
            type="submit"
            className=" font-monsterrat bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
                py-4 px-6 rounded-lg font-semibold text-base mb-10 "
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registro;
