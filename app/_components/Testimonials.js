"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import TestimonialActive from "./TestimonialActive";
import TestimonialNotActive from "./TestimonialNotActive";
import TestimonialSlider from "./TestimonialSlider";
import TestimonialTrustPilot from "./TestimonialTrustPilot";

// Helper function to format Strapi data into the structure your components expect
const formatTestimonialData = (strapiData, idOffset = 0) => {
  if (!strapiData) return null;
  return {
    id: strapiData.id || idOffset, // Use Strapi ID or an offset for uniqueness
    text: strapiData.Text || "Default testimonial text.",
    name: strapiData.Name || "Anonymous",
    date: strapiData.Date || "Recent", // You might want to format the date from Strapi
    rating: strapiData.Stars || 5, // Assuming 'Stars' is the field name for rating
  };
};

// Animation timing constants (in ms)
const ANIMATION_DURATION = {
  ACTIVE_FADE_OUT: 400,
  NEXT_MOVE: 600,
  HIDDEN_FADE_IN: 400,
};

// Position states
const POSITION = {
  ACTIVE: "active",
  NEXT: "next",
  HIDDEN: "hidden",
  EXITING: "exiting",
  ENTERING_ACTIVE: "entering-active",
  ENTERING_NEXT: "entering-next",
};

// Simple mobile testimonial component
function MobileTestimonials({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <>
      <div className="px-2">
        <div className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-sm">
          <div className="mb-4">
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={
                    i < currentTestimonial.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              "{currentTestimonial.text}"
            </p>
            <div className="text-right">
              <p className="font-semibold text-gray-900 text-sm">
                {currentTestimonial.name}
              </p>
              <p className="text-gray-500 text-xs">{currentTestimonial.date}</p>
            </div>
          </div>

          {/* Simple navigation */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              ←
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 py-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            {/* Trustpilot Logo and Rating */}
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-green-600">
                  Trustpilot
                </span>
                <div className="flex text-green-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Klanten geven ons een 4.4 uit 5
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-gray-300"></div>

            {/* Stats */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-gray-600">Beveelt ons aan</p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center md:text-left">
              <a
                href="#"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
              >
                Kom met ons in contact
                <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DesktopTestimonials({ testimonials }) {
  // Track testimonials by their position
  const [testimonialPositions, setTestimonialPositions] = useState({
    [POSITION.ACTIVE]: 0,
    [POSITION.NEXT]: 1,
    [POSITION.HIDDEN]: 2,
    [POSITION.EXITING]: null,
    [POSITION.ENTERING_ACTIVE]: null,
    [POSITION.ENTERING_NEXT]: null,
  });

  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimers = useRef([]);

  // Clear any pending animation timers on unmount
  useEffect(() => {
    return () => {
      animationTimers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  if (!testimonials || testimonials.length < 3) {
    console.warn(
      "DesktopTestimonials requires at least 3 testimonials. Rendering mobile or a message"
    );
    return <MobileTestimonials testimonials={testimonials} />;
  }

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    animationTimers.current.forEach((timer) => clearTimeout(timer));
    animationTimers.current = [];

    const currentActive = testimonialPositions[POSITION.ACTIVE];
    const currentNext = testimonialPositions[POSITION.NEXT];
    const currentHidden = testimonialPositions[POSITION.HIDDEN];

    setTestimonialPositions((prev) => ({
      ...prev,
      [POSITION.EXITING]: currentActive,
      [POSITION.ACTIVE]: null,
    }));

    const timer1 = setTimeout(() => {
      setTestimonialPositions((prev) => ({
        ...prev,
        [POSITION.ENTERING_ACTIVE]: currentNext,
        [POSITION.NEXT]: null,
        [POSITION.EXITING]: null,
      }));
    }, ANIMATION_DURATION.ACTIVE_FADE_OUT);
    animationTimers.current.push(timer1);

    const timer2 = setTimeout(() => {
      setTestimonialPositions((prev) => ({
        ...prev,
        [POSITION.ENTERING_NEXT]: currentHidden,
        [POSITION.HIDDEN]: currentActive,
      }));
    }, ANIMATION_DURATION.ACTIVE_FADE_OUT + ANIMATION_DURATION.NEXT_MOVE);
    animationTimers.current.push(timer2);

    const timer3 = setTimeout(() => {
      setTestimonialPositions({
        [POSITION.ACTIVE]: currentNext,
        [POSITION.NEXT]: currentHidden,
        [POSITION.HIDDEN]: currentActive,
        [POSITION.EXITING]: null,
        [POSITION.ENTERING_ACTIVE]: null,
        [POSITION.ENTERING_NEXT]: null,
      });
      setIsAnimating(false);
    }, ANIMATION_DURATION.ACTIVE_FADE_OUT + ANIMATION_DURATION.NEXT_MOVE + ANIMATION_DURATION.HIDDEN_FADE_IN);
    animationTimers.current.push(timer3);
  };

  const getPositionClasses = (position) => {
    const baseClasses = "absolute p-7 w-[16rem] h-[18rem]";

    switch (position) {
      case POSITION.ACTIVE:
        return `${baseClasses} rounded-[5%] opacity-100 z-10 shadow-[0_4px_10px_7px_rgba(147,147,147,25%)] bg-white left-0`;
      case POSITION.NEXT:
        return `${baseClasses} !w-[15rem] !h-[15rem] opacity-100 z-0 bg-grey-100 left-[16rem]`;
      case POSITION.HIDDEN:
        return `${baseClasses} opacity-0 left-[32rem]`;
      case POSITION.EXITING:
        return `${baseClasses} animate-fadeOutActive`;
      case POSITION.ENTERING_ACTIVE:
        return `${baseClasses} animate-moveToActive`;
      case POSITION.ENTERING_NEXT:
        return `${baseClasses} animate-fadeInNext`;
      default:
        return `${baseClasses} opacity-0 left-[32rem]`;
    }
  };

  return (
    <div className="relative testimonial-container mx-auto">
      <div className="flex flex-row justify-center items-center mt-15 min-h-[18rem]">
        <div className="w-[15rem] h-[15rem] bg-grey-100 p-6">
          <TestimonialTrustPilot />
        </div>
        <div className="relative w-[16rem] h-[18rem] items-center flex">
          {Object.entries(testimonialPositions).map(([position, index]) => {
            if (index === null || index >= testimonials.length) return null; // Check index bounds

            const data = testimonials[index]; // Use the testimonials prop
            if (!data) return null; // Extra safety if data for an index is missing

            const classes = getPositionClasses(position);

            return (
              <div key={`${position}-${data.id || index}`} className={classes}>
                {" "}
                {/* Use data.id for key */}
                {position === POSITION.ACTIVE ||
                position === POSITION.EXITING ? (
                  <TestimonialActive data={data} isEntering={false} />
                ) : position === POSITION.ENTERING_ACTIVE ? (
                  <TestimonialActive data={data} isEntering={true} />
                ) : (
                  <TestimonialNotActive data={data} />
                )}
              </div>
            );
          })}
        </div>
        <div className="w-[15rem] h-[15rem] opacity-0">
          {" "}
          {/* Placeholder for layout */}
          <div className="p-9">
            <p>Placeholder</p>
          </div>
        </div>
      </div>
      <TestimonialSlider
        onNext={handleNext}
        activeIndex={testimonialPositions[POSITION.ACTIVE]}
        total={testimonials.length} // Use length of the testimonials prop
        isAnimating={isAnimating}
      />
    </div>
  );
}

function Testimonials({
  testimonial1Data,
  testimonial2Data,
  testimonial3Data,
}) {
  const allTestimonials = [
    formatTestimonialData(testimonial1Data, 1),
    formatTestimonialData(testimonial2Data, 2),
    formatTestimonialData(testimonial3Data, 3),
  ].filter(Boolean);

  if (allTestimonials.length === 0) {
    return <div className="text-center p-4">No testimonials to display.</div>;
  }

  return (
    <>
      <div className="block md:hidden">
        <MobileTestimonials testimonials={allTestimonials} />
      </div>
      <div className="hidden md:block">
        <DesktopTestimonials testimonials={allTestimonials} />
      </div>
    </>
  );
}

export default Testimonials;
