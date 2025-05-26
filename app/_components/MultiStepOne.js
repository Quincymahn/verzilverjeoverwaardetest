"use client";

import {
  ChatBubbleLeftRightIcon,
  CurrencyEuroIcon,
  HomeIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const MultiStepOne = ({ showImage = false }) => {
  return (
    <>
      {showImage && (
        <div className="flex justify-center items-center -top-6 relative">
          <Image
            src="/img/step1-image.png"
            width={100}
            height={100}
            alt="Step 1: Kennismaking"
            className="w-25 h-25"
          />
        </div>
      )}
      <div className="mx-auto grid grid-cols-2 gap-3">
        <div className="p-5 border-1 border-green-300 bg-green-50 rounded-lg flex flex-col justify-between items-center">
          <ChatBubbleLeftRightIcon className="w-10 h-10 rounded-full text-primary-700 bg-[#dbeafe] p-2 mb-3" />
          <h2 className="font-semibold text-sm">1. Kennismaking</h2>
        </div>
        <div className="p-5 border-1 border-gray-300 rounded-lg flex flex-col justify-between items-center">
          <HomeIcon className="w-10 h-10 rounded-full text-primary-700 bg-[#dbeafe] p-2 mb-3" />
          <h2 className="font-semibold text-sm">2. Jouw situatie</h2>
        </div>
        <div className="p-5 border-1 border-gray-300 rounded-lg flex flex-col justify-between items-center">
          <CurrencyEuroIcon className="w-10 h-10 rounded-full text-primary-700 bg-[#dbeafe] p-2 mb-3" />
          <h2 className="font-semibold text-sm">3. Jouw inkomen</h2>
        </div>
        <div className="p-5 border-1 border-gray-300 rounded-lg flex flex-col justify-between items-center">
          <IdentificationIcon className="w-10 h-10 rounded-full text-primary-700 bg-[#dbeafe] p-2 mb-3" />
          <h2 className="font-semibold text-sm">4. Jouw gegevens</h2>
        </div>
      </div>
    </>
  );
};

export default MultiStepOne;
