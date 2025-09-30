import {
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function MultiStepThankYou({ resetForm }) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setCurrentTime(`Vandaag, ${timeString}`);
  }, []);

  const phoneNumber = "0854015280";
  const emailAddress = "info@verzilverjeoverwaarde.nl";

  return (
    <div>
      <div className="py-4">
        <h2 className="mb-3 text-xl font-bold text-center text-primary-700">
          Bedankt voor uw vertrouwen
        </h2>
        <p className="mb-6 text-center text-gray-700">
          Uw hypotheekaanvraag is succesvol bij ons aangekomen. Wij gaan direct
          voor u aan de slag met het vinden van de meest geschikte hypotheek
          voor uw situatie.
        </p>
        <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2">
          <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
            <div className="flex items-center gap-2 mb-2">
              <ClockIcon className="w-4 h-4 text-gray-500 border border-gray-500 rounded-full" />
              <p className="text-lg font-semibold text-primary-700">Tijdlijn</p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              <div>
                <p className="-mb-1">Aanvraag ontvangen</p>
                <p className="text-sm text-gray-500">{currentTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
              <div>
                <p className="-mb-1">Eerste contact</p>
                <p className="text-sm text-gray-500">Binnen 24 uur</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
              <div>
                <p className="-mb-1">Adviesgesprek</p>
                <p className="text-sm text-gray-500">Binnen 3 dagen</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
            <p className="flex items-center gap-2 mb-2 font-semibold text-primary-700">
              <CheckBadgeIcon className="w-4 h-4 text-gray-500 border border-gray-500 rounded-full" />
              Wat wij bieden
            </p>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <p className="text-gray-600">Aantal vergelijkingen</p>
              <p className="font-semibold">20+ banken</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <p className="text-gray-600">Eerste contact</p>
              <p className="font-semibold">Binnen 24 uur</p>
            </div>
            <div className="flex justify-between py-3">
              <p className="text-gray-600">Adviesgesprek</p>
              <p className="font-semibold">Binnen 3 dagen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Insurance Section */}
      <div className="relative mt-8 overflow-hidden shadow-2xl rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 -mt-32 -mr-32 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 -mb-24 -ml-24 rounded-full bg-indigo-500/20 blur-2xl"></div>

        <div className="relative p-8 md:p-10">
          <div className="flex flex-col items-center gap-6 md:items-center md:justify-between">
            {/* Left content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="mb-3 text-3xl font-bold text-white md:text-4xl">
                Complete bescherming
              </h3>
              <p className="mb-4 text-lg text-blue-100">
                Hypotheek geregeld? Check ook direct uw verzekeringen!
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-6 md:justify-start">
                <div className="flex items-center gap-2 text-white">
                  <ShieldCheckIcon className="w-5 h-5 text-green-300" />
                  <span className="text-sm">Woonhuisverzekering</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <ShieldCheckIcon className="w-5 h-5 text-green-300" />
                  <span className="text-sm">Inboedelverzekering</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <ShieldCheckIcon className="w-5 h-5 text-green-300" />
                  <span className="text-sm">Aansprakelijkheid</span>
                </div>
              </div>

              <p className="text-sm text-blue-200">
                <span className="font-semibold text-white">Bespaar geld:</span>{" "}
                Vergelijk en vind de beste dekking tegen de laagste premie
              </p>
            </div>

            {/* Right CTA */}
            <div className="flex-shrink-0">
              <a
                href="https://checkmijnverzekering.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white shadow-xl group rounded-2xl hover:shadow-2xl hover:scale-105"
              >
                <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-blue-600 uppercase">
                    Gratis checken
                  </div>
                  <div className="text-base leading-tight">
                    Mijn verzekeringen
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <p className="mt-3 text-xs text-center text-blue-200">
                ✓ 100% vrijblijvend • ✓ Geheel online
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="mb-2 text-xl font-semibold">Heb je direct een vraag?</p>
        <p className="mb-4 text-gray-500">
          We staan altijd voor je klaar. Neem gerust contact op!
        </p>
        <div className="flex flex-col justify-center gap-3 mb-6 lg:flex-row">
          <a
            href={`tel:${phoneNumber.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white transition duration-300 rounded-full cursor-pointer bg-primary-700 hover:-translate-y-1 hover:shadow-gray-400 hover:shadow-md"
          >
            <PhoneArrowUpRightIcon className="w-4 h-4" />
            Bel Direct: {phoneNumber}
          </a>
          <a
            href={`mailto:${emailAddress}`}
            className="inline-flex items-center gap-2 px-4 py-2 font-semibold transition duration-300 border rounded-full cursor-pointer border-primary-700 text-primary-700 hover:-translate-y-1 hover:shadow-gray-400 hover:shadow-md"
          >
            <EnvelopeIcon className="w-5 h-5" />
            {emailAddress}
          </a>
        </div>
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-black">Geen verplichting: </span>
          Ons eerste gesprek is altijd vrijblijvend. We adviseren pas verder
          nadat je expliciet akkoord bent gegaan.
        </p>
      </div>
    </div>
  );
}

export default MultiStepThankYou;
