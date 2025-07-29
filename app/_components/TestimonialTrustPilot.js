// Add "use client" at the top because we'll use hooks (useState, useEffect)
"use client";

import Image from "next/image";
import { useEffect, useState } from "react"; // Import hooks

function TestimonialTrustPilot() {
  const [totalUsers, setTotalUsers] = useState("..."); // State for the total users count
  const [fetchError, setFetchError] = useState(null); // State for any fetch error

  useEffect(() => {
    async function fetchTotalUsers() {
      try {
        const response = await fetch("/api/entry-count"); // Same API endpoint
        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Unknown error fetching user count" }));
          throw new Error(
            errorData.details ||
              errorData.error ||
              `HTTP error! status: ${response.status}`
          );
        }
        const data = await response.json();

        if (typeof data.totalCount !== "undefined") {
          // Format the number if it's large, e.g., using Intl.NumberFormat
          setTotalUsers(new Intl.NumberFormat("nl-NL").format(data.totalCount));
        } else {
          setTotalUsers("N/A");
          console.warn(
            "totalCount not found in API response for TestimonialTrustPilot"
          );
        }
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching total users for Testimonial:", error);
        setTotalUsers("Error"); // Display "Error" or keep "..."
        setFetchError(error.message || "Failed to load user count.");
      }
    }

    fetchTotalUsers();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="flex flex-col items-center ">
      <div className="flex items-end gap-1 mb-2">
        <Image
          src="/img/trustpilot-2.svg"
          width={50}
          height={50}
          alt="trustpilot star"
          className="w-8 h-8"
        />
        <p className="text-xl font-bold">Trustpilot</p>
      </div>
      <div className="flex gap-[2px] mb-1">
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-[#08b87e]"
        />
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-[#08b87e]"
        />
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-[#08b87e]"
        />
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-[#08b87e]"
        />
        <Image
          src="/img/trustpilotwhite.png"
          width={100}
          height={100}
          alt="trustpilot star rating"
          className="w-8 h-8 p-1 bg-gradient-to-r from-[#08b87e] from-50% to-gray-300 to-50%"
        />
      </div>
      <div className="flex text-gray-500 text-xs gap-1 mb-4">
        <p>
          TrustScore <span className="font-semibold">4.4 / 5</span>{" "}
        </p>
        <span>|</span>
        <p className="font-semibold underline">127 reviews</p>
      </div>
      <div className="text-center">
        {/* MODIFIED PART */}
        <p className="text-sm mb-3">
          Zoveel klanten zijn u al voor gegaan:{" "}
          <span className="underline font-semibold">{totalUsers}</span>
        </p>
        {/* END MODIFIED PART */}
        {fetchError && (
          <p className="text-red-500 text-xs mt-1">
            {/* Optionally display a simpler error message to the user */}
            Kon aantal klanten niet laden.
          </p>
        )}
        <a
          className="bg-accent-50 rounded-full py-1.5 duration-300 px-4 text-white font-semibold hover:shadow-md hover:shadow-gray-400 hover:-translate-y-1 inline-block"
          href="#" // Consider making this a dynamic link or Next.js <Link>
        >
          Vul het formulier in
        </a>
      </div>
    </div>
  );
}

export default TestimonialTrustPilot;
