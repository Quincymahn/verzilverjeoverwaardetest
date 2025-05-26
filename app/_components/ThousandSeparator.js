"use client";

import { useState, useEffect } from "react";

const ThousandSeparator = ({ value, onChange, step, className }) => {
  const [inputValue, setInputValue] = useState("");

  // Update the formatted input value when the prop value changes
  useEffect(() => {
    setInputValue(`€ ${new Intl.NumberFormat("nl-NL").format(value)}`);
  }, [value]);

  const handleInputChange = (e) => {
    // Get only the digits from the input
    const rawValue = e.target.value.replace(/[^0-9]/g, "");

    // Convert to number
    const numericValue = rawValue ? parseInt(rawValue) : 0;

    // Format for display
    setInputValue(`€ ${new Intl.NumberFormat("nl-NL").format(numericValue)}`);

    // Call the parent's onChange handler with a simulated event
    if (onChange) {
      const simulatedEvent = {
        target: { value: numericValue.toString() },
      };
      onChange(simulatedEvent);
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      className={className}
    />
  );
};

export default ThousandSeparator;
