import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

function TestimonialSlider({ onNext, activeIndex, total = 3, isAnimating }) {
  return (
    <div className="flex gap-15 absolute right-85 -bottom-4 items-center">
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              activeIndex === i
                ? "bg-primary-700"
                : "bg-none border border-gray-700"
            }`}
          />
        ))}
      </div>
      <div
        className={`h-10 w-10 bg-grey-50 group cursor-pointer ${
          isAnimating ? "pointer-events-none opacity-70" : ""
        }`}
        onClick={onNext}
      >
        <ArrowLongRightIcon className="h-14 w-12 transition-all duration-300 -ml-6 group-hover:-ml-4 -mt-2 text-primary-700" />
      </div>
    </div>
  );
}

export default TestimonialSlider;
