import ContactoForm from "../../components/contacto/ContactoForm";


export default function Contacto() {
  return (
    <main className="grid md:grid-cols-2 md:mt-12 place-items-center">
      <ContactoForm />
      <section className="h-full">
        <img
          src="https://i.ibb.co/DWNPQLw/image-6-min.png"
          alt="Mina Facherarda"
          className='md:w-[450px] h-full xl:w-[771px]  transform scale-x-[-1] scale-y-[1] '
        />
      </section>
    </main>
  );
}
