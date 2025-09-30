"use client";

import { useState, useEffect } from "react"; // Importeren van useState en useEffect
import { useFormContext } from "react-hook-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const PLACEHOLDERS = new Set([
  "123456",
  "1234567",
  "12345678",
  "123456789",
  "000000",
  "0000000",
  "999999999",
  "111111",
  "555555",
]);

function quickReject(digits) {
  if (!digits) return true;
  if (PLACEHOLDERS.has(digits)) return true;
  if (/^0{6,}$/.test(digits)) return true; // 000000...
  if (/^(.)\1{5,}$/.test(digits)) return true; // 666666...
  if (digits.length < 7) return true; // te kort (landafhankelijk)
  return false;
}

function hasLongRepeatedSequence(s, minLen = 6) {
  // detecteer >= minLen gelijk opeenvolgende tekens
  const re = new RegExp(`(.)\\1{${minLen - 1},}`);
  return re.test(s);
}

function hasLongTrailingZeros(s, minLen = 6) {
  return new RegExp(`0{${minLen},}$`).test(s);
}

function isMostlySameDigit(s, threshold = 0.75) {
  if (!s) return false;
  const counts = {};
  for (const ch of s) counts[ch] = (counts[ch] || 0) + 1;
  const max = Math.max(...Object.values(counts));
  return max / s.length >= threshold;
}

function hasSequentialRun(s, minLen = 6) {
  if (s.length < minLen) return false;
  // check for ascending or descending runs of digits
  let ascCount = 1;
  let descCount = 1;
  for (let i = 1; i < s.length; i++) {
    const prev = parseInt(s[i - 1], 10);
    const cur = parseInt(s[i], 10);
    if (cur === prev + 1) {
      ascCount++;
      descCount = 1;
    } else if (cur === prev - 1) {
      descCount++;
      ascCount = 1;
    } else {
      ascCount = 1;
      descCount = 1;
    }
    if (ascCount >= minLen || descCount >= minLen) return true;
  }
  return false;
}

function flaggedByHeuristics(nationalNumber) {
  if (!nationalNumber) return false;
  // 1) lange herhalende reeks (666666, 000000, ...)
  if (hasLongRepeatedSequence(nationalNumber, 6)) return true;
  // 2) trailing zeros (bijv. x000000)
  if (hasLongTrailingZeros(nationalNumber, 6)) return true;
  // 3) te eendimensionaal: >75% dezelfde digit
  if (isMostlySameDigit(nationalNumber, 0.75)) return true;
  // 4) opeenvolgende reeksen zoals 1234567 of 7654321
  if (hasSequentialRun(nationalNumber, 6)) return true;

  // 5) Landspecifieke extra regels (voor NL-mobile: '6' gevolgd door veel zeros)
  //    nationalNumber voor NL mobiel is bijv '600000000' — we willen dat blokkeren.
  if (
    nationalNumber.length >= 8 &&
    nationalNumber.startsWith("6") &&
    /^6?0{6,}$/.test(nationalNumber)
  )
    return true;

  return false;
}

const MultiStepFour = ({ onFieldInteraction }) => {
  // Get RHF methods from context.
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Lokale state voor de geselecteerde gender, standaard op "Man"
  const [selectedGender, setSelectedGender] = useState("Heer");

  // Zet de standaardwaarde in React Hook Form wanneer de component laadt
  useEffect(() => {
    setValue("gender", "Heer");
  }, [setValue]);

  // onBlur handler: zet genormaliseerd E.164 in verborgen veld als het valide is
  const handlePhoneBlur = (e) => {
    onFieldInteraction?.("phoneNumber");
    const raw = (e.target.value || "").trim();
    const digits = raw.replace(/\D/g, "");

    try {
      const pn = parsePhoneNumberFromString(
        raw,
        raw && raw.startsWith("+") ? undefined : "NL"
      );

      if (!pn || !pn.isValid()) {
        setValue("phoneNumberE164", "", { shouldDirty: true });
        return;
      }

      // pak nationalNumber (string) voor heuristieken
      const nat = pn.nationalNumber; // voorbeeld: '600000000'
      if (flaggedByHeuristics(nat)) {
        // plaatsten we geen e164; validatie toont error (validate fn doet dat ook)
        setValue("phoneNumberE164", "", { shouldDirty: true });
        return;
      }

      // oke, genormaliseerd opslaan
      setValue("phoneNumberE164", pn.number, { shouldDirty: true });
    } catch (err) {
      setValue("phoneNumberE164", "", { shouldDirty: true });
    }
  };

  // Handler voor het selecteren van gender
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setValue("gender", gender, { shouldValidate: true }); // Update RHF state
    onFieldInteraction?.("gender");
  };

  return (
    <>
      {/* Gender Selectie */}
      <div className="w-full">
        <label className="text-text-50 mb-2 block">Aanhef</label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => handleGenderSelect("Heer")}
            className={`flex-1 py-2 px-4 rounded-md text-center font-medium transition-all duration-300 border-b-3 ${
              selectedGender === "Heer"
                ? "bg-blue-500 text-white border-b-blue-700"
                : "bg-gray-50 text-gray-700 border-b-gray-200 hover:bg-gray-100"
            }`}
          >
            Heer
          </button>
          <button
            type="button"
            onClick={() => handleGenderSelect("Mevrouw")}
            className={`flex-1 py-2 px-4 rounded-md text-center font-medium transition-all duration-300 border-b-3 ${
              selectedGender === "Mevrouw"
                ? "bg-blue-500 text-white border-b-blue-700"
                : "bg-gray-50 text-gray-700 border-b-gray-200 hover:bg-gray-100"
            }`}
          >
            Mevrouw
          </button>
        </div>
        <input
          type="hidden"
          {...register("gender", { required: "Kies een aanhef" })}
        />
        {errors.gender && (
          <span className="text-red-500 text-sm mt-1">
            {errors.gender.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* Voornaam */}
        <div className="flex flex-col">
          <label className="text-text-50">Voornaam</label>
          <input
            type="text"
            className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
              errors.firstName ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("firstName", { required: "Voornaam is verplicht" })}
            onBlur={() => onFieldInteraction?.("firstName")}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </span>
          )}
        </div>

        {/* Achternaam */}
        <div className="flex flex-col">
          <label className="text-text-50">Achternaam</label>
          <input
            type="text"
            className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
              errors.lastName ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("lastName", { required: "Achternaam is verplicht" })}
            onBlur={() => onFieldInteraction?.("lastName")}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </span>
          )}
        </div>

        {/* E-mailadres */}
        <div className="flex flex-col">
          <label className="text-text-50">E-mailadres</label>
          <input
            type="email"
            className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
              errors.email ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("email", {
              required: "E-mailadres is verplicht",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Ongeldig e-mailadres formaat",
              },
            })}
            onBlur={() => onFieldInteraction?.("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Telefoonnummer */}
        <div className="flex flex-col">
          <label className="text-text-50">Telefoonnummer</label>
          <input
            type="tel"
            placeholder="+31 6 1234 5678"
            className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
              errors.phoneNumber ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("phoneNumber", {
              required: "Telefoonnummer is verplicht",
              validate: (val) => {
                const raw = (val || "").trim();
                const digits = raw.replace(/\D/g, "");
                if (!digits) return "Voer je telefoonnummer in";

                // snelle placeholder / herhaling reject (harde validatie)
                if (quickReject(digits)) return "Ongeldig telefoonnummer";

                // parse en validatie met libphonenumber-js (standaard NL wanneer geen +)
                try {
                  const pn = parsePhoneNumberFromString(
                    raw,
                    raw && raw.startsWith("+") ? undefined : "NL"
                  );
                  if (!pn || !pn.isValid()) return "Ongeldig telefoonnummer";

                  // aanvullende heuristieken op nationalNumber
                  const nat = pn.nationalNumber;
                  if (flaggedByHeuristics(nat))
                    return "Ongeldig telefoonnummer";

                  return true;
                } catch (e) {
                  return "Ongeldig telefoonnummer";
                }
              },
            })}
            onBlur={handlePhoneBlur}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </span>
          )}

          {/* verborgen veld met genormaliseerd E.164 (voor backend) */}
          <input type="hidden" {...register("phoneNumberE164")} />
        </div>
      </div>

      <div className="w-full mt-4">
        <label className="text-text-50">Geboortedatum</label>
        <input
          type="text"
          placeholder="dd-mm-jjjj"
          className={`py-2 px-4 w-full bg-gray-50 rounded-md border border-b-3 ${
            errors.birthDate ? "border-b-red-500" : "border-b-gray-200"
          } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
          {...register("birthDate", {
            required: "Geboortedatum is verplicht",
            pattern: {
              value: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}$/,
              message:
                "Ongeldige geboortedatum. Gebruik het formaat dd-mm-jjjj.",
            },
          })}
          onBlur={() => onFieldInteraction?.("birthDate")}
        />
        {errors.birthDate && (
          <span className="text-red-500 text-sm mt-1">
            {errors.birthDate.message}
          </span>
        )}
      </div>

      {/* Opmerking */}
      <div className="w-full mt-4">
        <label className="text-text-50">Opmerking</label>
        <textarea
          className="py-2 px-4 w-full bg-gray-50 rounded-md h-25 border-b-3 border-b-gray-200 focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300"
          {...register("comments")}
          onBlur={() => onFieldInteraction?.("comments")}
        />
      </div>
    </>
  );
};

export default MultiStepFour;
