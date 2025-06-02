import Image from "next/image";

function InfoList() {
  const infoItems = [
    {
      id: 1,
      title: "Maximale hypotheek berekenen",
      description:
        "Bereken jouw maximale hypotheek inclusief de overwaarde van je woning. Kijk snel wat je extra kunt lenen door de opgebouwde waarde vrij te maken. Zo creëer je ruimte voor verbouwing of duurzame investeringen.",
      image: "/img/infolistvectorimage.png",
      imagePosition: "left",
    },
    {
      id: 2,
      title: "Bouwdepot",
      description:
        "Met een bouwdepot reserveer je binnen je hypotheek een flexibel potje voor elke verbouwing of nieuwbouwfase. Declareer alleen de werkelijk gemaakte kosten en houd je cashflow strak in de hand.",
      image: "/img/infolistvectorimage2.png",
      imagePosition: "right",
    },
    {
      id: 3,
      title: "Overwaarde verzilveren",
      description:
        "Zet de overwaarde van je huis om in beschikbaar kapitaal voor bijvoorbeeld verduurzaming of een nieuwe keuken. Verhoog of sluit je hypotheek over om tegen aantrekkelijke voorwaarden extra fonds te verkrijgen.",
      image: "/img/infolistvectorimage3.png",
      imagePosition: "left",
    },
  ];

  return (
    <div className="mt-8 md:mt-15 xl:mt-[8rem] max-w-7xl mx-auto px-4 md:px-0">
      {/* Header */}
      <div>
        <h2 className="text-center font-semibold text-xl md:text-2xl xl:text-4xl mb-3">
          Kies jouw soort hypotheek!
        </h2>
        <div className="border-1 border-primary-700 w-[7rem] rounded-md mx-auto"></div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden mt-8 space-y-6">
        {infoItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Image */}
            <div className="flex justify-center p-4 bg-gray-50">
              <Image
                className="w-32 h-32 object-contain"
                src={item.image}
                width={128}
                height={128}
                alt={`${item.title} illustratie`}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center rounded-full w-8 h-8 bg-primary-700 flex-shrink-0">
                  <p className="text-white font-semibold text-sm">{item.id}</p>
                </div>
                <h3 className="text-primary-700 font-semibold text-base leading-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-text-200 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Item 1 - Image Left */}
        <div className="grid grid-cols-4 mt-10 xl:mt-[5rem]">
          <div className="col-span-1 flex justify-start">
            <Image
              className="w-60"
              src="/img/infolistvectorimage.png"
              width={200}
              height={200}
              alt="hypotheek berekenen plaatje"
            />
          </div>
          <div className="p-2 col-span-2 border border-grey-50 rounded-lg flex flex-col h-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-grey-50">
                <p className="text-primary-700 font-semibold text-lg">1</p>
              </div>
              <h2 className="text-primary-700 font-semibold text-lg">
                Maximale hypotheek berekenen
              </h2>
            </div>
            <p className="mt-auto text-lg text-text-200">
              Bereken jouw maximale hypotheek inclusief de overwaarde van je
              woning. Kijk snel wat je extra kunt lenen door de opgebouwde
              waarde vrij te maken. Zo creëer je ruimte voor verbouwing of
              duurzame investeringen.
            </p>
          </div>
          <div className="col-span-1 flex justify-end"></div>
        </div>

        {/* Item 2 - Image Right */}
        <div className="grid grid-cols-4 mt-[5rem]">
          <div className="col-span-1"></div>
          <div className="p-2 col-span-2 border border-grey-50 rounded-lg flex flex-col h-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-grey-50">
                <p className="text-primary-700 font-semibold text-lg">2</p>
              </div>
              <h2 className="text-primary-700 font-semibold text-lg">
                Bouwdepot
              </h2>
            </div>
            <p className="mt-auto text-lg text-text-200">
              Met een bouwdepot reserveer je binnen je hypotheek een flexibel
              potje voor elke verbouwing of nieuwbouwfase. Declareer alleen de
              werkelijk gemaakte kosten en houd je cashflow strak in de hand.
            </p>
          </div>
          <div className="col-span-1 flex justify-start ml-20">
            <Image
              className="w-35"
              src="/img/infolistvectorimage2.png"
              width={200}
              height={200}
              alt="hypotheek berekenen plaatje"
            />
          </div>
        </div>

        {/* Item 3 - Image Left */}
        <div className="grid grid-cols-4 mt-[5rem]">
          <div className="col-span-1">
            <Image
              className="w-60"
              src="/img/infolistvectorimage3.png"
              width={200}
              height={200}
              alt="hypotheek berekenen plaatje"
            />
          </div>
          <div className="p-2 col-span-2 border border-grey-50 rounded-lg flex flex-col h-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-grey-50">
                <p className="text-primary-700 font-semibold text-lg">3</p>
              </div>
              <h2 className="text-primary-700 font-semibold text-lg">
                Overwaarde verzilveren
              </h2>
            </div>
            <p className="mt-auto text-lg text-text-200">
              Zet de overwaarde van je huis om in beschikbaar kapitaal voor
              bijvoorbeeld verduurzaming of een nieuwe keuken. Verhoog of sluit
              je hypotheek over om tegen aantrekkelijke voorwaarden extra fonds
              te verkrijgen.
            </p>
          </div>
          <div className="col-span-1 flex justify-end"></div>
        </div>
      </div>
    </div>
  );
}

export default InfoList;
