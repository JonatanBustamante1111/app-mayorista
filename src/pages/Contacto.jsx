import ContactoForm from "../components/ContactoForm";


export default function Contacto() {
  return (
    <main className="grid md:grid-cols-2 md:mt-12 place-items-center">
      <ContactoForm />
      <section>
        <img
          src="../public/imageDesktopContacto.png"
          alt="Mina Facherarda"
          className='md:w-[450px] md:h-[400px]  lg:w-[550px] lg:h-[489px] xl:w-[771px] xl:h-[724px] transform scale-x-[-1] scale-y-[1] '
        />
      </section>
    </main>
  );
}
