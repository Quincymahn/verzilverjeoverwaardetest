// ./_components/InfoList.js

import Image from "next/image";
import { getStrapiMedia } from "@/app/_lib/data-services"; // Ensure this path is correct

function InfoList({ infoOneData, infoTwoData, infoThreeData }) {
  // Get image URLs using the helper, providing a fallback for each
  // If infoOneData.Image exists and is populated, getStrapiMedia will extract its URL
  const imageUrl1 =
    getStrapiMedia(infoOneData?.Image) || "/img/infolistvectorimage.png"; // A generic placeholder
  const imageUrl2 =
    getStrapiMedia(infoTwoData?.Image) || "/img/infolistvectorimage2.png";
  const imageUrl3 =
    getStrapiMedia(infoThreeData?.Image) || "/img/infolistvectorimage3.png";

  // For debugging:
  // console.log("InfoList - infoOneData.Image:", JSON.stringify(infoOneData?.Image, null, 2));
  // console.log("InfoList - imageUrl1:", imageUrl1);

  const infoItems = [
    {
      id: 1,
      title: infoOneData?.Heading || "Maximale hypotheek berekenen",
      description:
        infoOneData?.Text ||
        "Bereken jouw maximale hypotheek inclusief de overwaarde...",
      image: imageUrl1, // Use the processed URL
      imagePosition: "left",
    },
    {
      id: 2,
      title: infoTwoData?.Heading || "Bouwdepot",
      description:
        infoTwoData?.Text ||
        "Met een bouwdepot reserveer je binnen je hypotheek een flexibel potje...",
      image: imageUrl2, // Use the processed URL
      imagePosition: "right",
    },
    {
      id: 3,
      title: infoThreeData?.Heading || "Overwaarde verzilveren",
      description:
        infoThreeData?.Text || // Corrected from your original (was infoThreeData?.Heading)
        "Zet de overwaarde van je huis om in beschikbaar kapitaal...",
      image: imageUrl3, // Use the processed URL
      imagePosition: "left",
    },
  ];

  // Helper function to safely render Next/Image
  const renderNextImage = (
    src,
    alt,
    className,
    width,
    height,
    priority = false
  ) => {
    if (src && typeof src === "string") {
      return (
        <Image
          className={className}
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority={priority} // Useful for LCP images
        />
      );
    }
    // Render a placeholder if src is invalid
    return (
      <div
        className={`${className} bg-gray-200 flex items-center justify-center text-gray-500`}
        style={{ width: `${width}px`, height: `${height}px` }} // Apply dimensions to placeholder
      >
        No Image
      </div>
    );
  };

  return (
    <div className="mt-8 md:mt-15 xl:mt-[8rem] max-w-7xl mx-auto px-4 md:px-0">
      {/* Header */}
      <div>
        <h2 className="text-center font-semibold text-xl md:text-2xl xl:text-4xl mb-3">
          Kies jouw soort hypotheek!
        </h2>
        <div className="border-1 border-primary-700 w-[7rem] rounded-md mx-auto"></div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden mt-8 space-y-6">
        {infoItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex justify-center p-4 bg-gray-50">
              {renderNextImage(
                item.image,
                `${item.title} illustratie`,
                "w-32 h-32 object-contain",
                128,
                128,
                item.id === 1 // Example priority for the first item
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center rounded-full w-8 h-8 bg-primary-700 flex-shrink-0">
                  <p className="text-white font-semibold text-sm">{item.id}</p>
                </div>
                <h3 className="text-primary-700 font-semibold text-base leading-tight">
                  {item.title}
                </h3>
              </div>
              <p className="text-text-200 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {infoItems.map((item, index) => {
          const isFirstItem = index === 0;
          const marginTop = isFirstItem ? "mt-10 xl:mt-[5rem]" : "mt-[5rem]";

          if (item.imagePosition === "left") {
            return (
              <div key={item.id} className={`grid grid-cols-4 ${marginTop}`}>
                <div className="col-span-1 flex justify-start">
                  {renderNextImage(
                    item.image,
                    `${item.title} plaatje`,
                    "w-60", // Adjust if needed
                    200, // Match your desired desktop image width
                    200 // Match your desired desktop image height
                  )}
                </div>
                <div className="p-2 col-span-2 border border-grey-50 rounded-lg flex flex-col h-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-full w-10 h-10 bg-grey-50">
                      <p className="text-primary-700 font-semibold text-lg">
                        {item.id}
                      </p>
                    </div>
                    <h2 className="text-primary-700 font-semibold text-lg">
                      {item.title}
                    </h2>
                  </div>
                  <p className="mt-auto text-lg text-text-200">
                    {item.description}
                  </p>
                </div>
                <div className="col-span-1 flex justify-end"></div>
              </div>
            );
          } else {
            // imagePosition === "right"
            return (
              <div key={item.id} className={`grid grid-cols-4 ${marginTop}`}>
                <div className="col-span-1"></div>
                <div className="p-2 col-span-2 border border-grey-50 rounded-lg flex flex-col h-full shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-full w-10 h-10 bg-grey-50">
                      <p className="text-primary-700 font-semibold text-lg">
                        {item.id}
                      </p>
                    </div>
                    <h2 className="text-primary-700 font-semibold text-lg">
                      {item.title}
                    </h2>
                  </div>
                  <p className="mt-auto text-lg text-text-200">
                    {item.description}
                  </p>
                </div>
                <div className="col-span-1 flex justify-start ml-20">
                  {" "}
                  {/* Consider Tailwind's `justify-self-end` on parent or similar for better alignment than ml-20 */}
                  {renderNextImage(
                    item.image,
                    `${item.title} plaatje`,
                    "w-35", // This class 'w-35' might not exist in default Tailwind; use w-32, w-36, or define it.
                    200, // Or your desired width
                    200 // Or your desired height
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default InfoList;
