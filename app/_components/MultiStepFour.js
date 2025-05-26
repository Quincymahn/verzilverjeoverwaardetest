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
          className="py-2 px-4 w-full g-gray-50 rounded-md h-25 border-b-3 border-b-gray-200 focus:border-b-3 focus:border-b-blue-500 border border-gray-200 focus:outline-none transition-all duration-300"
          {...register("comments")}
        />
      </div>
    </>
  );
};

export default MultiStepFour;
