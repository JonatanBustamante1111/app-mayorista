import React from 'react'
import FaqDropDown from "./FaqDropDown";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
export default function PreguntasFrecuentes() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <section data-aos="fade-up"
    data-aos-duration="3000" className="flex flex-col gap-16 w-full col-span-2">
        <div className="w-full text-center">
          <h2 className=" font-semibold text-2xl text-center text-blanco  mt-10 w-full px-10 ">
            Preguntas frecuentes
          </h2>
          <div className="w-16 font-monsterrat border-2 border-secundario font-medium  text-base my-6 mx-auto"></div>
        </div>
        <div className="faq-page flex flex-col sm:flex-row  sm:justify-center  ">
          <div className="sm:w-full sm:mx-10">
            <FaqDropDown
              question="¿Cual es el monto mínimo?"
              answer="Para ingresar como cliente la primera compra es de $8000 como mínimo, una vez ingresado el mínimo es de $4500. Esta condición se mantiene siempre y cuando haya una compra dentro de un plazo de dos meses."
            />
            <FaqDropDown
              question="¿Formas de pago?"
              answer="Aceptamos pagos de contado mediante deposito y/o transferencia bancaria. Tambien aceptamos pagos mediante la plataforma mercado pago con tarjetas de credito y/o debito."
            />
            <FaqDropDown
              question="¿Envíos a otras provincias?"
              answer="Realizamos envios a todo el pais por medio de correo Andreani, Correo Argentino, BusPack o a convenir."
            />
          </div>
          <div className="sm:w-full sm:mx-10">
            <FaqDropDown
              question="¿Horario de atención?"
              answer="Atendemos de forma presencial en nuestro local ubicado en Capital - San Juaan lunes a viernes de 9 a 17.30 hs y los sábados de 10 a 13 hs. Online las 24 hs."
            />
            <FaqDropDown
              question="¿Tiempo de demora en armar pedido?"
              answer="Los pedidos tienen para realizarse un mínimo de demora 48 hs a partir de la acreditación del pago."
            />
            <FaqDropDown
              question="¿Cantidad de unidades por la compra?"
              answer="La cantidad de unidades figura siempre en la descripción del producto."
            />
          </div>
        </div>
      </section>
  )
}
