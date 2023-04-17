import ContactoNosotros from "../components/ContactoNosotros";

export default function Nosotros() {
  return (
    <div>
      <div className="text-blanco mt-14 flex flex-col items-center text-center md:flex md:flex-row md:mt-24 md:gap-6">
        <div className="sm:w-1/2 md:w-1/2">
          <h3 className=" font-bold text-3xl p-4 mb-6 sm:px-0 md:text-start md:ml-10 md:mb-0 md:text-5xl">Nuestra historia</h3>
          <p className=" font-light text-base mb-6 p-4 sm:px-0 md:text-start md:ml-10 md:text-lg  ">
            Somos una empresa familiar que lleva mas de 35 años en el mercado.
            Buscamos día a día satisfacer las necesidades de los clientes tanto
            con buenos precios como en calidad de los productos que
            comercializamos, compromiso y excelencia en atención.
          </p>
        </div>
        <div className="mb-12 p-4 w-full sm:w-1/2 sm:px-10 ">
          <img className="sm:w-full" src={"https://i.ibb.co/q9jwR1m/local.png"} alt="" />
        </div>
      </div>
      <ContactoNosotros />
    </div>
  );
}
