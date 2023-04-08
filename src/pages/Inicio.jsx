import React from "react";
import { Link } from "react-router-dom";
import FaqDropDown from "../components/FaqDropDown";

export default function Inicio() {
  return (
    <main className="gap-y-4 md:gap-0 md:grid md:grid-cols-2 items-center justify-center md:mt-10 lg:mt-0">
      <section className=" flex flex-col place-items-center md:items-start gap-y-4 md:gap-0 md:pl-10">
        <h1
          className=" 
          w-[328px] mt-10 text-center h-[177px] leading-[59px] text-white text-5xl
          md:text-start 
          lg:w-[518px] lg:h-[294px] lg:text-[82px] lg:leading-[97px] font-bold  "
        >
          Accesorios con estilo {""} {""}
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            único
          </span>
        </h1>
        <p
          className=" 
        h-[136px] w-[328px] leading-[23px] text-center font-montserrat font-normal text-base



          Somos un mayorista que ofrece una amplia variedad de productos y accesorios de calidad que atraen la buena suerte y la prosperidad, para que puedas hacer crecer tu negocio, alcanzar tus objetivos y que tus clientes luzcan con estilo y elegancia.

        md:text-start lg:w-[588px] lg:h-32 lg:leading-8 text-white mb-16"
        >
          Somos un mayorista que ofrece una amplia variedad de productos y
          accesorios de calidad que atraen la buena suerte y la prosperidad,
          para que puedas hacer crecer tu negocio, alcanzar tus objetivos y que
          tus clientes luzcan con estilo y elegancia.
        </p>
        <Link
          to="/productos"
          className="
            bg-gradient-to-r text-center from-yellow-400 via-yellow-500 to-yellow-600 w-[282px]
            py-4 px-6 rounded-lg font-semibold text-base mb-10"
        >
          Ver Productos
        </Link>
      </section>
      <section className="w-full h-[428px]  md:h-[705px] xl:h-[768px] -z-10">
        <img
          src="https://i.ibb.co/4THzyVG/image-3-1.png"
          alt="Mina Facherarda"
          className="w-full h-full transform scale-x-[-1] scale-y-[1]  "
        />
      </section>
      <section className=" flex flex-col p-10 gap-16 w-full bg-blanco col-span-2 md:flex-row justify-between md:w-full">
        <div className="text-center  md:w-1/3">
          <img
            className="mx-auto"
            src="https://i.ibb.co/q7g6syb/local-mall.png"
            alt=""
          />
          <h2 className=" font-bold text-3xl my-2 md:my-4">500+ productos</h2>
          <p className=" font-light text-sm my-2">
            Al precio más económico y conveniente para tu negocio.
          </p>
        </div>
        <div className="text-center md:w-1/3">
          <img
            className="mx-auto my-2"
            src="https://i.ibb.co/xFkSzbL/local-shipping.png"
            alt=""
          />
          <h2 className=" font-bold text-3xl  md:my-4">Envío rápido</h2>
          <p className=" font-light text-sm my-4 ">
            Dentro de la provincia y por toda la República Argentina, de manera
            facil.
          </p>
        </div>
        <div className="text-center  md:w-1/3">
          <img
            className="mx-auto my-2"
            src="https://i.ibb.co/xFkSzbL/local-shipping.png"
            alt=""
          />
          <h2 className=" font-bold text-3xl my-2 md:my-4">Pagos seguros</h2>
          <p className=" font-light text-sm my-2">
            Dentro de la plataforma y mediante diversos métodos de pago.
          </p>
        </div>
      </section>
      <section className="flex flex-col p-10 gap-16 w-full col-span-2 ">
        <div className="w-full text-center">
          <h2 className=" font-semibold text-3xl text-center text-blanco px-10 pt-20 mt-10 w-full">
            ¿Qué productos ofrecemos?
          </h2>
          <div className="w-16 font-monsterrat border-2 border-secundario font-medium  text-base my-6 mx-auto"></div>
        </div>
        <div className="flex flex-col">
        <div
            className=" bg-cover w-full h-72 flex flex-row  rounded-xl mb-10"
            style={{
              backgroundImage: `url('https://i.ibb.co/svpt9rd/unsplash-uf-IDew-I6i-Q.png')`,
            }}
          >
            <h3 className="p-6 font-semibold text-2xl text-blanco self-end ">
              Accesorios de acero
            </h3>
          </div>
          <div
            className=" bg-cover w-full h-72 flex flex-row  rounded-xl mb-10"
            style={{
              backgroundImage: `url('https://i.ibb.co/Xy0Bjps/image-15.png')`,
            }}
          >
            <h3 className="p-6 font-semibold text-2xl text-blanco self-end ">
              Accesorios de plata
            </h3>
          </div>
          <div
            className=" bg-cover w-full h-72 flex flex-row  rounded-xl mb-10"
            style={{
              backgroundImage: `url('https://i.ibb.co/bgCYTg8/unsplash-Foe-IOgzt-CXo.png')`,
            }}
          >
            <h3 className="p-6 font-semibold text-2xl text-blanco self-end ">
              Maquillaje
            </h3>
          </div>
          <div
            className=" bg-cover w-full h-72 flex flex-row  rounded-xl mb-10"
            style={{
              backgroundImage: `url('https://i.ibb.co/02wybSL/image-17.png')`,
            }}
          >
            <h3 className="p-6 font-semibold text-2xl text-blanco self-end ">
              Marroquineria
            </h3>
          </div>
          <div
            className=" bg-cover w-full h-72 flex flex-row  rounded-xl mb-10"
            style={{
              backgroundImage: `url('https://i.ibb.co/fNHKsDs/unsplash-7c-ERndk-Oy-Dw.png')`,
            }}
          >
            <h3 className="p-6 font-semibold text-2xl text-blanco self-end ">
            Textil
            </h3>
          </div>
       
       
        </div>
      </section>
      <section className="flex flex-col gap-16 w-full col-span-2">
        <div className="w-full text-center">
          <h2 className=" font-semibold text-2xl text-center text-blanco  mt-10 w-full">
            ¿Productos destacados?
          </h2>
          <div className="w-16 font-monsterrat border-2 border-secundario font-medium  text-base my-6 mx-auto"></div>
        </div>
      </section>
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
      <section className=" flex flex-col gap-16 w-full bg-blanco col-span-2 sm:flex-row sm:gap-0 sm:w-full md:flex-row md: justify-between md:w-full">
        <div className="text-center mt-10 p-6 sm:w-1/2 sm:text-left sm:px-0 sm:pl-10 md:w-1/2  ">
          <h2 className=" font-bold text-3xl w-full md:my-4 ">¿Aún tenes dudas?</h2>
          <p className=" font-light text-sm w-full my-4 mb-14 ">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.
          </p>
          <button
            type="submit"
            className=" w-full sm:w-1/2
            text-center font-semibold py-4 px-6 
            bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
            rounded-lg
            "
          >
            Contacto
          </button>
        </div>
        <div className="text-center  md:w-1/2">
          <img
            className="mx-auto h-full"
            src="https://i.ibb.co/4dWZK9M/image-10.png"
            alt=""
          />
        </div>
      </section>
    </main>
  );
}
