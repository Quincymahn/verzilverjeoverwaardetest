"use client";

import { useState, useEffect } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import MultiStepProgressbar from "./MultiStepProgressbar";
import MultiStepOne from "./MultiStepOne";
import MultiStepTwo from "./MultiStepTwo";
import MultiStepThree from "./MultiStepThree";
import MultiStepFour from "./MultiStepFour";
import MultiStepThankYou from "./MultiStepThankYou";

function MultiStepForm({
  marketValue,
  remainingMortgage,
  equityToWithdraw,
  setMarketValue,
  setRemainingMortgage,
  setEquityToWithdraw,
}) {
  const [step, setStep] = useState(1);
  const [isChangingStep, setIsChangingStep] = useState(false);
  const [fadeState, setFadeState] = useState("fade-in");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Setup React Hook Form
  const methods = useForm({
    defaultValues: {
      marketValue,
      remainingMortgage,
      equityToWithdraw,
      purpose: "",
      incomeSource: "",
      yearlyIncome: 30000,
      hasPartner: false,
      partnerIncome: 30000,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      postalCode: "",
      houseNumber: "",
      comments: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  // Handle step transitions with fade effect
  const changeStep = (newStep) => {
    // Start fade out
    setFadeState("fade-out");
    setIsChangingStep(true);

    // After fade out completes, change step and fade in
    setTimeout(() => {
      setStep(newStep);
      setFadeState("fade-in");

      // End changing state after fade in animation time
      setTimeout(() => {
        setIsChangingStep(false);
      }, 300);
    }, 300); // Match this with your CSS transition duration
  };

  const nextStep = () => {
    if (isChangingStep) return;

    // For step 2 and 3, validate the form before proceeding
    if (step === 2 || step === 3) {
      methods.trigger().then((isValid) => {
        if (isValid) {
          if (step === 3) {
            // Submit form when going from step 3 to thank you step
            methods.handleSubmit(onSubmit)();
          } else {
            changeStep(step + 1);
          }
        }
      });
    } else {
      changeStep(step + 1);
    }
  };

  const prevStep = () => {
    if (isChangingStep || step <= 1 || isSubmitted) return;
    changeStep(Math.max(step - 1, 1));
  };

  const resetForm = () => {
    methods.reset();
    setIsSubmitted(false);
    setSubmitError(null);
    changeStep(1);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Log the data being sent for debugging
      console.log("Sending form data:", data);

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", response.status, errorText);
        throw new Error(
          `Error ${response.status}: ${
            errorText || response.statusText || "Unknown error"
          }`
        );
      }

      // Now try to parse the JSON
      const result = await response.json();
      console.log("Form submitted successfully:", result);
      setIsSubmitted(true);
      changeStep(4); // Go to thank you step (step 4)
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError(
        error.message || "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define images for each step
  const stepImages = {
    1: "/img/vectorimagemultistepform4.png",
    2: "/img/vectorimagemultistepform3.png",
    3: "/img/vectorimagemultistepform6.png",
    4: "/img/vectorimagemultistepform5.png",
  };

  // Define alt text for each step
  const stepAltTexts = {
    1: "Step 1: Kennismaking",
    2: "Step 2: Jouw situatie",
    3: "Step 3: Jouw gegevens",
    4: "Bedankt voor je aanvraag",
  };

  // Define dynamic styling for each step
  const stepImageStyles = {
    1: {
      containerClass: "-bottom-[1.8rem]",
      imageClass: "w-25 h-25",
      width: 100,
      height: 100,
    },
    2: {
      containerClass: "-bottom-[1.4rem]",
      imageClass: "w-25 h-25",
      width: 112,
      height: 112,
    },
    3: {
      containerClass: "-bottom-[1.85rem]",
      imageClass: "w-25 h-25",
      width: 128,
      height: 96,
    },
    4: {
      containerClass: "-bottom-[1.85rem]",
      imageClass: "w-25 h-25",
      width: 100,
      height: 100,
    },
  };

  // Get current step styling or fallback to default
  const currentImageStyle = stepImageStyles[step] || stepImageStyles[1];

  // Update the external state when the form values change
  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === "marketValue") setMarketValue(value.marketValue);
      if (name === "remainingMortgage")
        setRemainingMortgage(value.remainingMortgage);
      if (name === "equityToWithdraw")
        setEquityToWithdraw(value.equityToWithdraw);
    });

    return () => subscription.unsubscribe();
  }, [methods, setMarketValue, setRemainingMortgage, setEquityToWithdraw]);

  // Function to render the current step component
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <MultiStepTwo
            marketValue={methods.watch("marketValue")}
            remainingMortgage={methods.watch("remainingMortgage")}
            equityToWithdraw={methods.watch("equityToWithdraw")}
            setMarketValue={(value) => methods.setValue("marketValue", value)}
            setRemainingMortgage={(value) =>
              methods.setValue("remainingMortgage", value)
            }
            setEquityToWithdraw={(value) =>
              methods.setValue("equityToWithdraw", value)
            }
          />
        );
      case 2:
        return (
          <MultiStepThree
            register={methods.register}
            setValue={methods.setValue}
            watch={methods.watch}
            formState={methods.formState}
          />
        );
      case 3:
        return (
          <MultiStepFour
            register={methods.register}
            formState={methods.formState}
          />
        );
      case 4:
        return <MultiStepThankYou resetForm={resetForm} />;
      default:
        return <MultiStepOne />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full col-span-7 shadow-lg bg-white mt-10 m-auto rounded-xl relative z-10"
      >
        <div className="p-2">
          <MultiStepProgressbar currentStep={step} totalSteps={4} />
        </div>

        <div className="pb-6 relative">
          <div className="bg-gray-200/50 pt-6 border-gray-300 mx-auto relative">
            <p className="text-center text-xl font-bold mb-2">
              {step === 4
                ? "Bedankt voor je aanvraag!"
                : "Bereken uw hypotheek mogelijkheden"}
            </p>
            <p className="text-center text-gray-500 text-sm">
              {step === 4
                ? ""
                : "Start met een snelle kennismaking en krijg direct inzicht in uw opties"}
            </p>
            <div
              className={`flex justify-center items-center relative ${currentImageStyle.containerClass} transition-opacity duration-300 ${fadeState}`}
            >
              <Image
                src={stepImages[step] || "/img/vectorimagemultistepform3.png"}
                width={currentImageStyle.width}
                height={currentImageStyle.height}
                alt={stepAltTexts[step] || `Step ${step} image`}
                className={currentImageStyle.imageClass}
              />
            </div>
          </div>

          <div
            className={`pt-10 w-[80%] flex flex-col gap-4 mx-auto transition-opacity duration-300 ${fadeState}`}
          >
            {renderStep()}

            {submitError && (
              <div className="text-red-600 text-center font-medium">
                {submitError}
              </div>
            )}

            {step < 4 && (
              <div className="flex items-center w-full pt-7">
                <button
                  type="button"
                  className="text-sm disabled:opacity-50 cursor-pointer"
                  onClick={prevStep}
                  disabled={step === 1 || isChangingStep || isSubmitting}
                >
                  Ga Terug
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    className={`bg-accent-50 text-lg font-semibold text-white py-1 px-6 rounded-full flex mx-auto gap-3 cursor-pointer hover:bg-accent-50/70 transition-all duration-300 ${
                      isChangingStep || isSubmitting ? "opacity-50" : ""
                    }`}
                    onClick={nextStep}
                    disabled={isChangingStep || isSubmitting}
                  >
                    Volgende stap <ArrowLongRightIcon className="w-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-accent-50 text-lg font-semibold text-white py-1 px-6 rounded-full flex mx-auto gap-3 cursor-pointer disabled:opacity-50 hover:bg-accent-50/70 transition-all duration-300"
                    onClick={nextStep}
                    disabled={isChangingStep || isSubmitting}
                  >
                    {isSubmitting
                      ? "Vergelijk en bereken..."
                      : "Vergelijk en bereken"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <style jsx global>{`
          .fade-in {
            opacity: 1;
          }
          .fade-out {
            opacity: 0;
          }

          .transition-opacity {
            transition-property: opacity;
          }
          .duration-300 {
            transition-duration: 300ms;
          }
        `}</style>
      </form>
    </FormProvider>
  );
}

export default MultiStepForm;
