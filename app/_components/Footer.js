"use client";

import { useState } from "react";
import {
  ArrowLongRightIcon,
  CheckIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Modal from "./Modal";

// Modal content components
const AboutUsContent = ({ onClose }) => (
  <>
    <div className="space-y-4 mt-3 p-6">
      <h2 className="font-bold text-[#194d90] text-2xl">Wie zijn wij?</h2>
      <p className="text-gray-700 mb-10">
        Wij zijn een gepassioneerd team van vastgoedexperts die u helpen bij het
        vinden van uw droomhuis. Met jaren ervaring in de markt bieden wij
        persoonlijke service en professioneel advies.
      </p>
      <div className="grid grid-cols-2 gap-10 mb-10">
        <div>
          <h2 className="text-[#194d90] font-semibold text-xl mb-4">
            Onze expertise
          </h2>
          <p className="text-gray-600 mb-2">
            Bij Verzilverje Overwaarde combineren we diepgaande marktkennis met
            een persoonlijke aanpak om u te helpen bij iedere stap van uw
            vastgoedtraject.
          </p>
          <p className="text-gray-600">
            Of u nu op zoek bent naar uw eerste woning, wilt investeren in
            vastgoed, of advies nodig heeft over het verzilveren van uw
            overwaarde - wij staan voor u klaar.
          </p>
        </div>
        <Image
          width={200}
          height={200}
          alt="Over ons foto"
          src="/img/kateryna-hliznitsova-vwaW6X3MHKA-unsplash.jpg"
          className="w-[90%] rounded-xl"
        />
      </div>
      <div className="border-l-5 p-4 px-6 border-[#194d90] bg-blue-50/50 rounded-lg">
        <h2 className="mb-3 text-lg font-semibold text-[#194d90]">
          Onze kernwaarden
        </h2>
        <ul className="mb-5">
          <li className="list-disc ml-4 mb-1">
            <span className="text-black font-semibold">Integriteit </span>
            <span className="text-gray-600">
              - Eerlijkheid en transparantie in al onze transacties
            </span>
          </li>
          <li className="list-disc ml-4 mb-1">
            <span className="text-black font-semibold">Deskundigheid </span>
            <span className="text-gray-600">
              - Diepgaande kennis van de lokale vastgoedmarkt
            </span>
          </li>
          <li className="list-disc ml-4 mb-1">
            <span className="text-black font-semibold">
              Persoonlijke benadering{" "}
            </span>
            <span className="text-gray-600">
              - Elke klant krijgt aandacht op maat
            </span>
          </li>
          <li className="list-disc ml-4">
            <span className="text-black font-semibold">Innovatie</span>
            <span className="text-gray-600">
              - Moderne technieken voor de beste resultaten
            </span>
          </li>
        </ul>
        <h3 className="mb-3 text-lg font-semibold text-[#194d90]">
          Waarom voor ons kiezen?
        </h3>
        <ul>
          <li className="list-disc ml-4 mb-1">
            <span className="text-black font-semibold">
              Jarenlange ervaring{" "}
            </span>
            <span className="text-gray-600">
              in de Nederlandse vastgoedmarkt
            </span>
          </li>
          <li className="list-disc ml-4 mb-1">
            <span className="text-black font-semibold">
              Persoonlijke begeleiding{" "}
            </span>
            <span className="text-gray-600">
              afgestemd op uw specifieke wensen
            </span>
          </li>
          <li className="list-disc ml-4 mb-1">
            <span className="text-black font-semibold">
              Transparant proces{" "}
            </span>
            <span className="text-gray-600">met duidelijk communicatie</span>
          </li>
          <li className="list-disc ml-4">
            <span className="text-black font-semibold">
              Innovatieve oplossingen{" "}
            </span>
            <span className="text-gray-600">
              voor moderne vastgoeduitdagingen
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div className="p-10 rounded-bl-lg rounded-br-lg text-center bg-blue-50/50 mt-10">
      <h4 className="font-semibold mb-1">Klaar om uw droomhuis te vinden?</h4>
      <p className="mb-5">
        Neem vandaag nog contact met ons op voor een vrijblijvend gesprek
      </p>
      <a
        href="#"
        onClick={(e) => {
          onClose();
        }}
        className="px-5 py-2.5 text-white bg-gradient-to-r from-primary-700 to-[#194d90] rounded-full font-semibold"
      >
        Vul het formulier in
      </a>
    </div>
  </>
);

const ReviewsContent = () => (
  <div className="space-y-6 p-6">
    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <div className="mr-3">
          <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-blue-800 font-bold">JD</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Jan de Vries</h4>
          <div className="flex text-yellow-400">{"★".repeat(5)}</div>
        </div>
      </div>
      <p className="italic text-gray-700">
        Uitstekende service! De adviseur begreep direct wat we zochten en vond
        binnen een week de perfecte woning voor ons gezin.
      </p>
    </div>
    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <div className="mr-3">
          <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
            <span className="text-blue-800 font-bold">MB</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Mieke Bakker</h4>
          <div className="flex text-yellow-400">{"★".repeat(4)}</div>
        </div>
      </div>
      <p className="italic text-gray-700">
        Zeer professioneel team dat ons hielp bij de verkoop van ons huis. De
        fotografie en marketing waren top!
      </p>
    </div>
  </div>
);

const CookieStatementContent = () => (
  <div className="space-y-4 p-6">
    <p className="text-gray-700">
      Onze website maakt gebruik van cookies om uw ervaring te verbeteren en
      gepersonaliseerde inhoud te bieden.
    </p>
    <h4 className="font-semibold text-lg">Welke cookies gebruiken wij?</h4>
    <ul className="list-disc pl-5 text-gray-700 space-y-2">
      <li>
        Noodzakelijke cookies: Essentieel voor de basisfunctionaliteit van de
        website.
      </li>
      <li>
        Analytische cookies: Helpen ons inzicht te krijgen in hoe bezoekers onze
        website gebruiken.
      </li>
      <li>
        Marketing cookies: Worden gebruikt om bezoekers te volgen op
        verschillende websites.
      </li>
    </ul>
    <p className="text-gray-700">
      U kunt uw cookie-voorkeuren altijd aanpassen via de instellingen van uw
      browser.
    </p>
  </div>
);

const PrivacyStatementContent = () => (
  <div className="space-y-4 p-6">
    <p className="text-gray-700">
      Wij nemen uw privacy serieus en verzamelen alleen gegevens die nodig zijn
      om onze diensten te verlenen.
    </p>
    <h4 className="font-semibold text-lg">Welke gegevens verzamelen wij?</h4>
    <ul className="list-disc pl-5 text-gray-700 space-y-2">
      <li>Contactgegevens: Naam, e-mail, telefoonnummer</li>
      <li>Woonvoorkeuren: Type woning, locatie, budget</li>
      <li>Websitegebruik: Paginabezoeken, zoekgedrag</li>
    </ul>
    <h4 className="font-semibold text-lg">Hoe gebruiken wij uw gegevens?</h4>
    <p className="text-gray-700">
      Uw gegevens worden gebruikt om onze diensten te verlenen, te voldoen aan
      wettelijke verplichtingen en om onze diensten te verbeteren.
    </p>
  </div>
);

const TermsContent = () => (
  <div className="space-y-4 p-6">
    <p className="text-gray-700">
      Door gebruik te maken van onze diensten gaat u akkoord met deze
      gebruikersvoorwaarden.
    </p>
    <h4 className="font-semibold text-lg">Aansprakelijkheid</h4>
    <p className="text-gray-700">
      Wij streven ernaar om nauwkeurige informatie te verstrekken, maar kunnen
      niet aansprakelijk worden gesteld voor eventuele fouten of omissies.
    </p>
    <h4 className="font-semibold text-lg">Intellectueel eigendom</h4>
    <p className="text-gray-700">
      Alle inhoud op onze website is eigendom van ons bedrijf en mag niet worden
      gekopieerd of gebruikt zonder onze toestemming.
    </p>
    <h4 className="font-semibold text-lg">Toepasselijk recht</h4>
    <p className="text-gray-700">
      Deze voorwaarden zijn onderworpen aan het Nederlands recht en eventuele
      geschillen zullen worden voorgelegd aan de bevoegde rechtbank.
    </p>
  </div>
);

// Main footer component
function Footer() {
  // State for modal visibility
  const [openModal, setOpenModal] = useState(null);

  // Function to handle opening a specific modal
  const handleOpenModal = (modalKey) => {
    setOpenModal(modalKey);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(null);
  };

  // Modal configurations - now passing the handleCloseModal function to AboutUsContent
  const modalContents = {
    aboutUs: {
      title: "Over ons",
      content: <AboutUsContent onClose={handleCloseModal} />,
      size: "lg",
    },
    reviews: {
      title: "Reviews",
      content: <ReviewsContent />,
      size: "lg",
    },
    cookieStatement: {
      title: "Cookie Statement",
      content: <CookieStatementContent />,
      size: "md",
    },
    privacyStatement: {
      title: "Privacy Statement",
      content: <PrivacyStatementContent />,
      size: "md",
    },
    terms: {
      title: "Gebruikersvoorwaarden",
      content: <TermsContent />,
      size: "lg",
    },
  };

  return (
    <footer className="custom-gradient w-full pt-[1rem] px-[6rem]">
      <div className="grid grid-cols-2 items-center">
        <div>
          <div className="grid grid-cols-2 gap-20 min-h-full">
            <div className="mt-17">
              <Image
                src="/img/logo-blue.png"
                width={200}
                height={200}
                alt="Website logo"
                className="w-[17rem] mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
              />
              <div className="mb-4 font-semibold">
                <p className="text-gray-200 text-lg">
                  Deskundig hypotheekadvies voor elke situatie
                </p>
              </div>
              <div className="flex mb-7 justify-between">
                <div className="flex items-center gap-2 bg-white/5 rounded-full py-1.5 px-3">
                  <CheckIcon className="w-4 h-4 text-inherit bg-white p-1 rounded-full" />
                  <p className="text-gray-200">AFM Geregistreerd</p>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-full py-1.5 px-3">
                  <CheckIcon className="w-4 h-4 text-inherit bg-white p-1 rounded-full" />
                  <p className="text-gray-200">SEH Erkend Adviseur</p>
                </div>
              </div>
              <div className="flex gap-3 items-center mb-5 border border-white/15 bg-white/5 p-5 rounded-xl">
                <PhoneIcon className="w-9 h-9 p-2 rounded-xl text-white bg-primary-700/60" />
                <div>
                  <p className="text-white font-semibold">Bel direct</p>
                  <p className="text-white font-semibold text-lg">
                    085 401 5280
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-17">
              <h2 className="text-white text-xl mb-3">Meer informatie</h2>
              <ul className="space-y-2 w-[60%]">
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("aboutUs")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Over ons</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("reviews")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Reviews</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("cookieStatement")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Cookie statement</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("privacyStatement")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Privacy statement</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
                <li className="flex pb-1 pt-4 justify-between items-center w-full group border-b border-blue-300/20">
                  <button
                    onClick={() => handleOpenModal("terms")}
                    className="text-lg text-white hover:text-blue-200 text-left flex-grow flex items-center cursor-pointer"
                  >
                    <span>Gebruikers voorwaarden</span>
                  </button>
                  <svg
                    className="w-4 h-4 fill-white group-hover:translate-x-2 transition-all duration-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <Image
                className="w-full"
                src="/img/footerimage.png"
                width={500}
                height={500}
                alt="footer foto"
              />
            </div>
            <div className="col-span-1 my-auto">
              <h2 className="text-white text-2xl mb-5">
                Kosteloos adviesgesprek
              </h2>
              <p className="text-gray-300 mb-5">
                Krijg helder advies over uw hypotheek mogelijkheden. Plan
                vandaag nog uw kosteloos gesprek.
              </p>
              <a
                href="#"
                className="bg-accent-50 hover:bg-accent-50/70 transition-all duration-300 text-white py-2.5 px-4 text-sm rounded-full"
              >
                Vul het formulier in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Render modal based on which one is open */}
      {openModal && (
        <Modal
          isOpen={!!openModal}
          onClose={handleCloseModal}
          title={modalContents[openModal].title}
          size={modalContents[openModal].size}
        >
          {modalContents[openModal].content}
        </Modal>
      )}
    </footer>
  );
}

export default Footer;
