import Image from "next/image";

function AboutUsSection() {
  return (
    <section className="py-12 mt-5 xl:mt-30 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/img/peyman-shojaei-VCQw618ZorY-unsplash.jpg"
                alt="Verzilverjeoverwaarde team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Verzilverjeoverwaarde
            </h2>

            <div className="space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                Verzilverjeoverwaarde.nl biedt u deskundig advies over het
                optimaal benutten van de overwaarde in uw woning. Binnen 24 uur
                ontvangt u vrijblijvend een persoonlijk advies toegespitst op uw
                specifieke situatie. Als onafhankelijke adviseurs staan wij
                volledig aan uw zijde, ongeacht uw wensen of doelen.
              </p>

              <p>
                Bij Verzilverjeoverwaarde.nl begrijpen we dat het verzilveren
                van uw overwaarde een belangrijke financiële beslissing is. Onze
                ervaren adviseurs nemen de tijd om uw complete financiële
                plaatje te analyseren en bieden oplossingen die perfect
                aansluiten bij zowel uw huidige behoeften als toekomstige
                plannen.
              </p>

              <p>
                Wij vergelijken niet alleen diverse aanbieders voor de
                gunstigste voorwaarden, maar kijken ook naar wat op lange
                termijn het beste bij uw situatie past. Transparantie is onze
                kernwaarde - u krijgt heldere informatie zonder verborgen kosten
                en duidelijke communicatie gedurende het hele adviestraject. Vul
                vandaag nog het aanvraagformulier in of neem direct contact met
                ons op voor een vrijblijvend gesprek!
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-6 sm:mt-8">
              <a
                href="#"
                className="inline-block w-full sm:w-auto bg-primary-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 min-h-[44px] text-sm sm:text-base hover:shadow-gray-400 hover:shadow-md hover:-translate-y-1"
              >
                Vul het formulier in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
