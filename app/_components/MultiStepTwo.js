"use client";

import { useState, useEffect } from "react";
import ThousandSeparator from "./ThousandSeparator";

const MultiStepTwo = ({
  marketValue,
  remainingMortgage,
  equityToWithdraw,
  setMarketValue,
  setRemainingMortgage,
  setEquityToWithdraw,
}) => {
  // Track client-side hydration
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const maxEquity = Math.max(marketValue - remainingMortgage, 0);

  useEffect(() => {
    if (equityToWithdraw > maxEquity) {
      setEquityToWithdraw(maxEquity);
    }
  }, [
    marketValue,
    remainingMortgage,
    maxEquity,
    equityToWithdraw,
    setEquityToWithdraw,
  ]);

  const handleMarketValueChange = (e) => {
    const newValue = parseInt(e.target.value);
    setMarketValue(newValue);
  };

  const handleRemainingMortgageChange = (e) => {
    const newValue = parseInt(e.target.value);
    setRemainingMortgage(newValue);
  };

  const handleEquityToWithdrawChange = (e) => {
    const newValue = parseInt(e.target.value);
    const adjustedValue = Math.min(newValue, maxEquity);
    setEquityToWithdraw(adjustedValue);
  };

  const getSliderBackgroundStyle = (value, min, max) => {
    // Only apply custom styling after client-side hydration
    if (!isClient) return {};

    const percentage = ((value - min) / (max - min)) * 100;
    // Handle cases where min === max (e.g., maxEquity is 0) to avoid division by zero
    const safePercentage =
      max === min ? 0 : Math.min(100, Math.max(0, percentage));

    // Use CSS custom properties with fallbacks
    return {
      background: `linear-gradient(to right, var(--color-primary-700, #4338ca) ${safePercentage}%, var(--color-slider-track-bg, #e5e7eb) ${safePercentage}%)`,
    };
  };

  return (
    <div>
      <div className="xl:grid xl:grid-cols-2 gap-4 text-text-50 font-medium">
        <p className="mb-2 xl:mb-0">Wat is de marktwaarde van uw woning?</p>
        <div className="w-full flex flex-col items-end gap-4 ml-auto">
          <input
            className="ml-auto slider w-full"
            type="range"
            min="100000"
            max="1000000"
            step="5000"
            value={marketValue}
            onChange={handleMarketValueChange}
            id="martkwaardeRange"
            style={getSliderBackgroundStyle(marketValue, 100000, 1000000)}
          />
          <ThousandSeparator
            value={marketValue}
            onChange={handleMarketValueChange}
            step="5000"
            className="mb-5 w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>

        <p className="mb-2 xl:mb-0">Wat is uw resterende hypotheek?</p>
        <div className="w-full flex flex-col items-end gap-4 ml-auto">
          <input
            className="ml-auto slider w-full"
            type="range"
            min="0"
            max={marketValue} // Dynamic max
            step="5000"
            value={remainingMortgage}
            onChange={handleRemainingMortgageChange}
            id="restHypotheekRange"
            style={getSliderBackgroundStyle(remainingMortgage, 0, marketValue)}
          />
          <ThousandSeparator
            value={remainingMortgage}
            onChange={handleRemainingMortgageChange}
            step="5000"
            className="mb-5 w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>

        <p className="mb-2 xl:mb-0">Hoeveel overwaarde wilt u opnemen?</p>
        <div className="w-full flex flex-col items-end gap-4 ml-auto">
          <input
            className="ml-auto slider w-full"
            type="range"
            min="0"
            max={maxEquity} // Dynamic max
            step="1000"
            value={equityToWithdraw}
            onChange={handleEquityToWithdrawChange}
            id="overwaardeRange"
            disabled={maxEquity <= 0}
            style={getSliderBackgroundStyle(equityToWithdraw, 0, maxEquity)}
          />
          <ThousandSeparator
            value={equityToWithdraw}
            onChange={handleEquityToWithdrawChange}
            step="1000"
            className=" w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default MultiStepTwo;
