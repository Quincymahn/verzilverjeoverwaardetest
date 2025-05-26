import Image from "next/image";

function CtaFooterSection() {
  return (
    <section className="mt-30 py-30 w-full bg-gray-50">
      <div className="flex mx-auto max-w-2xl gap-10">
        <Image
          src="/img/ctafooterimage.png"
          width={200}
          height={200}
          alt="Cta image"
          className="w-45"
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-bold text-2xl">Vrijblijvend hypotheek advies</h2>
          <p>
            Benieuwd naar uw mogelijkheden? Vul het formulier in om telefonisch
            in contact te komen en een afspraak in te plannen met één van onze
            hypotheek adviseurs.
          </p>
          <div className="flex">
            <a
              href="#"
              className="bg-primary-700  hover:bg-primary-700/70 transition-all duration-300 py-2 px-8 text-lg font-semibold rounded-full text-white"
            >
              Maak een afspraak
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaFooterSection;
