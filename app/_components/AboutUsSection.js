import Image from "next/image";

function AboutUsSection() {
  return (
    <div className="bg-grey-50/20 mt-20">
      <div className="grid grid-cols-2 max-w-7xl gap-5 mx-auto pb-50 px-30 pt-30">
        <div className="flex flex-col justify-between">
          <h2 className="text-primary-700 font-bold text-3xl">
            Verzilverjeoverwaarde
          </h2>
          <div></div>
          <p className=" text-text-50">
            Verzilverjeoverwaarde.nl biedt u deskundig advies over het optimaal
            benutten van de overwaarde in uw woning. Binnen 24 uur ontvangt u
            vrijblijvend een persoonlijk advies toegespitst op uw specifieke
            situatie. Als onafhankelijke adviseurs staan wij volledig aan uw
            zijde, ongeacht uw wensen of doelen.
          </p>

          <p className=" text-text-50">
            Bij Verzilverjeoverwaarde.nl begrijpen we dat het verzilveren van uw
            overwaarde een belangrijke financiële beslissing is. Onze ervaren
            adviseurs nemen de tijd om uw complete financiële plaatje te
            analyseren en bieden oplossingen die perfect aansluiten bij zowel uw
            huidige behoeften als toekomstige plannen.
          </p>
          <p className="text-text-50 ">
            Wij vergelijken niet alleen diverse aanbieders voor de gunstigste
            voorwaarden, maar kijken ook naar wat op lange termijn het beste bij
            uw situatie past. Transparantie is onze kernwaarde - u krijgt
            heldere informatie zonder verborgen kosten en duidelijke
            communicatie gedurende het hele adviestraject. Vul vandaag nog het
            aanvraagformulier in of neem direct contact met ons op voor een
            vrijblijvend gesprek!
          </p>
          <div className="inline">
            <a
              href="#"
              className="bg-primary-700 rounded-full py-3 px-6 text-white hover:bg-primary-700/70 transition-all duration-300"
            >
              Vul het formulier in
            </a>
          </div>
        </div>
        <Image
          src="/img/peyman-shojaei-VCQw618ZorY-unsplash.jpg"
          width={500}
          height={500}
          alt="Foto van koppel"
          className="w-full h-[35rem] rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

export default AboutUsSection;
