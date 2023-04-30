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
    <section className="flex flex-col w-full px-6 md:ml-10 mt-10">
      <article className="flex flex-col items-start gap-y-4">
        <h1 className="text-3xl text-blanco font-bold md:text-5xl md:mb-4">Contáctanos</h1>
        <p
          className=" 
           h-[136px] w-full leading-[23px] text-start font-montserrat  text-base
           md:text-start lg:h-32 lg:leading-8 text-gray-300"
        >
          ¡Hola! Gracias por visitar nuestra página web. Si tienes alguna pregunta o comentario, por favor completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
      </article>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-5 bg-inherit items-center sm:items-start">
        <input
          type="text"
          value={name}
          placeholder="Nombre"  
          required
          onChange={(e) => setName(e.target.value)}
          className=' w-full pl-4 grid grid-cols-3 place-items-center py-[6px] text-blanco border-secundario border-[1px] rounded-lg  bg-inherit md:mb-4 '
        />
        <input
          type="email"
          value={email}
          placeholder="E-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
          className='w-full pl-4 place-items-center py-[6px]  text-blanco border-secundario border-[1px] rounded-lg  bg-inherit md:mb-4 '

        />
        <textarea
          value={comment}
          placeholder="Escribe tu comentario aquí"
          required
          onChange={(e) => setComment(e.target.value)}
          className='w-full pl-4 grid grid-cols-3 place-items-center pb-20 pt-3 md:mb-10  text-blanco border-secundario border-[1px] rounded-lg  bg-inherit '
        />
          <button
            type="submit"
            className=" 
            bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
            py-4 px-6 rounded-lg font-semibold text-base mb-10"    
          >
            Enviar
          </button>
      
      </form>
    </section>
  );
}

export default ContactoForm;
