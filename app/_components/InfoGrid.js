import {
  ChevronRightIcon,
  ComputerDesktopIcon,
  PercentBadgeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

function InfoGrid() {
  return (
    <>
      <div className="mx-auto mt-20 mb-10">
        <h2 className="text-center text-4xl font-semibold mb-6">
          Waarom kiezen voor ons?
        </h2>
        <p className="text-center text-md w-[50%] mx-auto text-text-50">
          Bij Verzilverjeoverwaarde zetten we ons in om jouw financiële doelen
          te realiseren met persoonlijk advies en de beste hypotheekoplossingen.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-7">
        <div className="shadow-md p-5 rounded-lg">
          <ShieldCheckIcon className="h-[3.5rem] w-[3.5rem] rounded-full p-3 bg-[#e3f2fd] text-[#2563eb]" />
          <h3 className="font-semibold mt-6 text-lg">Vrijblijvend advies</h3>
          <p className="mt-3 mb-6 text-text-50 text-sm">
            Begin met een gratis online consultatie waarin we jouw financiële
            situatie en doelen bespreken.
          </p>
          <div className="flex justify-between flex-row items-center">
            <p className="text-xs rounded-full py-2 px-3 bg-[#f5f7fa] inline">
              Klantgericht
            </p>
            <a href="#" className="flex items-center gap-1">
              <span className="text-primary-700 text-xs font-semibold">
                Vul het fomulier in
              </span>
              <ChevronRightIcon className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="shadow-md p-5 rounded-lg">
          <PercentBadgeIcon className="h-[3.5rem] w-[3.5rem] rounded-full p-3 bg-[#e3f2fd] text-[#2563eb]" />
          <h3 className="font-semibold mt-6 text-lg">
            Altijd de laagste rente
          </h3>
          <p className="mt-3 mb-6 text-text-50 text-sm">
            We verschaffen inzicht in verschillende hypotheekopties en helpen je
            de beste keuze te maken.
          </p>
          <div className="flex justify-between flex-row items-center">
            <p className="text-xs rounded-full py-2 px-3 bg-[#f5f7fa] inline">
              Onafhankelijk
            </p>
            <a href="#" className="flex items-center gap-1">
              <span className="text-primary-700 text-xs font-semibold">
                Vul het fomulier in
              </span>
              <ChevronRightIcon className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="shadow-md p-5 rounded-lg">
          <ComputerDesktopIcon className="h-[3.5rem] w-[3.5rem] rounded-full p-3 bg-[#e3f2fd] text-[#2563eb]" />
          <h3 className="font-semibold mt-6 text-lg">Volledig online advies</h3>
          <p className="mt-3 mb-6 text-text-50 text-sm">
            Op basis van jouw informatie bieden we persoonlijk hypotheekadvies
            en begeleiden we je bij elke stap van het hypotheekproces.
          </p>
          <div className="flex justify-between flex-row items-center">
            <p className="text-xs rounded-full py-2 px-3 bg-[#f5f7fa] inline">
              Transparant
            </p>
            <a href="#" className="flex items-center gap-1">
              <span className="text-primary-700 text-xs font-semibold">
                Vul het fomulier in
              </span>
              <ChevronRightIcon className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-20 bg-[#e3f2fd] w-full p-30 relative overflow-hidden">
        <div className="bg-[#ebf6fe] h-80 w-90 rounded-full absolute -top-30 -left-40"></div>
        <div className="bg-[#ebf6fe] h-80 w-90 rounded-full absolute -bottom-30 -right-40"></div>
        <h2 className="text-2xl font-semibold text-center">
          Persoonlijk advies
        </h2>
        <p className="mt-3 text-text-50 text-md max-w-2xl text-center mx-auto">
          Onze hypotheekadviseurs helpen je bij het maken van een weloverwogen
          keuze die past bij jouw persoonlijke situatie en toekomstplannen. Maak
          direct een vrijblijvende afspraak
        </p>
        <div className="flex justify-center">
          <a
            href="#"
            className="text-white mt-4 justify-center text-sm py-3 px-7 rounded-full bg-primary-700  hover:bg-primary-700/70 transition-all duration-300 inline-flex gap-2 items-center"
          >
            Afspraak maken
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M2.25 4.5A.75.75 0 0 1 3 3.75h14.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm14.47 3.97a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 1 1-1.06 1.06L18 10.81V21a.75.75 0 0 1-1.5 0V10.81l-2.47 2.47a.75.75 0 1 1-1.06-1.06l3.75-3.75ZM2.25 9A.75.75 0 0 1 3 8.25h9.75a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 9Zm0 4.5a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
      {/* <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
        <div className="bg-grey-100 pt-[6rem] pb-10 px-10 text-text-100 border-3 border-primary-700 relative text-center">
          <div className="rounded-full border-3 border-primary-700 w-[9rem] h-[9rem] absolute left-1/2 -translate-x-1/2 top-[-5rem]">
            <Image
              className="w-full rounded-full"
              src="/img/portrait-man-cartoon-free-vector.jpg"
              width={100}
              height={100}
              alt="info image"
            />
          </div>
          <h2 className="text-2xl mb-8">
            Geheel kosteloos en vrijblijvend advies
          </h2>
          <p className="text-md">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type
          </p>
        </div>

        <div className="bg-grey-100 pt-[6rem] pb-10 px-10 text-text-100 border-3 border-accent-50 relative text-center">
          <div className="rounded-full border-3 border-accent-50 w-[9rem] h-[9rem] absolute left-1/2 -translate-x-1/2 top-[-5rem]">
            <Image
              className="w-full rounded-full"
              src="/img/portrait-man-cartoon-free-vector.jpg"
              width={100}
              height={100}
              alt="info image"
            />
          </div>
          <h2 className="text-2xl mb-8">Onafhankelijke hypotheekadviseurs</h2>
          <p className="text-md">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type
          </p>
        </div>

        <div className="bg-grey-100 pt-[6rem] pb-10 px-10 text-text-100 border-3 border-orange-400 relative text-center">
          <div className="rounded-full border-3 border-orange-400 w-[9rem] h-[9rem] absolute left-1/2 -translate-x-1/2 top-[-5rem]">
            <Image
              className="w-full rounded-full"
              src="/img/portrait-man-cartoon-free-vector.jpg"
              width={100}
              height={100}
              alt="info image"
            />
          </div>
          <h2 className="text-2xl mb-8">Kies uw bestedingsdoel</h2>
          <p className="text-md">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type
          </p>
        </div>

        <div className="col-span-3 flex items-center justify-between w-full py-6">
          <div className="w-full border-b border-gray-300"></div>
          <button className="rounded-2xl border border-primary-700 text-primary-700 px-6 w-[50%] py-2 mx-4">
            Bekijk de mogelijkheden
          </button>
          <div className="w-full border-b border-gray-300"></div>
        </div>
      </div> */}
    </>
  );
}

export default InfoGrid;
