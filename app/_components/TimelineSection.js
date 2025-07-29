// ./_components/TimelineSection.jsx
"use client";

import { useState } from "react";
import {
  UserGroupIcon,
  CurrencyEuroIcon,
  DeviceTabletIcon,
} from "@heroicons/react/24/outline";

const TimelineSection = ({ slideOneData, slideTwoData, slideThreeData }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const timelineItems = [
    {
      step: 1,
      badge: slideOneData?.Tag || "Vrijblijvend advies",
      title: slideOneData?.Heading || "Gratis Online Advies",
      description:
        slideOneData?.Text || // Added optional chaining
        "Begin met een gratis online consultatie waarin we jouw financiële situatie en doelen bespreken. Onze experts luisteren naar jouw wensen en bieden persoonlijk advies zonder verplichtingen.",
      icon: <UserGroupIcon className="w-7 h-7 text-blue-600" />,
      badgeColor: "bg-sky-100 text-sky-800",
      iconBg: "bg-sky-100",
    },
    {
      step: 2,
      badge: slideTwoData?.Tag || "Altijd de laagste rente",
      title: slideTwoData?.Heading || "De Beste Hypotheekoplossing",
      description:
        slideTwoData?.Text || // Added optional chaining
        "We verschaffen inzicht in verschillende hypotheekopties en helpen je de beste keuze te maken. Als onafhankelijke adviseur kunnen wij altijd de laagste rente voor jouw situatie vinden.",
      icon: <CurrencyEuroIcon className="w-7 h-7 text-blue-600" />,
      badgeColor: "bg-blue-100 text-blue-800",
      iconBg: "bg-blue-100",
    },
    {
      step: 3,
      badge: slideThreeData?.Tag || "Volledig online advies",
      title: slideThreeData?.Heading || "Persoonlijke Begeleiding",
      description:
        slideThreeData?.Text || // Added optional chaining
        "Op basis van jouw informatie bieden we persoonlijk hypotheekadvies en begeleiden we je bij elke stap van het hypotheekproces. Alles volledig online en transparant, zonder verrassingen.",
      icon: <DeviceTabletIcon className="w-7 h-7 text-blue-600" />,
      badgeColor: "bg-indigo-100 text-indigo-800",
      iconBg: "bg-indigo-100",
    },
  ];

  return (
    <>
      <section className="py-10 xl:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left xl:text-center mb-10 xl:mb-16">
            <h2 className="text-2xl xl:text-4xl font-bold text-gray-900 mb-6">
              Waarom kiezen voor ons?
            </h2>
            <p className="text-md xl:text-lg text-gray-600 max-w-3xl mx-auto">
              Bij Verzilverjeoverwaarde zetten we ons in om jouw financiële
              doelen te realiseren met persoonlijk advies en de beste
              hypotheekoplossingen. Ontdek ons eenvoudige proces:
            </p>
          </div>

          <div className="relative mt-0 xl:mt-20">
            <div className="hidden md:block absolute h-full w-1 bg-gradient-to-b from-blue-500 to-blue-600 left-1/2 transform -translate-x-1/2 rounded-full"></div>
            <div className="space-y-10 xl:space-y-20">
              {timelineItems.map((item, index) => (
                <div
                  key={item.step}
                  className={`relative flex ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  } md:items-center`}
                  onMouseEnter={() => setHoveredItem(item.step)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 z-10">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`flex items-center justify-center w-14 h-14 rounded-full ${item.iconBg} border-4 border-blue-500 shadow-md`}
                    >
                      {item.icon} {/* Renders the static Heroicon */}
                    </div>
                  </div>
                  <div className="md:hidden absolute left-0 top-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <div
                    className={`${
                      index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                    } md:w-1/2 pl-16 md:pl-0 md:pr-0 relative`}
                  >
                    <div
                      className={`bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 
                      ${
                        hoveredItem === item.step
                          ? "transform -translate-y-1 shadow-md transition-all duration-300"
                          : "transition-all duration-300"
                      }`}
                    >
                      <h3 className="text-xl font-bold text-blue-800 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{item.description}</p>
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className=" bg-[#e3f2fd] w-full p-15 xl:p-30 relative overflow-hidden">
        <div className="bg-[#ebf6fe] h-50 w-60 xl:h-80 xl:w-90 rounded-full absolute -top-20 -left-30 xl:-top-30 xl:-left-40"></div>
        <div className="bg-[#ebf6fe] h-50 w-60 xl:h-80 xl:w-90 rounded-full absolute -bottom-20 -right-30 xl:-bottom-30 xl:-right-40"></div>
        <h2 className="text-2xl z-10 relative font-semibold text-center">
          Persoonlijk advies
        </h2>
        <p className="mt-3 text-text-50 z-10 relative text-md max-w-2xl text-center mx-auto">
          Onze hypotheekadviseurs helpen je bij het maken van een weloverwogen
          keuze die past bij jouw persoonlijke situatie en toekomstplannen. Maak
          direct een vrijblijvende afspraak
        </p>
        <div className="flex justify-center z-10 relative">
          <a
            href="#" // Link to a relevant section or page
            className="text-white mt-4 justify-center text-sm py-3 px-7 rounded-full bg-primary-700 transition-all duration-300 inline-flex gap-2 items-center hover:-translate-y-1 hover:shadow-md hover:shadow-gray-400"
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
    </>
  );
};

export default TimelineSection;
