import ContactoForm from "../components/ContactoForm";


export default function Contacto() {
  return (
    <main className="grid md:grid-cols-2 md:mt-12 place-items-center p-10">
      <ContactoForm />
      <section className="h-full">
        <img
          src="https://i.ibb.co/K55DMCR/image-Desktop-Contacto.png"
          alt="Mina Facherarda"
          className='md:w-[450px] h-full xl:w-[771px]  transform scale-x-[-1] scale-y-[1] '
        />
      </section>
    </main>
  );
}
