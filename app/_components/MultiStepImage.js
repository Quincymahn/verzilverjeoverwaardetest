"use client";

import Image from "next/image";

const StepImage = ({ currentStep }) => {
  // Define the images for each step
  const stepImages = {
    1: "/img/vectorimagemultistepform4.png",
    2: "/img/vectorimagemultistepform3.png",
    3: "/img/vectorimagemultistepform5.png",
    4: "/img/vectorimagemultistepform6.png",
  };

  // You can also define different sizes, alt text, or other properties per step
  const imageProps = {
    1: { width: 100, height: 100, alt: "Step 1: Kennismaking" },
    2: { width: 100, height: 100, alt: "Step 2: Jouw situatie" },
    3: { width: 100, height: 100, alt: "Step 3: Jouw inkomen" },
    4: { width: 100, height: 100, alt: "Step 4: Jouw gegevens" },
  };

  return (
    <div className="flex justify-center items-center -bottom-[1.4rem] relative">
      <Image
        src={stepImages[currentStep] || "/img/default-step-image.png"}
        width={imageProps[currentStep]?.width || 100}
        height={imageProps[currentStep]?.height || 100}
        alt={imageProps[currentStep]?.alt || `Step ${currentStep} image`}
        className="w-25 h-25"
      />
    </div>
  );
};

export default StepImage;
