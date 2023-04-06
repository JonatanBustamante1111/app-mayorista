import React, { useState } from "react";

function ContactoForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      `Nombre: ${name}, Correo electrónico: ${email}, Comentario: ${comment}`
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl text-white font-bold">Contactanos</h1>
      <p
        className=" 
         h-[136px] w-[328px] leading-[23px] text-center font-montserrat  text-base
         md:text-start lg:w-[588px] lg:h-32 lg:leading-8 text-white"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae corrupti
        repellendus quos neque? Eius optio cupiditate architecto doloremque esse
        ipsa culpa eaque placeat, consectetur eligendi ad nobis deleniti
        necessitatibus deserunt.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-inherit">
        <input
          type="text"
          value={name}
          placeholder="Nombre"
          required
          onChange={(e) => setName(e.target.value)}
          className=' grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit '
          
        />
        <input 
          type="email"
          value={email}
          placeholder="E-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
          className=' grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit '
        />
        <textarea
          value={comment}
          placeholder="Escribe tu comentario aquí"
          required
          onChange={(e) => setComment(e.target.value)}
          className=' grid grid-cols-3 place-items-center py-[6px]  border-secundario border-[1px] rounded-lg  bg-inherit '
        />
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-center w-1/2 gap-2 py-3 px-6">
          <button
            type="submit"
            className="text-center font-monsterrat font-semibold   "
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactoForm;
