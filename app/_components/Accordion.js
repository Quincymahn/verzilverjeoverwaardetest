"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

function TabbedInfoList() {
  const [activeTab, setActiveTab] = useState(0);
  const [hoverTab, setHoverTab] = useState(null);
  const tabsContainerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const tabs = [
    {
      title: "Maximale hypotheek",
      image: "/img/transparent_image_11.avif",
      heading: "Ontdek je Lening met Overwaarde",
      content:
        "Bereken jouw maximale hypotheek inclusief de overwaarde van je woning. Kijk snel wat je extra kunt lenen door de opgebouwde waarde vrij te maken. Zo creëer je ruimte voor verbouwing of duurzame investeringen.",
      buttonText: "Kom met ons in contact",
    },
    {
      title: "Bouwdepot",
      image: "/img/transparent_image_11.avif",
      heading: "Bouwdepot Boost",
      content:
        "Met een bouwdepot reserveer je binnen je hypotheek een flexibel potje voor elke verbouwing of nieuwbouwfase. Declareer alleen de werkelijk gemaakte kosten en houd je cashflow strak in de hand.",
      buttonText: "Kom met ons in contact",
    },
    {
      title: "Overwaarde verzilveren",
      image: "/img/transparent_image_11.avif",
      heading: "Overwaarde verzilveren",
      content:
        "Zet de overwaarde van je huis om in beschikbaar kapitaal voor bijvoorbeeld verduurzaming of een nieuwe keuken. Verhoog of sluit je hypotheek over om tegen aantrekkelijke voorwaarden extra fonds te verkrijgen.",
      buttonText: "Kom met ons in contact",
    },
  ];

  // Update indicator position when active tab or hover tab changes
  useEffect(() => {
    if (!tabsContainerRef.current) return;

    const tabElements = Array.from(tabsContainerRef.current.children);
    const currentTabIndex = hoverTab !== null ? hoverTab : activeTab;

    if (tabElements[currentTabIndex]) {
      const tabElement = tabElements[currentTabIndex];
      const tabRect = tabElement.getBoundingClientRect();
      const containerRect = tabsContainerRef.current.getBoundingClientRect();

      setIndicatorStyle({
        width: tabElement.offsetWidth + "px",
        transform: `translateX(${tabElement.offsetLeft}px)`,
        transition: "transform 0.3s ease, width 0.3s ease",
      });
    }
  }, [activeTab, hoverTab]);

  return (
    <div className="max-w-5xl mt-16 mx-auto pt-30">
      <h2 className="text-center text-3xl font-semibold mb-20">
        Kies jouw soort hypotheek
      </h2>
      <div
        className="grid grid-cols-3 w-4/5 mx-auto relative"
        ref={tabsContainerRef}
      >
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`p-2 text-center cursor-pointer rounded-tl-lg rounded-tr-lg transition-colors duration-300 ${
              activeTab === index ? "text-primary-700 font-semibold" : ""
            }`}
            onClick={() => setActiveTab(index)}
            onMouseEnter={() => setHoverTab(index)}
            onMouseLeave={() => setHoverTab(null)}
          >
            {tab.title}
          </div>
        ))}

        <div
          className="absolute bottom-0 left-0 h-full bg-grey-100 rounded-tl-lg rounded-tr-lg -z-10"
          style={indicatorStyle}
        />
      </div>

      <div className="w-full p-6 bg-grey-100 rounded-lg mt-0">
        <div className="grid grid-cols-2 gap-4">
          <Image
            className="w-full"
            src="/img/transparent_image_11.avif"
            width={200}
            height={200}
            alt="hypotheek tab foto"
          />
          <div className="h-full flex flex-col justify-around pt-16">
            <h2 className="text-2xl font-semibold w-3/5">
              {tabs[activeTab].heading}
            </h2>
            <p>{tabs[activeTab].content}</p>
            <button className="bg-accent-50 text-white py-2 px-4 rounded-xl w-3/5">
              {tabs[activeTab].buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabbedInfoList;
