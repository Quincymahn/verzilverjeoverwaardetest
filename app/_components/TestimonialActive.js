import Image from "next/image";
import { useState, useEffect } from "react";

function TestimonialActive({ data, isEntering = false }) {
  const [showDetails, setShowDetails] = useState(!isEntering);

  // When entering, delay showing the details until the moveToActive animation completes
  useEffect(() => {
    let timer;
    if (isEntering) {
      setShowDetails(false);
      // 500ms delay before starting the fade-in (animation is 600ms)
      timer = setTimeout(() => {
        setShowDetails(true);
      }, 500);
    } else {
      setShowDetails(true);
    }

    return () => clearTimeout(timer);
  }, [isEntering]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <p className="text-text-100 text-md">{data.text}</p>
      </div>

      {/* Extra information with conditional opacity */}
      <div
        className={`transition-opacity duration-300 ${
          showDetails ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="border-b-1 mb-5 border-[#e2e2e2]"></div>
        <div className="flex justify-between">
          <div className="relative">
            <div className="rounded-xl -left-12 h-10 w-10 bg-primary-700 absolute p-1">
              <Image
                src="/img/hypotheek-offertes-favicon-white.png"
                width={50}
                height={50}
                alt="verzilverjeoverwaarde logo"
              />
            </div>
            <p className="text-sm">{data.name}</p>
            <p className="text-sm text-primary-700 font-semibold">
              {data.date}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(data.rating)].map((_, i) => (
              <Image
                key={i}
                src="/img/starrating.png"
                width={13}
                height={13}
                alt="Star rating"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialActive;
