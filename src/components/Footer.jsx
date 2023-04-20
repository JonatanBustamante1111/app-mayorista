import { Link } from "react-router-dom";

function Footer() {
    return ( 
        <div className="flex flex-col md:flex-row md:justify-between py-12 md:px-10 gap-10 text-white bg-terciario">
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
                <a href="https://www.facebook.com/crv4.Bijou" target="_blank"><img src="https://i.ibb.co/YcjTqBw/logoFace.png" alt="" /></a>
                <a href="https://instagram.com/crv4bijou?igshid=MGNiNDI5ZTU=" target="_blank"><img src="https://i.ibb.co/mzN3Rcn/logo-Instagram.png" alt="" /></a>
            </div>
            <p className="font-thin text-base ">
                Capital - San Juan - Argentina
            </p>
            <a  href="http://valhallaweb.tech" target="_blank">
                Desarrollado por Valhalla web
            </a>
        </div>
        </div>
    );
}

export default Footer;