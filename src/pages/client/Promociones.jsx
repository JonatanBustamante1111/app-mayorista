import ContactoNosotros from "../../components/nosotros/ContactoNosotros";
import CarruselNovedadesPromociones from "../../components/nosotros/CarruselNovedadesPromociones";

export default function Promociones() {
  return (
    <div>
      <div className="text-blanco  sm:mt[72px] md:mt-[86px] flex flex-col items-center text-center">
        <div className="mb-12 w-full">
          <CarruselNovedadesPromociones/>
        </div>
      </div>
      <ContactoNosotros />
    </div>
  );
}
