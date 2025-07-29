// ./app/page.js

import { getStrapiURL } from "@/app/_lib/data-services";
import AboutUsSection from "./_components/AboutUsSection";
import InfoList from "./_components/InfoList";
import TimelineSection from "./_components/TimelineSection";
import Main from "./_components/Main";
import TestimonialsSection from "./_components/TestimonialsSection";
import CounterSection from "./_components/CounterSection";
import CtaFooterSection from "./_components/CtaFooterSection";
import BankCtaSection from "./_components/BankCtaSection";
import Footer from "./_components/Footer";
import Copyright from "./_components/Copyright";
// Removed Accordion import if not used

async function getPageData() {
  // Define Strapi API IDs for components and their nested fields.
  // Using "[populate]=*" aims to fetch all direct fields within each component, including media.
  // Adjust field names (e.g., 'Image', 'Icon') if they differ in your Strapi components.
  const populateParams = [
    "populate[InfoList1][populate]=*", // Populate InfoList1 component and its fields (e.g., Image)
    "populate[InfoList2][populate]=*", // Populate InfoList2 component and its fields
    "populate[InfoList3][populate]=*", // Populate InfoList3 component and its fields
    "populate[WhyUsSlide1][populate]=*", // Populate WhyUsSlide1 component and its fields (e.g., Icon)
    "populate[WhyUsSlide2][populate]=*",
    "populate[WhyUsSlide3][populate]=*",
    "populate[AboutUsComponent][populate]=*",
    "populate[Testimonials][populate]=*",
  ];
  const populateQueryString = populateParams.join("&");
  const endpoint = `/api/home-page?${populateQueryString}`;
  const strapiApiUrl = getStrapiURL(endpoint);

  try {
    const res = await fetch(strapiApiUrl, { next: { revalidate: 60 } });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(
        `Failed to fetch data from Strapi: ${res.status} ${res.statusText}. URL: ${strapiApiUrl}. Response: ${errorBody}`
      );
    }
    const jsonData = await res.json();

    // Crucial: Inspect this log in your server console to verify data structure,
    // especially for nested media within InfoListX and WhyUsSlideX.
    console.log("jsonData from Strapi:", JSON.stringify(jsonData, null, 2));

    if (jsonData.data?.attributes) {
      return jsonData.data.attributes;
    } else if (jsonData.data) {
      console.warn(
        "getPageData: jsonData.data.attributes not found, returning jsonData.data. Check if 'home-page' is a Single Type."
      );
      return jsonData.data;
    } else {
      console.error(
        "getPageData: Strapi response format unexpected, jsonData.data is missing.",
        jsonData
      );
      return null;
    }
  } catch (error) {
    console.error("Error in getPageData:", error);
    return null;
  }
}

export default async function Home() {
  const pageAttributes = await getPageData();

  if (!pageAttributes) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>
          Sorry, we couldn't load the page content at the moment. Please try
          again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <Main />
      <section className="mx-auto">
        <TestimonialsSection
          testimonialsComponentData={pageAttributes.Testimonials}
        />
        {/* <Accordion /> */}
        <AboutUsSection aboutUsComponent={pageAttributes.AboutUsComponent} />
        <CounterSection />
        <TimelineSection
          slideOneData={pageAttributes.WhyUsSlide1}
          slideTwoData={pageAttributes.WhyUsSlide2}
          slideThreeData={pageAttributes.WhyUsSlide3}
        />
        <InfoList
          infoOneData={pageAttributes.InfoList1}
          infoTwoData={pageAttributes.InfoList2}
          infoThreeData={pageAttributes.InfoList3}
        />
        <CtaFooterSection />
        <BankCtaSection />
      </section>
      <Footer />
      <Copyright />
    </>
  );
}
