import { Link } from "react-router-dom";

function Footer() {
    return ( 
        <div className="flex flex-row justify-between py-12 px-20 text-white bg-terciario">
        <div className="flex flex-row gap-12">
            <div>
                <img src="./public/logo_crv4_footer.png" alt="" />
            </div>
            <ul className="flex flex-col text-white font-monsterrat justify-center gap-3">
                <Link to={'./'}>Inicio</Link>
                <Link to={'/nosotros'}>Sobre nosotros</Link>
                <Link to={'/productos'}>Productos</Link>
                <Link to={'/contacto'}>Contacto</Link>
            </ul>
        </div>
        <div className="flex flex-col items-end text-base font-light gap-10 ">
            <div className="flex flex-row gap-6">
                <img src="./public/logoFace.png" alt="" />
                <img src="./public/logoInstagram.png" alt="" />
            </div>
            <p>
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