const QuienesSomos = () => {
  return (
    <section className="flex flex-col items-center w-full col-span-2">
      <div className="mb-16">
          <h2 className=" font-semibold text-2xl text-center text-blanco  mt-10 w-full">
            ¿Quienes somos?
          </h2>
          <div className="w-16 font-monsterrat border-2 border-secundario font-medium  text-base my-6 mx-auto"></div>
      </div>
      <div className="text-center md:w-1/2">
      <p className=" px-4  text-center font-montserrat font-normal  text-lg md:text-center text-white mb-24 ">
        Somos una empresa familiar que lleva mas de 35 años en el mercado.
        Buscamos día a día satisfacer las necesidades de los clientes tanto con
        buenos precios como en calidad de los productos que comercializamos,
        compromiso y excelencia en atención.
      </p>
    </div>
  </section>
  );
};
export default QuienesSomos;