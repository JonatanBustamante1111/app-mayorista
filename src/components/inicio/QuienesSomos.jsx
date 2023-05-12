const QuienesSomos = () => {
  return (
    <section className="flex flex-col items-center w-full col-span-2">
      <div className="mb-16">
          <h2 className=" font-semibold text-2xl text-center text-blanco  mt-10 w-full">
            ¿Quienes somos?
          </h2>
          <div className="w-16 font-monsterrat border-2 border-secundario font-medium  text-base my-6 mx-auto"></div>
      </div>
      <div className="sm:flex sm:flex-row md:flex md:flex-row md:items-center mb-16">
        <div className="text-center md:w-1/2 md:pr-10">
        <p className=" ml-4 mb-4 sm:mb-0 text-center font-montserrat font-normal  text-lg sm:text-left text-white sm:ml-10 ">
          Somos una empresa familiar que lleva mas de 35 años en el mercado.
          Buscamos día a día satisfacer las necesidades de los clientes tanto con
          buenos precios como en calidad de los productos que comercializamos,
          compromiso y excelencia en atención.
        </p>
        </div>
        <div className="w-full p-4 mr-4 sm:w-1/2 sm:p-0 sm:mr-10">
        <img className=" rounded-md" src={'https://i.ibb.co/yB4WDyv/Whats-App-Image-2023-04-17-at-15-16-1-min.jpg'} alt="" />
            </div>
      </div>
  </section>
  );
};
export default QuienesSomos;