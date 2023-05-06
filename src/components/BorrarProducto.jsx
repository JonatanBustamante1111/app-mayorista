const BorrarProducto = ({ eliminarProducto, setModal, titulo,  nombre, sustantivo }) => {
  return (
    <div className="bg-terciario z-20 w-full fixed left-[40%] top-[20%] sm:w-[75%] md:w-[660px] rounded-xl flex flex-col gap-12 py-10 px-6">
      <div className="flex flex-col items-center justify-center gap-8">
        <img src={"https://i.ibb.co/mB3dP2x/delete.png"} alt="" />
        <h3 className=" font-bold text-2xl text-blanco">{titulo}</h3>
        <p className="font-light text-xl text-gray-300 text-center">
        ¿Estás seguro de eliminar {sustantivo} <span className="text-blanco font-bold">{nombre}</span>  del sistema? Una vez realizada esta acción, no podrá revertirse.
        </p>
      </div>
      <div className="flex flx-row gap-8 p-4">
        <button
          className=" 
            w-full sm:w-1/2 text-center font-semibold text-lg py-4 px-6
          border-secundario border-2 text-secundario rounded-xl
          "
          onClick={() => setModal(false)}
        >
          Cancelar
        </button>
        <button
          className=" w-full sm:w-1/2
                          text-center font-semibold py-4 px-6 text-lg
                          bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                          rounded-xl
                          "
          onClick={() => {
            setModal(false);
            eliminarProducto();
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
export default BorrarProducto;
