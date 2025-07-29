// ./_components/AboutUsSection.js
"use client";

import { getStrapiMedia } from "@/app/_lib/data-services";
import Image from "next/image";

function AboutUsSection({ aboutUsComponent }) {
  const imageMediaObject = aboutUsComponent?.Image; // 'Image' must match the API ID in Strapi's AboutUsComponent
  const textContent = aboutUsComponent?.Text; // 'Text' must match the API ID in Strapi's AboutUsComponent

  const imageUrl = getStrapiMedia(imageMediaObject);

  const imageAlt =
    imageMediaObject?.data?.attributes?.alternativeText ||
    "Over ons sectie afbeelding"; // Fallback alt

  const finalImageUrl = imageUrl || "/img/default-team-photo.jpg";

  // Optional: Log the received prop and processed values
  // console.log("AboutUsSection - aboutUsImage prop:", JSON.stringify(aboutUsImage, null, 2));
  console.log("AboutUsSection - finalImageUrl:", finalImageUrl);

  return (
    <section className="py-12 mt-5 xl:mt-30 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square rounded-lg overflow-hidden shadow-lg">
              {finalImageUrl ? (
                <Image
                  src={finalImageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  // Adjust sizes based on your layout breakpoints for optimal image loading
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  priority={false} // Set true only if this is the LCP image for the initial viewport
                  onError={(e) =>
                    console.error(`Image failed to load: ${e.target.src}`)
                  }
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                  Afbeelding niet beschikbaar
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Verzilverjeoverwaarde {/* This heading could also be dynamic */}
            </h2>
            <div className="space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
              {textContent ? (
                textContent
                  .split("\n")
                  .map(
                    (paragraph, index) =>
                      paragraph.trim() && <p key={index}>{paragraph}</p>
                  )
              ) : (
                <>
                  <p>
                    Deskundig advies voor het verzilveren van uw overwaarde.
                    Ontdek de mogelijkheden die passen bij uw financiële
                    toekomst.
                  </p>
                  <p>
                    Wij staan klaar om u te begeleiden met persoonlijke service
                    en heldere uitleg.
                  </p>
                </>
              )}
            </div>
            <div className="mt-6 sm:mt-8">
              <a
                href="#"
                className="inline-block w-full sm:w-auto bg-primary-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 min-h-[44px] text-sm sm:text-base hover:shadow-gray-400 hover:shadow-md hover:-translate-y-1"
              >
                Vul het formulier in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
