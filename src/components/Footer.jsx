import { Link } from "react-router-dom";

function Footer() {
    return ( 
        <div className="flex flex-col md:flex-row md:justify-between py-12 md:px-14 gap-10 text-white bg-terciario">
        <div className="flex flex-col items-center md:flex-row gap-12">
            <div>
                <img src="https://i.ibb.co/1ZWw5fK/logo-crv4-footer.png" alt="" />
            </div>
            <ul className="flex flex-col text-white font-monsterrat gap-3">
                    <Link to={'./'}>Inicio</Link>
                    <Link to={'/nosotros'}>Sobre nosotros</Link>
                    <Link to={'/productos'}>Productos</Link>
                    <Link to={'/contacto'}>Contacto</Link>
            </ul>
        </div>
        <div className="flex flex-col items-center gap-10 ">
            <div className="flex flex-row gap-6">
                <img src="https://i.ibb.co/YcjTqBw/logoFace.png" alt="" />
                <img src="https://i.ibb.co/mzN3Rcn/logo-Instagram.png" alt="" />
            </div>
            <p className="font-thin text-base ">
                Capital - San Juan - Argentina
            </p>
            <p>
                Desarrollado por <Link to={''}>Valhalla web</Link>
            </p>
        </div>
        </div>
    );
}

export default Footer;