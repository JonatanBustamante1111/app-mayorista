import { useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../utils/firebaseconfig";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login({ handleChangeLogin, isLoggedAdmin, setIsLoggedAdmin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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
  console.log(isLoggedAdmin);

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
          <div>
            <h2 className="font-monsterrat text-slate-700 text-center font-bold text-3xl pt-8">
              Iniciar Sesion
            </h2>
            <div>
              <button onClick={handleSignInWithGoogle}>
                Iniciar sesión con Google
              </button>
            </div>
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
              <button type="submit" className="btn btn-primary my-4">
                Iniciar sesión
              </button>
            </form>
            <div>
              ¿No tienes cuenta?{" "}
              <button onClick={() => handleChangeLogin()}> Registrate</button>
            </div>
          </div>
          <div>
            <Link to={"/"}>
              <button>Volver</button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export default Login;
