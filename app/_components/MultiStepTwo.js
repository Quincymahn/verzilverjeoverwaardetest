"use client";

import { useState, useEffect } from "react";
import ThousandSeparator from "./ThousandSeparator";

// Helper function to get CSS variable values (more robust than assuming they are always available)
const getCssVariableValue = (variableName) => {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }
  return ""; // Fallback for SSR or if not found
};

const MultiStepTwo = ({
  marketValue,
  remainingMortgage,
  equityToWithdraw,
  setMarketValue,
  setRemainingMortgage,
  setEquityToWithdraw,
}) => {
  const [primary700, setPrimary700] = useState("");
  const [sliderTrackBg, setSliderTrackBg] = useState("");

  useEffect(() => {
    // Fetch CSS variable values once on mount
    setPrimary700(getCssVariableValue("--color-primary-700") || "#4338ca"); // Fallback if CSS var not found
    setSliderTrackBg(
      getCssVariableValue("--color-slider-track-bg") || "#e5e7eb"
    ); // Fallback
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
    if (!primary700 || !sliderTrackBg) return {}; // Don't style if colors not loaded

    const percentage = ((value - min) / (max - min)) * 100;
    // Handle cases where min === max (e.g., maxEquity is 0) to avoid division by zero
    const safePercentage =
      max === min ? 0 : Math.min(100, Math.max(0, percentage));

    return {
      background: `linear-gradient(to right, ${primary700} ${safePercentage}%, ${sliderTrackBg} ${safePercentage}%)`,
    };
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 text-text-50 font-medium">
        <p>Wat is de marktwaarde van uw woning?</p>
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
            className="w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>

        <p>Wat is uw resterende hypotheek?</p>
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
            className="w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>

        <p>Hoeveel overwaarde wilt u opnemen?</p>
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
            className="w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default MultiStepTwo;
