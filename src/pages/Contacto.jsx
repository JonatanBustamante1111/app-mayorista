import ContactoForm from "../components/ContactoForm";


export default function Contacto() {
  return (
    <div className="flex flex-row justify-between">
        <ContactoForm/>
      <div>
        <img
          src="../public/imageDesktopContacto.png"
          alt="Mina Facherarda"
          className='w-full h-full transform scale-x-[-1] scale-y-[1] '
        />
      </div>
      </div>
  );
}
