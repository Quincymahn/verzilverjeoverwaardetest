"use client";

import { useState, useRef, useEffect } from "react";
import TestimonialActive from "./TestimonialActive";
import TestimonialNotActive from "./TestimonialNotActive";
import TestimonialSlider from "./TestimonialSlider";
import TestimonialTrustPilot from "./TestimonialTrustPilot";

// Example testimonial data (3 testimonials)
const testimonialsData = [
  {
    id: 1,
    text: "Na de eerste keer geweldig te zijn geholpen hoefden we niet te twijfelen wie voor ons de overwaarde mocht begeleiden. En het klopte de service is top en zeker voor iedereen aan te raden.",
    name: "Tino Kooren",
    date: "14-02-2025",
    rating: 5,
  },
  {
    id: 2,
    text: "van begin tot het eind goed geholpen met snelle reacties op mijn vragen via mail, een goede uitleg over alles gekregen en het voelde allemaal heel vertrouwd.",
    name: "Karolina Kool",
    date: "18-04-2025",
    rating: 4,
  },
  {
    id: 3,
    text: "mijn adviseur nam alle tijd en hielp mij met alle dingen die ik niet alleen voor elkaar kreeg hij is erg klant vriendelijk en dat helpt goed met zo een grote beslissing.",
    name: "Tein Reiming",
    date: "03-09-2024",
    rating: 5,
  },
];

// Animation timing constants (in ms)
const ANIMATION_DURATION = {
  ACTIVE_FADE_OUT: 400, // Active testimonial fades out
  NEXT_MOVE: 600, // Next testimonial moves to active position
  HIDDEN_FADE_IN: 400, // Hidden testimonial fades in to next position
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

function Testimonials() {
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

  const handleNext = () => {
    if (isAnimating) return; // Prevent animation overlap
    setIsAnimating(true);

    // Clear any existing timers
    animationTimers.current.forEach((timer) => clearTimeout(timer));
    animationTimers.current = [];

    // Store the current positions for reference
    const currentActive = testimonialPositions[POSITION.ACTIVE];
    const currentNext = testimonialPositions[POSITION.NEXT];
    const currentHidden = testimonialPositions[POSITION.HIDDEN];

    // Phase 1: Active testimonial exits
    setTestimonialPositions((prev) => ({
      ...prev,
      [POSITION.EXITING]: currentActive,
      [POSITION.ACTIVE]: null,
    }));

    // Phase 2: Next testimonial moves to active position
    const timer1 = setTimeout(() => {
      setTestimonialPositions((prev) => ({
        ...prev,
        [POSITION.ENTERING_ACTIVE]: currentNext,
        [POSITION.NEXT]: null,
        [POSITION.EXITING]: null,
      }));
    }, ANIMATION_DURATION.ACTIVE_FADE_OUT);
    animationTimers.current.push(timer1);

    // Phase 3: Hidden testimonial becomes next testimonial
    const timer2 = setTimeout(() => {
      setTestimonialPositions((prev) => ({
        ...prev,
        [POSITION.ENTERING_NEXT]: currentHidden,
        [POSITION.HIDDEN]: currentActive, // The exiting testimonial becomes hidden
      }));
    }, ANIMATION_DURATION.ACTIVE_FADE_OUT + ANIMATION_DURATION.NEXT_MOVE);
    animationTimers.current.push(timer2);

    // Phase 4: Complete animation and reset states
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

  // Helper function to get appropriate classes based on the testimonial state
  const getPositionClasses = (position) => {
    const baseClasses = "absolute p-7 w-[16rem] h-[18rem]";

    switch (position) {
      case POSITION.ACTIVE:
        return `${baseClasses} rounded-[5%] opacity-100 z-10 shadow-[0_4px_10px_7px_rgba(147,147,147,25%)] bg-white left-0`;
      case POSITION.NEXT:
        return `${baseClasses} !w-[15rem] !h-[15rem] opacity-100 z-0 bg-grey-100 left-[16rem]`;
      case POSITION.HIDDEN:
        return `${baseClasses} opacity-0  left-[32rem]`;
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
        {/* Left static container (TrustPilot) */}
        <div className="w-[15rem] h-[15rem] bg-grey-100 p-9">
          <TestimonialTrustPilot />
        </div>

        {/* Testimonial containers */}
        <div className="relative w-[16rem] h-[18rem] items-center flex">
          {/* Render all testimonials with position-based styling */}
          {Object.entries(testimonialPositions).map(([position, index]) => {
            if (index === null) return null;

            const data = testimonialsData[index];
            const classes = getPositionClasses(position);

            return (
              <div key={`${position}-${index}`} className={classes}>
                {position === POSITION.ACTIVE ||
                position === POSITION.EXITING ? (
                  <TestimonialActive data={data} isEntering={false} />
                ) : position === POSITION.ENTERING_ACTIVE ? (
                  <TestimonialActive data={data} isEntering={true} />
                ) : (
                  <div className="">
                    <TestimonialNotActive data={data} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Placeholder for layout consistency */}
        <div className="w-[15rem] h-[15rem] opacity-0">
          <div className="p-9">
            <p>Placeholder</p>
          </div>
        </div>
      </div>

      {/* Slider navigation */}
      <TestimonialSlider
        onNext={handleNext}
        activeIndex={testimonialPositions[POSITION.ACTIVE]}
        total={testimonialsData.length}
        isAnimating={isAnimating}
      />
    </div>
  );
}

export default Testimonials;
