import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseconfig';
import { Link } from 'react-router-dom'

function Registro({handleChangeLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    } catch (error) {
      console.log(error);
    }
    clearState()
  };
  const clearState = () => {
    setEmail('')
    setPassword('')
  }
  return (
    <div>
            <h2 className="font-monsterrat text-slate-700 text-center font-bold text-3xl pt-8 ">Registro</h2>

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