"use client";

const MultiStepFour = ({ register, formState: { errors } }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-text-50">Voornaam</label>
          <input
            type="text"
            className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
              errors.firstName ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("firstName", { required: "Voornaam is verplicht" })}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-text-50">Achternaam</label>
          <input
            type="text"
            className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
              errors.lastName ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("lastName", { required: "Achternaam is verplicht" })}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </span>
          )}
        </div>

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
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-text-50">Telefoonnummer</label>
          <input
            type="tel"
            className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
              errors.phoneNumber ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("phoneNumber", {
              required: "Telefoonnummer is verplicht",
              pattern: {
                value: /^[0-9\s\-\+\(\)]{10,15}$/,
                message: "Ongeldig telefoonnummer",
              },
            })}
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-text-50">Postcode</label>
          <input
            type="text"
            className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
              errors.postalCode ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("postalCode", {
              required: "Postcode is verplicht",
              pattern: {
                value: /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/,
                message: "Ongeldige postcode (bijv. 1234 AB)",
              },
            })}
          />
          {errors.postalCode && (
            <span className="text-red-500 text-sm mt-1">
              {errors.postalCode.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-text-50">Huisnummer</label>
          <input
            type="text"
            className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
              errors.houseNumber ? "border-b-red-500" : "border-b-gray-200"
            } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
            {...register("houseNumber", {
              required: "Huisnummer is verplicht",
            })}
          />
          {errors.houseNumber && (
            <span className="text-red-500 text-sm mt-1">
              {errors.houseNumber.message}
            </span>
          )}
        </div>
      </div>
      <div className="w-full">
        <label className="text-text-50">Opmerking</label>
        <textarea
          className="py-2 px-4 w-full bg-gray-50 rounded-md h-25 border-b-3 border-b-gray-200 focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300"
          {...register("comments")}
        />
      </div>
    </>
  );
};

export default MultiStepFour;

// "use client";
// import { useState, useEffect } from "react";

// const MultiStepFour = ({
//   register,
//   formState: { errors },
//   watch,
//   setValue,
// }) => {
//   const [addressData, setAddressData] = useState({
//     street: "",
//     city: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showAddressFields, setShowAddressFields] = useState(false);

//   // Watch postcode and house number fields
//   const watchedPostcode = watch("postalCode");
//   const watchedHouseNumber = watch("houseNumber");

//   // Function to fetch address data with improved error handling
//   const fetchAddressData = async (postcode, housenumber) => {
//     if (!postcode || !housenumber) return;

//     // Clear previous state
//     setIsLoading(true);
//     setError("");
//     setShowAddressFields(false);

//     try {
//       console.log("Fetching address for:", { postcode, housenumber });

//       const response = await fetch("/api/postcode", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           postcode: postcode.trim(),
//           housenumber: housenumber.trim(),
//         }),
//       });

//       console.log("Response status:", response.status);

//       if (!response.ok) {
//         let errorMessage = `HTTP ${response.status}`;

//         try {
//           const responseText = await response.text();
//           console.error("Error response text:", responseText);

//           if (responseText) {
//             try {
//               const errorData = JSON.parse(responseText);
//               errorMessage = errorData.error || errorMessage;
//             } catch (jsonError) {
//               errorMessage = responseText || errorMessage;
//             }
//           }
//         } catch (textError) {
//           console.error("Failed to get error response:", textError);
//         }

//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       console.log("Received address data:", data);

//       // Update address data with API response
//       setAddressData({
//         street: data.street || "",
//         city: data.city || "",
//       });

//       // Set values in react-hook-form
//       setValue("street", data.street || "");
//       setValue("city", data.city || "");

//       setShowAddressFields(true);
//     } catch (err) {
//       console.error("Address fetch error:", err);
//       setError(err.message || "Failed to fetch address data");
//       setShowAddressFields(false);
//       // Clear fields on error
//       setValue("street", "");
//       setValue("city", "");
//       setAddressData({ street: "", city: "" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Debounced effect to trigger API call
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (watchedPostcode && watchedHouseNumber) {
//         // Validate postcode format before making API call
//         const postcodeRegex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
//         if (postcodeRegex.test(watchedPostcode.trim())) {
//           fetchAddressData(watchedPostcode, watchedHouseNumber);
//         } else {
//           setShowAddressFields(false);
//           setError("");
//           setValue("street", "");
//           setValue("city", "");
//         }
//       } else {
//         setShowAddressFields(false);
//         setError("");
//         setValue("street", "");
//         setValue("city", "");
//       }
//     }, 800); // Increased debounce delay to 800ms for better UX

//     return () => clearTimeout(timer);
//   }, [watchedPostcode, watchedHouseNumber, setValue]);

//   return (
//     <>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="flex flex-col">
//           <label className="text-text-50">Voornaam</label>
//           <input
//             type="text"
//             className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
//               errors.firstName ? "border-b-red-500" : "border-b-gray-200"
//             } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
//             {...register("firstName", { required: "Voornaam is verplicht" })}
//           />
//           {errors.firstName && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.firstName.message}
//             </span>
//           )}
//         </div>
//         <div className="flex flex-col">
//           <label className="text-text-50">Achternaam</label>
//           <input
//             type="text"
//             className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
//               errors.lastName ? "border-b-red-500" : "border-b-gray-200"
//             } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
//             {...register("lastName", { required: "Achternaam is verplicht" })}
//           />
//           {errors.lastName && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.lastName.message}
//             </span>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label className="text-text-50">E-mailadres</label>
//           <input
//             type="email"
//             className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
//               errors.email ? "border-b-red-500" : "border-b-gray-200"
//             } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
//             {...register("email", {
//               required: "E-mailadres is verplicht",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Ongeldig e-mailadres formaat",
//               },
//             })}
//           />
//           {errors.email && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.email.message}
//             </span>
//           )}
//         </div>
//         <div className="flex flex-col">
//           <label className="text-text-50">Telefoonnummer</label>
//           <input
//             type="tel"
//             className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
//               errors.phoneNumber ? "border-b-red-500" : "border-b-gray-200"
//             } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
//             {...register("phoneNumber", {
//               required: "Telefoonnummer is verplicht",
//               pattern: {
//                 value: /^[0-9\s\-\+\(\)]{10,15}$/,
//                 message: "Ongeldig telefoonnummer",
//               },
//             })}
//           />
//           {errors.phoneNumber && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.phoneNumber.message}
//             </span>
//           )}
//         </div>

//         <div className="flex flex-col">
//           <label className="text-text-50">Postcode</label>
//           <input
//             type="text"
//             className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
//               errors.postalCode ? "border-b-red-500" : "border-b-gray-200"
//             } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
//             {...register("postalCode", {
//               required: "Postcode is verplicht",
//               pattern: {
//                 value: /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/,
//                 message: "Ongeldige postcode (bijv. 1234 AB)",
//               },
//             })}
//           />
//           {errors.postalCode && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.postalCode.message}
//             </span>
//           )}
//         </div>
//         <div className="flex flex-col">
//           <label className="text-text-50">Huisnummer</label>
//           <input
//             type="text"
//             className={`py-2 px-4 bg-gray-50 rounded-md border-b-3 ${
//               errors.houseNumber ? "border-b-red-500" : "border-b-gray-200"
//             } focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300`}
//             {...register("houseNumber", {
//               required: "Huisnummer is verplicht",
//             })}
//           />
//           {errors.houseNumber && (
//             <span className="text-red-500 text-sm mt-1">
//               {errors.houseNumber.message}
//             </span>
//           )}
//         </div>

//         {/* Loading Indicator */}
//         {isLoading && (
//           <div className="col-span-2 flex items-center justify-center py-2">
//             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
//             <span className="ml-2 text-sm text-gray-600">
//               Adres opzoeken...
//             </span>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="col-span-2 bg-red-50 border border-red-200 rounded-md p-3">
//             <p className="text-sm text-red-600">{error}</p>
//           </div>
//         )}

//         {/* Street Field - Only shown when data is fetched */}
//         {showAddressFields && !isLoading && (
//           <div className="flex flex-col">
//             <label className="text-text-50">Straat</label>
//             <input
//               type="text"
//               className="py-2 px-4 bg-gray-100 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:outline-none cursor-not-allowed"
//               {...register("street")}
//               readOnly
//               value={addressData.street}
//             />
//           </div>
//         )}

//         {/* City Field - Only shown when data is fetched */}
//         {showAddressFields && !isLoading && (
//           <div className="flex flex-col">
//             <label className="text-text-50">Plaats</label>
//             <input
//               type="text"
//               className="py-2 px-4 bg-gray-100 rounded-md border-b-3 border-b-gray-200 border border-gray-200 focus:outline-none cursor-not-allowed"
//               {...register("city")}
//               readOnly
//               value={addressData.city}
//             />
//           </div>
//         )}
//       </div>
//       <div className="w-full">
//         <label className="text-text-50">Opmerking</label>
//         <textarea
//           className="py-2 px-4 w-full bg-gray-50 rounded-md h-25 border-b-3 border-b-gray-200 focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300"
//           {...register("comments")}
//         />
//       </div>
//     </>
//   );
// };

// export default MultiStepFour;
