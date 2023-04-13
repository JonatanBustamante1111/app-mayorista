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
              answer="Para ingresar como cliente la primera compra es de $8000 de mínimo, ya ingresada el mínimo es de $4500. Esta condición se mantiene siempre y cuando halla una compra dentro de los dos meses"
            />
            <FaqDropDown
              question="¿Formas de pago?"
              answer="Forma de pago. de contado, deposito y/o transferencia (sujeto a plus si correnponde)."
            />
            <FaqDropDown
              question="¿Envíos a otras provincias?"
              answer="Realizamos envios a todo el pais por medio de correo Andreani, Correo Argentino, BusPack o a convenir"
            />
          </div>
          <div className="sm:w-full sm:mx-14">
            <FaqDropDown
              question="¿Horario de atención?"
              answer="Atendemos de lunes a viernes de 9 a 17.30 y los sábados de 10 a 13. Online 24H."
            />
            <FaqDropDown
              question="¿Tiempo de demora en armar pedido?"
              answer="Demora para realizar los pedidos mínimo 48H. a partir de la acreditación del pago."
            />
            <FaqDropDown
              question="¿Cantidad de unidades por la compra?"
              answer="cantidad de unidades...figura en la descripción del producto."
            />
          </div>
        </div>
      </section>
  )
}
