const CardProveedor = ({setId,setModal2,proveedor}) => {
  return (
    <div className="grid grid-cols-[2fr,4fr,4fr,1fr] gap-x-4 border-b-2 mb-6">
      <h3 className=" text-blanco  ">
        {proveedor.id.substring(0, 5)}
      </h3>
      <p className=" text-xl  text-blanco mb-4">
        {proveedor.nombre}
      </p>
      <p className=" text-xl  text-blanco">{proveedor.fecha}</p>
      <div className="flex justify-end items-center  gap-x-7 px-3">
        <button
          onClick={() => {
            setId(proveedor.id);
            setModal2(true);
          }}
          className="text-rojo w-full"
        >
          <ion-icon name="trash-sharp"></ion-icon>
        </button>
      </div>
    </div>
  );
};
export default CardProveedor;