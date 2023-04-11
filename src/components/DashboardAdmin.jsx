import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseconfig";
const DashboardAdmin = ({setIsLoggedAdmin}) => {
  const navigate = useNavigate()
  return (
    <div className=" h-full  w-1/4 absolute top-0 bg-terciario flex flex-col gap-20 p-10">
      <div className="p-10">
        <img src="https://i.ibb.co/1ZWw5fK/logo-crv4-footer.png" alt="" />
      </div>
      <div className="h-full flex flex-col gap-4">
        <Link to="/admin/pedidos">
          <h3 className="text-secundario">Pedidos</h3>
        </Link>
        <Link to="/admin">
          <h3 className="text-secundario">Productos</h3>
        </Link>
        <Link to="/admin/categorias">
          <h3 className="text-secundario">Categorias</h3>
        </Link>
      </div>
      <div>
        <h3 className="text-secundario"  onClick={() => {
              auth.signOut();
              setIsLoggedAdmin(false)
              navigate("/micuenta");
            }}>Cerrar sesión</h3>
      </div>
    </div>
  );
};
export default DashboardAdmin;
