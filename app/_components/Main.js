"use client";

import { useState } from "react";
import Image from "next/image";
import MultiStepForm from "./MultiStepForm";
import MultistepFormInfoSection from "./MultistepFormInfoSection";
import {
  HiOutlineBanknotes,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCloud,
  HiOutlineUserGroup,
} from "react-icons/hi2";

function Main() {
  // Lift state up to Main component
  const [marketValue, setMarketValue] = useState(300000);
  const [remainingMortgage, setRemainingMortgage] = useState(200000);
  const [equityToWithdraw, setEquityToWithdraw] = useState(30000);

  return (
    <main className="relative bg-gradient-to-br from-[#0358BA] to-[#1B7CED] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center pt-15">
          <h1 className="text-white text-4xl mb-3 font-semibold drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
            Welkom bij verzilverjeoverwaarde.nl
          </h1>
          <p className="text-gray-100 text-xl mb-8 font-light">
            Ontdek onze hypotheek mogelijkeden in slechts 3 minuten
          </p>
        </div>

        <div className="flex gap-6 items-center justify-center p-2">
          <div className="flex items-center gap-2">
            <HiOutlineChatBubbleLeftRight className=" bg-[#589ded]  text-white w-6 h-6 flex items-center justify-center p-1 rounded-full" />
            <span className="text-white font-semibold">
              Vrijblijvend Advies
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineCloud className=" bg-[#589ded]  text-white w-6 h-6 flex items-center justify-center p-1 rounded-full" />
            <span className="text-white font-semibold">Volledig Online</span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineBanknotes className=" bg-[#589ded]  text-white w-6 h-6 flex items-center justify-center p-1 rounded-full" />
            <span className="text-white font-semibold">
              Altijd Laagste Rente
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineUserGroup className=" bg-[#589ded]  text-white w-6 h-6 flex items-center justify-center p-1 rounded-full" />
            <span className="text-white font-semibold">
              Deskundige Adviseurs
            </span>
          </div>
        </div>

        <div className="grid grid-cols-10 items-center w-full -mt-6 mb-[25rem] gap-2">
          {/* Pass state and setter functions to MultiStepForm */}
          <MultiStepForm
            marketValue={marketValue}
            remainingMortgage={remainingMortgage}
            equityToWithdraw={equityToWithdraw}
            setMarketValue={setMarketValue}
            setRemainingMortgage={setRemainingMortgage}
            setEquityToWithdraw={setEquityToWithdraw}
          />
          {/* Pass only state values to info section */}
          <MultistepFormInfoSection
            marketValue={marketValue}
            remainingMortgage={remainingMortgage}
            equityToWithdraw={equityToWithdraw}
          />
        </div>
      </div>

      <Image
        src="/img/untitled.png"
        alt="Decorative wave pattern"
        width={1300}
        height={1300}
        className="absolute bottom-0 right-0 w-full"
      />

      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,280 C360,160,720,220,800,235 C1250,320,1440,280,1440,280 L1440,320 L0,320Z"
        ></path>
      </svg>
    </main>
  );
}

export default Main;
