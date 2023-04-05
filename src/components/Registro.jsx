import { useState } from 'react';
import { createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, addDoc,doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseconfig';
import { useNavigate } from 'react-router-dom'

function Registro({handleChangeLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crea un nuevo usuario con el rol "cliente"
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;
      const userDocRef = await addDoc(collection(db, "usuarios"), {
        uid,
        email,
        password,
        rol: 'cliente',
      });
      console.log("Usuario registrado con ID: ", userDocRef.id);
      alert('el usuario ha sido creado con exito')
      navigate('/micuenta')
    } catch (error) {
      console.log(error);
    }
    clearState()
  };


const handleSignUpWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // Se ha iniciado sesión con éxito
    const user = result.user;
    const uid = user.uid;
    const displayName = user.displayName;
    const email = user.email;

    // Crea un nuevo usuario en Firestore
    const usuariosRef = collection(db, "usuarios");
    const usuarioDoc = doc(usuariosRef, uid);
    await setDoc(usuarioDoc, { displayName, email, uid, rol: "cliente" });

    // Muestra un mensaje de éxito
    console.log("Se ha registrado el usuario con éxito");

  } catch (error) {
    console.error(error);
  }
};
  const clearState = () => {
    setEmail('')
    setPassword('')
  }
  return (
    <div>
            <h2 className="font-monsterrat text-slate-700 text-center font-bold text-3xl pt-8 ">Registro</h2>
            <button onClick={handleSignUpWithGoogle}>Registrarse con Google</button>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Correo electrónico:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Contraseña:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type="submit">Registrarse</button>
        </form>
      </div>
      <div>
          <button onClick={()=> handleChangeLogin()}>Volver</button>
      </div>
    </div>
  );
}

export default Registro;