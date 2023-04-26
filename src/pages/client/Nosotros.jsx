import ContactoNosotros from "../../components/nosotros/ContactoNosotros";
import SliderNosotros from "../../components/nosotros/SliderNosotros";

export default function Nosotros() {
  return (
    <div>
      <div className="text-blanco mt-10 md:mt-44 flex flex-col items-center text-center">
        <div>
          <h3 className=" font-bold text-3xl text-center mb-6 sm:px-0 md:ml-10 md:mb-0 md:text-5xl">Nuestra historia</h3>
          <p className=" font-light text-base text-center mb-6 p-4 sm:px-0  md:mx-8 md:text-lg  ">
            Somos una empresa familiar que lleva mas de 35 años en el mercado.
            Buscamos día a día satisfacer las necesidades de los clientes tanto
            con buenos precios como en calidad de los productos que
            comercializamos, compromiso y excelencia en atención.
          </p>
        </div>
        <div className="mb-12 w-full">
          <SliderNosotros/>
        </div>
      </div>
      <ContactoNosotros />
    </div>
  );
}
