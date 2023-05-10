import { Link } from "react-router-dom";

function Footer() {
    return ( 
        <div className="flex flex-col md:flex-row md:justify-between py-12 md:px-10 gap-10 text-white bg-terciario">
        <div className="flex flex-col items-center md:flex-row gap-12">
            <div>
                <img src="https://i.ibb.co/0VHwxgR/logo-crv4-removebg-preview-5.png" alt="" />
            </div>
            <ul className="flex flex-col text-white font-monsterrat gap-3">
                    <Link to={'./'}>Inicio</Link>
                    <Link to={'/nosotros'}>Sobre nosotros</Link>
                    <Link to={'/productos'}>Productos</Link>
                    <Link to={'/contacto'}>Contacto</Link>
            </ul>
        </div>
        <div>
        <a href="http://qr.afip.gob.ar/?qr=WFNqQ8OVggESRy2O5S33tw,," target="_F960AFIPInfo"><img className="h-[200px]" src={"http://www.afip.gob.ar/images/f960/DATAWEB.jpg"} alt="" /></a>
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
                Desarrollado por <b className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">Valhalla web</b>
            </a>
        </div>
        </div>
    );
}

export default Footer;