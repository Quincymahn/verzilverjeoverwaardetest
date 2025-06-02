import Image from "next/image";

function CtaFooterSection() {
  return (
    <section className="mt-15 md:mt-30 py-15 md:py-30 w-full bg-grey-50/20">
      <div className="mx-auto max-w-2xl px-4 md:px-0">
        {/* Mobile Layout - Stacked */}
        <div className="block md:hidden text-center space-y-6">
          <div className="flex justify-center">
            <Image
              src="/img/ctafooterimage.png"
              width={150}
              height={150}
              alt="Cta image"
              className="w-32 h-32 md:w-45"
            />
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-xl leading-tight">
              Vrijblijvend hypotheek advies
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              Benieuwd naar uw mogelijkheden? Vul het formulier in om
              telefonisch in contact te komen en een afspraak in te plannen met
              één van onze hypotheek adviseurs.
            </p>
            <div className="pt-2">
              <a
                href="#"
                className="inline-block bg-primary-700 transition-all duration-300 py-3 px-6 text-base font-semibold rounded-full text-white w-full max-w-xs"
              >
                Maak een afspraak
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden md:flex gap-10">
          <Image
            src="/img/ctafooterimage.png"
            width={200}
            height={200}
            alt="Cta image"
            className="w-45"
          />
          <div className="flex flex-col justify-between">
            <h2 className="font-bold xl:text-2xl">
              Vrijblijvend hypotheek advies
            </h2>
            <p>
              Benieuwd naar uw mogelijkheden? Vul het formulier in om
              telefonisch in contact te komen en een afspraak in te plannen met
              één van onze hypotheek adviseurs.
            </p>
            <div className="flex">
              <a
                href="#"
                className="bg-primary-700 transition-all duration-300 py-2 px-8 text-lg font-semibold rounded-full text-white hover:-translate-y-1 hover:shadow-md hover:shadow-gray-400"
              >
                Maak een afspraak
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaFooterSection;
