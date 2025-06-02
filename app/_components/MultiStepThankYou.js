import {
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckBadgeIcon,
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

  return (
    <div>
      <div className=" py-4">
        <h2 className="text-xl text-center text-primary-700 font-bold mb-3">
          Bedankt voor uw vertrouwen
        </h2>
        {/* <CheckCircleIcon className="w-16 h-16 text-green-600 mb-4" /> */}
        <p className=" text-gray-700 text-center mb-6">
          Uw hypotheekaanvraag is succesvol bij ons aangekomen. Wij gaan direct
          voor u aan de slag met het vinden van de meest geschikte hypotheek
          voor uw situatie.
        </p>
        <div className="xl:grid xl:grid-cols-2 gap-4 flex flex-col">
          <div className="rounded-xl border p-4 border-gray-100 bg-gray-50/50">
            <div className="flex gap-2 items-center mb-2">
              <ClockIcon className="w-4 h-4 text-gray-500 border border-gray-500 rounded-full" />
              <p className="text-primary-700 font-semibold text-lg">Tijdlijn</p>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              <div>
                <p className="-mb-1">Aanvraag ontvangen</p>
                <p className="text-gray-500 text-sm">{currentTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
              <div>
                <p className="-mb-1">Eerste contact</p>
                <p className="text-gray-500 text-sm">Binnen 24 uur</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
              <div>
                <p className="-mb-1">Adviesgesprek</p>
                <p className="text-gray-500 text-sm">Binnen 3 dagen</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-4 border-gray-100 bg-gray-50/50">
            <p className="flex items-center gap-2 text-primary-700 font-semibold mb-2">
              <CheckBadgeIcon className="w-4 h-4 text-gray-500 border border-gray-500 rounded-full" />
              Wat wij bieden
            </p>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <p className="text-gray-600">Aantal vergelijkingen</p>
              <p className=" font-semibold">20+ banken</p>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <p className="text-gray-600">Eerste contact</p>
              <p className=" font-semibold">Binnen 24 uur</p>
            </div>
            <div className="flex justify-between py-3">
              <p className="text-gray-600">Adviesgesprek</p>
              <p className=" font-semibold">Binnen 3 dagen</p>
            </div>
          </div>
        </div>
        {/* <button
            type="button"
            onClick={resetForm}
            className="bg-accent-50 text-lg font-semibold text-white py-1 px-6 rounded-full"
          >
            Nieuwe aanvraag
          </button> */}
      </div>

      <div className="text-center mt-10">
        <p className="text-xl font-semibold mb-2">Heb je direct een vraag?</p>
        <p className="mb-4 text-gray-500">
          We staan altijd voor je klaar. Neem gerust contact op!
        </p>
        <div className="flex gap-3 justify-center mb-6">
          <div className="bg-primary-700 inline-flex gap-2 items-center transition duration-300 py-2 px-4 rounded-full text-white font-semibold hover:-translate-y-1 hover:shadow-gray-400 hover:shadow-md">
            <PhoneArrowUpRightIcon className="w-4 h-4" />
            Bel Direct: 085 401 5280
          </div>
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
