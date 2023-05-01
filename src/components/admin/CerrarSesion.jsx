

import { useLocation } from "react-router-dom";

const CerrarSesion = ({ sesionCerrada, setModal }) => {
  const location = useLocation();
  const esAdmin =  location.pathname == "/admin" ||
  location.pathname == "/admin/proveedores" ||
  location.pathname == "/admin/categorias" ||
  location.pathname == "/admin/pedidos" 

  return (
    esAdmin 
      ? <div className="bg-terciario z-20 w-full absolute left-[40%] top-[20%] sm:left-[10%] sm:w-[80%]  md:left-[15%] md:w-[660px] lg:left-[140%] xl:left[180%] rounded-xl py-10 px-4">
      <div className="flex flex-col items-center justify-center gap-8">
        <img src={"https://i.ibb.co/FhMJk06/logout.png"} alt="" />
        <h3 className=" font-bold text-2xl text-blanco">Cerrar sesión</h3>
        <p className="font-light text-xl text-blanco text-center mb-6">
        ¿Estás seguro de cerrar la sesión? Una vez realizada esta acción,
          regresarás al formulario de Login.
        </p>
      </div>
      <div className="flex flx-row gap-8 p-4">
        <button
          className=" w-full sm:w-1/2
                        text-center font-semibold text-lg py-4 px-6 border-secundario border-2 text-secundario
                         rounded-xl
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
                          sesionCerrada();
                        }}
        >
          Cerrar sesion
        </button>
      </div>
      </div>
      : <div className="bg-terciario z-20 w-full absolute left-[0%] top-[20%] sm:left-[10%] sm:w-[80%]  md:left-[15%] md:w-[660px] lg:left-[30%] xl:left[40%] rounded-xl py-10 px-4">
      <div className="flex flex-col items-center justify-center gap-8">
        <img src={"https://i.ibb.co/FhMJk06/logout.png"} alt="" />
        <h3 className=" font-bold text-2xl text-blanco">Cerrar sesión</h3>
        <p className="font-light text-xl text-blanco text-center mb-6">
        ¿Estás seguro de cerrar la sesión? Una vez realizada esta acción,
          regresarás al formulario de Login.
        </p>
      </div>
      <div className="flex flx-row gap-8 p-4">
        <button
          className=" w-full sm:w-1/2
                        text-center font-semibold text-lg py-4 px-6 border-secundario border-2 text-secundario
                         rounded-xl
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
                          sesionCerrada();
                        }}
        >
          Cerrar sesion
        </button>
      </div>
      </div>
  );
};
export default CerrarSesion;

