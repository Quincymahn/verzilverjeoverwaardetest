"use client";

import { useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import ThousandSeparator from "./ThousandSeparator";

const MultiStepThree = ({ onFieldInteraction, onAddressLoadingChange }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    clearErrors: clearErrorsRHF,
  } = useFormContext();

  const hasPartner = watch("hasPartner");
  const inkomenValue = watch("yearlyIncome");
  const partnerValue = watch("partnerIncome");
  const [isClient, setIsClient] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [displayError, setDisplayError] = useState("");
  const [showAddressFields, setShowAddressFields] = useState(false);

  const watchedPostcode = watch("postalCode");
  const watchedHouseNumber = watch("houseNumber");
  const watchedHouseNumberAddition = watch("houseNumberAddition"); // Nieuwe watch voor toevoeging
  const watchedStreet = watch("street"); // Watch street to decide when to show the fields

  useEffect(() => {
    setIsClient(true);
    if (watch("hasPartner") === undefined) {
      setValue("hasPartner", "nee");
    }
    // If street value exists on load, show the fields
    if (watchedStreet) {
      setShowAddressFields(true);
    }
  }, [watch, setValue, watchedStreet]);

  useEffect(() => {
    onAddressLoadingChange?.(isLoading);
  }, [isLoading, onAddressLoadingChange]);

  const fetchAddressData = useCallback(
    async (postcode, housenumber, houseNumberAddition = "") => {
      if (!postcode || !housenumber) return;

      setIsLoading(true);
      setDisplayError("");
      clearErrorsRHF(["street", "city"]);

      try {
        const requestBody = {
          postcode: postcode.trim(),
          housenumber: housenumber.trim(),
        };

        // Voeg houseNumberAddition toe als deze bestaat
        if (houseNumberAddition && houseNumberAddition.trim() !== "") {
          requestBody.houseNumberAddition = houseNumberAddition.trim();
        }

        const response = await fetch("/api/postcode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          let errorMessage = `Adres niet gevonden. Controleer uw invoer.`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            /* Fallback */
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        if (data.street && data.city) {
          setValue("street", data.street, { shouldValidate: true });
          setValue("city", data.city, { shouldValidate: true });
          setShowAddressFields(true);
        } else {
          setValue("street", "", { shouldValidate: true });
          setValue("city", "", { shouldValidate: true });
          setDisplayError(
            "Adresgegevens onvolledig. Controleer postcode/huisnummer."
          );
          setShowAddressFields(false);
        }
      } catch (err) {
        setDisplayError(err.message || "Kon adresgegevens niet ophalen.");
        setValue("street", "", { shouldValidate: true });
        setValue("city", "", { shouldValidate: true });
        setShowAddressFields(false);
      } finally {
        setIsLoading(false);
      }
    },
    [clearErrorsRHF, setValue]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const postcodeRegex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
      if (
        watchedPostcode &&
        watchedHouseNumber &&
        postcodeRegex.test(watchedPostcode.trim())
      ) {
        fetchAddressData(
          watchedPostcode,
          watchedHouseNumber,
          watchedHouseNumberAddition
        );
      } else if (watchedPostcode || watchedHouseNumber) {
        setValue("street", "", { shouldValidate: true });
        setValue("city", "", { shouldValidate: true });
        setShowAddressFields(false);
        setDisplayError("");
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [
    watchedPostcode,
    watchedHouseNumber,
    watchedHouseNumberAddition,
    fetchAddressData,
    setValue,
  ]);

  const updateYearlyIncome = (newValue) =>
    setValue("yearlyIncome", parseInt(newValue) || 0);
  const updatePartnerIncome = (newValue) =>
    setValue("partnerIncome", parseInt(newValue) || 0);

  const getSliderBackgroundStyle = (value, min, max) => {
    if (!isClient) return {};
    const val = parseInt(value) || 0;
    const percentage = max === min ? 0 : ((val - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, var(--color-primary-700, #4338ca) ${percentage}%, var(--color-slider-track-bg, #e5e7eb) ${percentage}%)`,
    };
  };

  return (
    <div>
      <div className="xl:grid xl:grid-cols-2 gap-x-4 gap-y-1 text-text-50 font-medium">
        {/* Waarvoor wilt u de overwaarde benutten? */}
        <p className="mb-2 xl:mt-4">Waarvoor wilt u de overwaarde benutten?</p>
        <div className="w-full flex flex-col mb-4">
          <select
            className={`rounded-md w-full py-2 px-4 bg-gray-50 border-b-3 ${
              errors.purpose ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("purpose", { required: "Selecteer een optie" })}
            onBlur={() => onFieldInteraction?.("purpose")}
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

        {/* Wat is uw bron van inkomen? */}
        <p className="mb-2 xl:mt-4">Wat is uw bron van inkomen?</p>
        <div className="w-full flex flex-col mb-4">
          <select
            className={`rounded-md w-full py-2 px-4 bg-gray-50 border-b-3 ${
              errors.incomeSource ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("incomeSource", {
              required: "Selecteer een inkomensbron",
            })}
            onBlur={() => onFieldInteraction?.("incomeSource")}
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

        {/* Wat is uw adres? */}
        <p className="mb-3 xl:mt-4">Wat is uw adres?</p>
        <div className="w-full flex flex-col mb-1">
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Postcode"
                className={`w-full py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
                  errors.postalCode ? "border-b-red-500" : "border-b-gray-200"
                } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
                {...register("postalCode", {
                  required: "Postcode is verplicht",
                  pattern: {
                    value: /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/,
                    message: "Ongeldige postcode",
                  },
                })}
                onBlur={() => onFieldInteraction?.("postalCode")}
              />
              {errors.postalCode && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.postalCode.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Huisnr."
                className={`w-full py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
                  errors.houseNumber ? "border-b-red-500" : "border-b-gray-200"
                } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
                {...register("houseNumber", {
                  required: "Huisnr. is verplicht",
                })}
                onBlur={() => onFieldInteraction?.("houseNumber")}
              />
              {errors.houseNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.houseNumber.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Toev."
                className={`w-full py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
                  errors.houseNumberAddition
                    ? "border-b-red-500"
                    : "border-b-gray-200"
                } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
                {...register("houseNumberAddition")}
                onBlur={() => onFieldInteraction?.("houseNumberAddition")}
              />
              {errors.houseNumberAddition && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.houseNumberAddition.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* This container will hold the status and auto-filled fields, spanning both columns */}
        <div className="mb-4 xl:col-span-2">
          {isLoading && (
            <div className="flex items-center justify-end py-2 pr-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-sm text-gray-600">
                Adres opzoeken...
              </span>
            </div>
          )}
          {displayError && !isLoading && (
            <div className="text-right pr-2">
              <p className="text-sm text-red-600">{displayError}</p>
            </div>
          )}
          {showAddressFields && !isLoading && (
            <div className="grid xl:grid-cols-2 gap-x-4">
              {/* Empty cell to push the fields to the right column on XL screens */}
              <div></div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <input
                    type="text"
                    placeholder="Straat"
                    className={`w-full py-2 px-4 bg-gray-100 rounded-md border-b-3 ${
                      errors.street ? "border-b-red-500" : "border-b-gray-200"
                    } border border-gray-200 cursor-not-allowed`}
                    {...register("street", { required: "Straat is verplicht" })}
                    readOnly
                  />
                  {errors.street && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.street.message}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Plaats"
                    className={`w-full py-2 px-4 bg-gray-100 rounded-md border-b-3 ${
                      errors.city ? "border-b-red-500" : "border-b-gray-200"
                    } border border-gray-200 cursor-not-allowed`}
                    {...register("city", { required: "Plaats is verplicht" })}
                    readOnly
                  />
                  {errors.city && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rest of the component remains the same */}
        <p className="mb-2 xl:mt-4">Wat is uw bruto jaar inkomen?</p>
        <div className="w-full flex flex-col items-end gap-4 ml-auto mb-4">
          <input
            className="ml-auto slider w-full"
            type="range"
            min="0"
            max="100000"
            step="500"
            value={inkomenValue || 0}
            onChange={(e) => updateYearlyIncome(e.target.value)}
            onMouseDown={() => onFieldInteraction?.("yearlyIncome_range")}
            style={getSliderBackgroundStyle(inkomenValue, 0, 100000)}
          />
          <ThousandSeparator
            value={inkomenValue || 0}
            onChange={(e) => updateYearlyIncome(e.target.value)}
            onFocus={() => onFieldInteraction?.("yearlyIncome_input")}
            onBlur={() => onFieldInteraction?.("yearlyIncome_input_blur")}
            className="w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none"
          />
        </div>

        <p className="mb-2 xl:mt-4">Heeft u een partner?</p>
        <div className="flex flex-col mb-4">
          <div className="flex gap-4">
            <div>
              <input
                type="radio"
                id="ja"
                value="ja"
                {...register("hasPartner")}
                onChange={(e) => {
                  setValue("hasPartner", e.target.value);
                  onFieldInteraction?.("hasPartner_ja");
                }}
              />
              <label htmlFor="ja" className="ml-1">
                Ja
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="nee"
                value="nee"
                {...register("hasPartner")}
                checked={hasPartner === "nee" || !hasPartner}
                onChange={(e) => {
                  setValue("hasPartner", e.target.value);
                  onFieldInteraction?.("hasPartner_nee");
                }}
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

        {hasPartner === "ja" && (
          <>
            <p className="mb-2 xl:mt-4">
              Wat is het bruto jaar inkomen van uw partner?
            </p>
            <div className="w-full flex flex-col items-end gap-4 ml-auto">
              <input
                className="ml-auto slider w-full"
                type="range"
                min="0"
                max="100000"
                step="500"
                value={partnerValue || 0}
                onChange={(e) => updatePartnerIncome(e.target.value)}
                onMouseDown={() => onFieldInteraction?.("partnerIncome_range")}
                style={getSliderBackgroundStyle(partnerValue, 0, 100000)}
              />
              <ThousandSeparator
                value={partnerValue || 0}
                onChange={(e) => updatePartnerIncome(e.target.value)}
                onFocus={() => onFieldInteraction?.("partnerIncome_input")}
                onBlur={() => onFieldInteraction?.("partnerIncome_input_blur")}
                className="w-[40%] ml-right text-right bg-gray-50 p-1 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:border-b-3 focus:border-b-blue-500 focus:outline-none"
              />
            </div>
            <p className="mb-2 xl:mt-4">Geboortedatum partner</p>
            <div className="w-full flex flex-col mb-4">
              <input
                type="text"
                placeholder="dd-mm-jjjj"
                className={`py-2 px-4 w-full bg-gray-50 rounded-md border-b-3 ${
                  errors.partnerBirthDate
                    ? "border-b-red-500"
                    : "border-b-gray-200"
                } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
                {...register("partnerBirthDate", {
                  required:
                    hasPartner === "ja"
                      ? "Geboortedatum partner is verplicht"
                      : false,
                  pattern: {
                    value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
                    message: "Ongeldige datum. Gebruik dd-mm-jjjj.",
                  },
                })}
                onBlur={() => onFieldInteraction?.("partnerBirthDate")}
              />
              {errors.partnerBirthDate && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.partnerBirthDate.message}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MultiStepThree;
