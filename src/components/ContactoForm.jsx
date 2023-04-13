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
    <section className="flex flex-col  ml-10 mt-6">
      <article className="flex flex-col items-start gap-y-4">
        <h1 className="text-3xl text-blanco font-bold">Contáctanos</h1>
        <p
          className=" 
           h-[136px] w-[328px] leading-[23px] text-start font-montserrat  text-base
           md:text-start lg:w-[588px] lg:h-32 lg:leading-8 text-gray-300"
        >
          ¡Hola! Gracias por visitar nuestra página web. Si tienes alguna pregunta o comentario, por favor completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
      </article>
      <form onSubmit={handleSubmit} className="w-[95%] flex flex-col gap-y-5 bg-inherit">
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
          <button
            type="submit"
            className=" w-[90%] mx-auto
            text-center font-semibold py-4 px-6
            bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
            rounded-lg
            "
            
          >
            Enviar
          </button>
      
      </form>
    </section>
  );
}

export default ContactoForm;
