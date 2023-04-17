import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseconfig";
import { useState } from "react";
import CerrarSesion from "./CerrarSesion";

const DashboardAdmin = ({ setIsLoggedAdmin, setLoggedIn }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("productos");
  const [modal, setModal] = useState(false)

  const sesionCerrada = () => {
      auth.signOut();
      console.log('funciona')
      setIsLoggedAdmin(false);
      localStorage.setItem("isLoggedAdmin", false);
      setLoggedIn(false);
      localStorage.setItem("loggedIn", false);
      navigate('/micuenta')
  }

  return (
    <div className=" h-full  w-1/4 absolute top-0 bg-terciario flex flex-col gap-20 py-10 items-center">
      {
        modal && <CerrarSesion sesionCerrada={sesionCerrada} setModal={setModal}/>
      }
      <img className="w-[54px] h-[60px]" src="https://i.ibb.co/1ZWw5fK/logo-crv4-footer.png" alt="" />

      <div className="h-full flex flex-col items-center gap-4 mt-20 w-full">
        <div className={`flex items-center w-full justify-center py-3
          ${activeLink === "pedidos" ? "bg-primario text-secundario border-l-4 border-secundario" : "text-blanco"}
        `}>
        <ion-icon name="reader-sharp"></ion-icon>
          <Link
            to="/admin/pedidos"
            onClick={() => setActiveLink("pedidos")}
          >
            <h3 className="font-semibold">Pedidos</h3>
          </Link>
        </div>
        <div className={`flex items-center w-full justify-center py-3
          ${activeLink === "productos" ? "bg-primario text-secundario border-l-4 border-secundario" : "text-blanco"}
        `}>
          <Link
            to="/admin"
            onClick={() => setActiveLink("productos")}
          >
            <h3 className="font-semibold">Productos</h3>
          </Link>
        </div>
       <div className={`flex items-center w-full justify-center py-3
          ${activeLink === "provedores" ? "bg-primario text-secundario border-l-4 border-secundario" : "text-blanco"}
        `}>
         <Link
           to="/admin/provedores"
           onClick={() => setActiveLink("provedores")}
         >
           <h3 className="font-semibold">Provedores</h3>
         </Link>
       </div>
      </div>
      <div className="flex items-center text-gray-300 font-normal text-sm gap-x-1  ">
      <ion-icon name="log-out-outline"></ion-icon>
        <h3
          className="hover:cursor-pointer"
          onClick={() => setModal(true)}
        >
          Cerrar sesión
        </h3>
      </div>
    </div>
  );
};

export default DashboardAdmin;