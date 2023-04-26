export default function ({ producto}) {
    const {imagen,nombre,precio,cantidad} = producto
  return (
    <article
      className=" 
        flex flex-col gap-y-8 justify-around py-6 border-[1px] border-gray-800 rounded-lg
        md:mt-2 md:flex-row md:justify-between md:mx-8
            "
    >
      <div className="flex ustify-start gap-x-16 items-center px-5">
        <img
          src={imagen}
          className="h-[83px] w-[108px] object-cover rounded-xl"
          alt={`Imagen de ${nombre}`}
        />
        <div className="flex flex-col ">
          <h2 className="text-xl text-blanco font-bold">{nombre}</h2>
          <p className="font-normal text-lg text-gray-300">
           $ {precio} x {cantidad}
          </p>
        </div>
      </div>
    </article>
  );
}
