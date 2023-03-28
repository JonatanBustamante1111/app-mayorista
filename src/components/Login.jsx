import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../utils/firebaseconfig";
import { Link } from "react-router-dom";

function Login({ setLogin, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      } else if (usuario.rol === "admin") {
        console.log("Bienvenido administrador");
        // redireccionar a la pagina de administrador
      }
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
      <h2 className="font-monsterrat text-slate-700 text-center font-bold text-3xl pt-8">Iniciar Sesion</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Correo electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Iniciar Sesión</button>
          <div>
            <button onClick={()=> setLogin(!login)}>Registrate</button>
          </div>
        </form>
      </div>
      <div>
        <Link to={"/"}>
          <button>Volver</button>
        </Link>
      </div>
    </main>
  );
}

export default Login;
