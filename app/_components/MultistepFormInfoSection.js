"use client";

import { useState } from "react";

// Modified MultistepFormInfoSection to correctly display the equityToWithdraw from the slider
function MultistepFormInfoSection({
  marketValue,
  remainingMortgage,
  equityToWithdraw,
}) {
  // Calculate the equity (overwaarde)
  const equity = marketValue - remainingMortgage;

  // Calculate percentages for progress bar
  const mortgagePercentage = (remainingMortgage / marketValue) * 100;
  const withdrawPercentage = (equityToWithdraw / marketValue) * 100;
  const remainingEquityPercentage =
    ((equity - equityToWithdraw) / marketValue) * 100;

  return (
    <div className="col-span-3 gap-2 mb-auto mt-10 w-full">
      <div className="mb-2 shadow-lg bg-white rounded-lg">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-tl-lg rounded-tr-lg">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-7 text-primary-700 bg-white p-1.5 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <p className="text-gray-800 font-semibold">Uw woning</p>
          </div>
          <p className="py-1 px-2 bg-accent-50 font-semibold text-xs inline rounded-xl text-white">
            Waarde inzicht
          </p>
        </div>

        <div className="flex justify-between mb-2 pt-3 px-3">
          <p className="text-gray-500">Woningwaarde</p>
          <p className="font-semibold text-black">
            € {new Intl.NumberFormat("nl-NL").format(marketValue)}
          </p>
        </div>

        <div className="px-3">
          <div className="w-full h-10 border border-gray-200 bg-gray-100 rounded-lg flex mb-2">
            <p
              className="bg-blue-200 rounded-tl-lg rounded-bl-lg text-center flex items-center justify-center text-xs font-semibold text-white"
              style={{ width: `${mortgagePercentage}%` }}
            >
              {mortgagePercentage > 25 ? "Hypotheek" : ""}
            </p>
            <p
              className="bg-blue-500 text-xs font-semibold text-white text-center flex items-center justify-center"
              style={{ width: `${withdrawPercentage}%` }}
            >
              {withdrawPercentage > 20 ? "Opnemen" : ""}
            </p>
            <p
              className="bg-gray-100 text-xs font-semibold text-gray-400 text-center flex items-center justify-center"
              style={{ width: `${remainingEquityPercentage}%` }}
            ></p>
          </div>
        </div>

        <div className="flex justify-between mb-3 pt-3 px-3">
          <p className="text-xs text-black font-semibold">
            <span className="text-gray-500 font-medium">Hypotheek: </span> €{" "}
            {new Intl.NumberFormat("nl-NL").format(remainingMortgage)}
          </p>
          <p className="text-xs text-black font-semibold">
            <span className="text-gray-500 font-medium">Overwaarde: </span> €{" "}
            {new Intl.NumberFormat("nl-NL").format(equity)}
          </p>
        </div>

        <div className="flex justify-between mb-3 pt-1 px-3">
          <p className="text-xs text-black font-semibold">
            <span className="text-gray-500 font-medium">Op te nemen: </span> €{" "}
            {new Intl.NumberFormat("nl-NL").format(equityToWithdraw)}
          </p>
          <p className="text-xs text-black font-semibold">
            <span className="text-gray-500 font-medium">Beschikbaar: </span> €{" "}
            {new Intl.NumberFormat("nl-NL").format(equity - equityToWithdraw)}
          </p>
        </div>

        <div className="px-3">
          <div className="w-full h-[1px] border-b-1 border-gray-200"></div>
        </div>

        <div className="flex gap-2 py-3 px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            />
          </svg>
          <p className="text-xs text-gray-500">
            Gemiddelde stijging:{" "}
            <span className="font-semibold text-black">7,3%</span> per jaar
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 bg-white p-3 rounded-lg gap-2 mb-2">
        <div className="p-2 border border-blue-200 flex flex-col items-center justify-center rounded-lg text-center bg-blue-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 rounded-full text-blue-600 bg-blue-200 p-2 mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
            />
          </svg>
          <p className="text-blue-800 text-sm font-semibold">Maandlasten</p>
          <p className="text-blue-600 text-xs">Bespaar tot wel €250</p>
        </div>

        <div className="p-2 border border-emerald-200 bg-emerald-100 flex flex-col items-center justify-center rounded-lg text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8 rounded-full text-emerald-600 bg-emerald-200 p-2 mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
            />
          </svg>
          <p className="text-emerald-800 text-sm font-semibold">
            Veilig & zeker
          </p>
          <p className="text-emerald-600 text-xs">Altijd de beste rente</p>
        </div>
      </div>

      <div className="bg-white shadow-lg border border-gray-200 overflow-hidden rounded-lg">
        <div className="flex bg-gray-50 justify-between border-b p-3 border-gray-100">
          <span className="flex gap-2 text-primary-700 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-4 text-primary-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            laatste aanvraag
          </span>

          <span className="flex gap-1 bg-blue-100 text-primary-700 px-2 py-0.5 text-sm items-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-4 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            12:34
          </span>
        </div>

        <div className="flex justify-between">
          <p className="text-sm text-gray-500 p-2">Aantal aanvragen vandaag</p>
          <div className="flex -space-x-2 mr-2 items-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-full border-2 border-white ${
                  ["bg-pink-500", "bg-purple-500", "bg-indigo-500"][i]
                }`}
              ></div>
            ))}
            <p className="text-lg font-semibold ml-5">18</p>
          </div>
        </div>

        <div className="p-2 flex justify-between items-center">
          <p className="text-sm text-gray-500">zoveel mensen zijn u al voor</p>
          <p className="font-semibold">15.874</p>
        </div>
      </div>
    </div>
  );
}

export default MultistepFormInfoSection;
