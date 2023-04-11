import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseconfig";
import { useState } from "react";

const DashboardAdmin = ({ setIsLoggedAdmin,setLoggedIn }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");

  return (
    <div className=" h-full  w-1/4 absolute top-0 bg-terciario flex flex-col gap-20 p-10">
      <div className="p-10">
        <img src="https://i.ibb.co/1ZWw5fK/logo-crv4-footer.png" alt="" />
      </div>
      <div className="h-full flex flex-col gap-4">
        <Link
          to="/admin/pedidos"
          className={activeLink === "pedidos" ? "text-blanco" : "text-secundario"}
          onClick={() => setActiveLink("pedidos")}
        >
          <h3>Pedidos</h3>
        </Link>
        <Link
          to="/admin"
          className={activeLink === "productos" ? "text-blanco" : "text-secundario"}
          onClick={() => setActiveLink("productos")}
        >
          <h3>Productos</h3>
        </Link>
        <Link
          to="/admin/categorias"
          className={activeLink === "categorias" ? "text-blanco" : "text-secundario"}
          onClick={() => setActiveLink("categorias")}
        >
          <h3>Categorias</h3>
        </Link>
      </div>
      <div>
        <h3
          className="text-secundario  hover:cursor-pointer"
          onClick={() => {
            auth.signOut();
            setIsLoggedAdmin(false);
            setLoggedIn(false);
            navigate("/");

          }}
        >
          Cerrar sesión
        </h3>
      </div>
    </div>
  );
};

export default DashboardAdmin;