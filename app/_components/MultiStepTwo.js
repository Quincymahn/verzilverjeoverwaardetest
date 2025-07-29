"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form"; // Step 1: Import this
import ThousandSeparator from "./ThousandSeparator";

// Step 2: Remove all the state props. We only need the interaction props.
const MultiStepTwo = ({ onFirstInteraction, onFieldInteraction }) => {
  // Step 3: Get everything we need from the RHF context
  const { watch, setValue } = useFormContext();

  // Step 4: Watch the values directly from the RHF state
  const marketValue = watch("marketValue");
  const remainingMortgage = watch("remainingMortgage");
  const equityToWithdraw = watch("equityToWithdraw");

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const maxEquity = Math.max(marketValue - remainingMortgage, 0);

  useEffect(() => {
    if (equityToWithdraw > maxEquity) {
      // Step 5: Update the RHF state directly using setValue
      setValue("equityToWithdraw", maxEquity, { shouldValidate: true });
    }
  }, [
    marketValue,
    remainingMortgage,
    maxEquity,
    equityToWithdraw,
    setValue, // Add setValue to dependency array
  ]);

  // Step 6: Create handlers that use `setValue` to update the RHF state
  const handleMarketValueChange = (e) => {
    onFirstInteraction?.();
    const newValue = parseInt(e.target.value) || 0;
    setValue("marketValue", newValue, { shouldValidate: true });
  };

  const handleRemainingMortgageChange = (e) => {
    onFirstInteraction?.();
    const newValue = parseInt(e.target.value) || 0;
    setValue("remainingMortgage", newValue, { shouldValidate: true });
  };

  const handleEquityToWithdrawChange = (e) => {
    onFirstInteraction?.();
    const newValue = parseInt(e.target.value) || 0;
    const adjustedValue = Math.min(newValue, maxEquity);
    setValue("equityToWithdraw", adjustedValue, { shouldValidate: true });
  };

  const getSliderBackgroundStyle = (value, min, max) => {
    if (!isClient) return {};
    const percentage = max === min ? 0 : ((value - min) / (max - min)) * 100;
    const safePercentage = Math.min(100, Math.max(0, percentage));
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
            value={marketValue} // This now comes from RHF's `watch`
            onChange={handleMarketValueChange} // This now calls `setValue`
            id="martkwaardeRange"
            style={getSliderBackgroundStyle(marketValue, 100000, 1000000)}
            onBlur={() => onFieldInteraction?.("marketValue_range")}
          />
          <ThousandSeparator
            value={marketValue}
            onChange={handleMarketValueChange}
            step="5000"
            onFocus={onFirstInteraction}
            onBlur={() => onFieldInteraction?.("marketValue_input")}
            className="mb-5 w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>

        <p className="mb-2 xl:mb-0">Wat is uw resterende hypotheek?</p>
        <div className="w-full flex flex-col items-end gap-4 ml-auto">
          <input
            className="ml-auto slider w-full"
            type="range"
            min="0"
            max={marketValue}
            step="5000"
            value={remainingMortgage}
            onChange={handleRemainingMortgageChange}
            onBlur={() => onFieldInteraction?.("remainingMortgage_range")}
            id="restHypotheekRange"
            style={getSliderBackgroundStyle(remainingMortgage, 0, marketValue)}
          />
          <ThousandSeparator
            value={remainingMortgage}
            onChange={handleRemainingMortgageChange}
            step="5000"
            onBlur={() => onFieldInteraction?.("remainingMortgage_input")}
            className="mb-5 w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>

        <p className="mb-2 xl:mb-0">Hoeveel overwaarde wilt u opnemen?</p>
        <div className="w-full flex flex-col items-end gap-4 ml-auto">
          <input
            className="ml-auto slider w-full"
            type="range"
            min="0"
            max={maxEquity}
            step="1000"
            value={equityToWithdraw}
            onChange={handleEquityToWithdrawChange}
            onBlur={() => onFieldInteraction?.("equityToWithdraw_range")}
            id="overwaardeRange"
            disabled={maxEquity <= 0}
            style={getSliderBackgroundStyle(equityToWithdraw, 0, maxEquity)}
          />
          <ThousandSeparator
            value={equityToWithdraw}
            onChange={handleEquityToWithdrawChange}
            step="1000"
            onBlur={() => onFieldInteraction?.("equityToWithdraw_input")}
            className=" w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default MultiStepTwo;
