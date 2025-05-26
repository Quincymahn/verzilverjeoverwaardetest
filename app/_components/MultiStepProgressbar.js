const MultiStepProgressbar = ({ currentStep, totalSteps = 4 }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="rounded-full bg-gray-100 h-2 w-full relative overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-primary-700 to-primary-950"
        style={{
          clipPath: isLastStep
            ? `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
            : `polygon(0 0, ${progressPercentage}% 0, ${Math.min(
                progressPercentage - 1,
                100
              )}% 100%, 0 100%)`,
          transition: "clip-path 500ms ease-in-out",
        }}
      />
    </div>
  );
};

export default MultiStepProgressbar;
