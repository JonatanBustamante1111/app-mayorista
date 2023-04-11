import React from 'react'
import FaqDropDown from "../components/FaqDropDown";

export default function PreguntasFrecuentes() {
  return (
    <section className="flex flex-col gap-16 w-full col-span-2">
        <div className="w-full text-center">
          <h2 className=" font-semibold text-2xl text-center text-blanco  mt-10 w-full px-10">
            Preguntas frecuentes
          </h2>
          <div className="w-16 font-monsterrat border-2 border-secundario font-medium  text-base my-6 mx-auto"></div>
        </div>
        <div className="faq-page flex flex-col mb-40 sm:flex-row  sm:justify-center  ">
          <div className="sm:w-full sm:mx-14">
            <FaqDropDown
              question="¿Cual es el monto mínimo?"
              answer="Para crear una cuenta, haz clic en el botón 'Registrarse' en la parte superior derecha de la pantalla y sigue las instrucciones."
            />
            <FaqDropDown
              question="¿Formas de pago?"
              answer="Para cambiar tu contraseña, ve a la página de configuración de tu cuenta y haz clic en el enlace 'Cambiar contraseña'."
            />
            <FaqDropDown
              question="¿Envíos a otras provincias?"
              answer="Para cambiar tu contraseña, ve a la página de configuración de tu cuenta y haz clic en el enlace 'Cambiar contraseña'."
            />
          </div>
          <div className="sm:w-full sm:mx-14">
            <FaqDropDown
              question="¿Horario de atención?"
              answer="Para cambiar tu contraseña, ve a la página de configuración de tu cuenta y haz clic en el enlace 'Cambiar contraseña'."
            />
            <FaqDropDown
              question="¿Tiempo de demora en armar pedido?"
              answer="Para cambiar tu contraseña, ve a la página de configuración de tu cuenta y haz clic en el enlace 'Cambiar contraseña'."
            />
            <FaqDropDown
              question="¿Cantidad de unidades por la compra?"
              answer="Para cambiar tu contraseña, ve a la página de configuración de tu cuenta y haz clic en el enlace 'Cambiar contraseña'."
            />
          </div>
        </div>
      </section>
  )
}
