"use client";

import { useState, useEffect } from "react";
import ThousandSeparator from "./ThousandSeparator";

const MultiStepThree = ({
  register,
  setValue,
  watch,
  formState: { errors },
}) => {
  const hasPartner = watch("hasPartner");
  const inkomenValue = watch("yearlyIncome");
  const partnerValue = watch("partnerIncome");

  // Track client-side hydration
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInkomenValue = (e) => {
    setValue("yearlyIncome", parseInt(e.target.value));
  };

  const handlePartnerValue = (e) => {
    setValue("partnerIncome", parseInt(e.target.value));
  };

  const handlePartnerChange = (e) => {
    setValue("hasPartner", e.target.value === "Ja");
  };

  const getSliderBackgroundStyle = (value, min, max) => {
    // Only apply custom styling after client-side hydration
    if (!isClient) return {};

    const percentage = ((value - min) / (max - min)) * 100;
    const safePercentage =
      max === min ? 0 : Math.min(100, Math.max(0, percentage));

    // Use CSS custom properties with fallbacks - this is the cleanest approach
    return {
      background: `linear-gradient(to right, var(--color-primary-700, #4338ca) ${safePercentage}%, var(--color-slider-track-bg, #e5e7eb) ${safePercentage}%)`,
    };
  };

  return (
    <div>
      <div className="xl:grid xl:grid-cols-2 gap-4 text-text-50 font-medium">
        <p className="mb-2">Waarvoor wilt u de overwaarde benutten?</p>
        <div className="w-full flex flex-col">
          <select
            className={`rounded-md w-full py-2 px-4 bg-gray-50 border-b-3 ${
              errors.purpose ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("purpose", { required: "Selecteer een optie" })}
          >
            <option value="">-- Kies een optie --</option>
            <option value="Verbouwen / verduurzamen">
              Verbouwen / Verduurzamen woning
            </option>
            <option value="Mobiliteit (Auto, Boot, Camper)">
              Mobiliteit (Auto, Boot, Camper)
            </option>
            <option value="Kinderen helpen">Kinderen helpen</option>
            <option value="Tweede woning">Tweede woning kopen</option>
            <option value="Pensioen aanvulling">Pensioen aanvulling</option>
            <option value="overig">Overig</option>
          </select>
          {errors.purpose && (
            <span className="text-red-500 text-sm mt-1">
              {errors.purpose.message}
            </span>
          )}
        </div>

        <p className="mt-5 mb-2">Wat is uw bron van inkomen?</p>
        <div className="w-full flex flex-col">
          <select
            className={`rounded-md w-full py-2 px-4 bg-gray-50 border-b-3 ${
              errors.incomeSource ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("incomeSource", {
              required: "Selecteer een inkomensbron",
            })}
          >
            <option value="">-- Kies een optie --</option>
            <option value="Loondienst">Loondienst</option>
            <option value="Zelfstandige">Zelfstandige</option>
            <option value="Uitkering">Uitkering</option>
            <option value="Pensioen">Pensioen</option>
          </select>
          {errors.incomeSource && (
            <span className="text-red-500 text-sm mt-1">
              {errors.incomeSource.message}
            </span>
          )}
        </div>

        <p className="mt-5 mb-2">Wat is uw bruto jaar inkomen?</p>
        <div className="w-full flex flex-col items-end gap-4 ml-auto">
          <input
            className="ml-auto slider w-full"
            type="range"
            min="0"
            max="100000"
            step="500"
            value={inkomenValue}
            onChange={handleInkomenValue}
            id="myRange"
            style={getSliderBackgroundStyle(inkomenValue, 0, 100000)}
          />
          <ThousandSeparator
            value={inkomenValue}
            onChange={handleInkomenValue}
            className="mb-5 w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>

        <p className="mb-2">Heeft u een partner?</p>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <div>
              <input
                type="radio"
                id="ja"
                value="Ja"
                checked={hasPartner}
                onChange={handlePartnerChange}
              />
              <label htmlFor="ja" className="ml-1">
                Ja
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="nee"
                value="Nee"
                checked={!hasPartner}
                onChange={handlePartnerChange}
              />
              <label htmlFor="nee" className="ml-1">
                Nee
              </label>
            </div>
          </div>
          {errors.hasPartner && (
            <span className="text-red-500 text-sm mt-1">
              {errors.hasPartner.message}
            </span>
          )}
        </div>

        {hasPartner && (
          <>
            <p className="mt-5 mb-2">
              Wat is het bruto jaar inkomen van uw partner?
            </p>
            <div className="w-full flex flex-col items-end gap-4 ml-auto">
              <input
                className="ml-auto slider w-full"
                type="range"
                min="0"
                max="100000"
                step="500"
                value={partnerValue}
                onChange={handlePartnerValue}
                id="partnerRange"
                style={getSliderBackgroundStyle(partnerValue, 0, 100000)}
              />
              <ThousandSeparator
                value={partnerValue}
                onChange={handlePartnerValue}
                className="w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MultiStepThree;
