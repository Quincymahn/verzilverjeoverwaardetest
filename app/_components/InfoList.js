import Image from "next/image";

function InfoList() {
  return (
    <div className="mt-[8rem] max-w-7xl mx-auto">
      <div>
        <h2 className="text-center font-semibold text-4xl mb-3 ">
          Kies jouw soort hypotheek!
        </h2>
        <div className="border-1 border-primary-700 w-[7rem] rounded-md mx-auto"></div>
        {/* <p className="mt-10 w-[40%] text-center mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book
        </p> */}
      </div>

      <div className="grid grid-cols-4 mt-[5rem]">
        {/* Left Image (25%) */}
        <div className="col-span-1 flex justify-start">
          <Image
            className="w-60"
            src="/img/infolistvectorimage.png"
            width={200}
            height={200}
            alt="hypotheek berekenen plaatje"
          />
        </div>

        {/* Middle Content (50%) */}
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
            woning. Kijk snel wat je extra kunt lenen door de opgebouwde waarde
            vrij te maken. Zo creëer je ruimte voor verbouwing of duurzame
            investeringen.
          </p>
        </div>

        {/* Right Image (25%) - Ensure it aligns to the right */}
        <div className="col-span-1 flex justify-end"></div>
      </div>

      <div className="grid grid-cols-4 mt-[5rem]">
        {/* Left Empty Space (25%) */}
        <div className="col-span-1"></div>

        {/* Middle Content (50%) */}
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

        {/* Right Image (25%) - Ensure it aligns to the right */}
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

      <div className="grid grid-cols-4 mt-[5rem]">
        {/* Left Empty Space (25%) */}
        <div className="col-span-1">
          <Image
            className="w-60"
            src="/img/infolistvectorimage3.png"
            width={200}
            height={200}
            alt="hypotheek berekenen plaatje"
          />
        </div>

        {/* Middle Content (50%) */}
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
            bijvoorbeeld verduurzaming of een nieuwe keuken. Verhoog of sluit je
            hypotheek over om tegen aantrekkelijke voorwaarden extra fonds te
            verkrijgen.
          </p>
        </div>

        {/* Right Image (25%) - Ensure it aligns to the right */}
        <div className="col-span-1 flex justify-end"></div>
      </div>
    </div>
  );
}

export default InfoList;
