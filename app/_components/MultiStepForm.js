"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useForm, FormProvider } from "react-hook-form";
import MultiStepProgressbar from "./MultiStepProgressbar";
import MultiStepTwo from "./MultiStepTwo";
import MultiStepThree from "./MultiStepThree";
import MultiStepFour from "./MultiStepFour";
import MultiStepThankYou from "./MultiStepThankYou";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

function MyMultiStepFormContent({
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
  const [isAddressFetching, setIsAddressFetching] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [hasFormStarted, setHasFormStarted] = useState(false);
  const [formStartTime, setFormStartTime] = useState(null);
  const [overlayActive, setOverlayActive] = useState(false);

  const formRef = useRef(null);

  const handleFormInteract = useCallback(() => {
    setOverlayActive(true);
  }, []);

  useEffect(() => {
    if (!overlayActive) return;
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setOverlayActive(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [overlayActive]);

  const methods = useForm({
    // Step 2: Initialize the form with the props from Main
    defaultValues: {
      marketValue,
      remainingMortgage,
      equityToWithdraw,
      purpose: "",
      incomeSource: "",
      yearlyIncome: 30000,
      hasPartner: "nee",
      partnerIncome: 30000,
      partnerBirthDate: "",
      gender: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthDate: "",
      postalCode: "",
      houseNumber: "",
      houseNumberAddition: "",
      street: "",
      city: "",
      comments: "",
    },
    mode: "onBlur",
  });

  const { watch } = methods;

  // Step 3: Add this useEffect to watch for form changes and update the parent state
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "marketValue") {
        setMarketValue(value.marketValue);
      } else if (name === "remainingMortgage") {
        setRemainingMortgage(value.remainingMortgage);
      } else if (name === "equityToWithdraw") {
        setEquityToWithdraw(value.equityToWithdraw);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setMarketValue, setRemainingMortgage, setEquityToWithdraw]);

  const getButtonText = useCallback((stepNumber) => {
    switch (stepNumber) {
      case 1:
        return "Bekijk uw mogelijkheden";
      case 2:
        return "Ga naar mijn gegevens";
      case 3:
        return "Vergelijk en bereken";
      default:
        return "Volgende stap";
    }
  }, []);

  const getSubmittingButtonText = useCallback((stepNumber) => {
    switch (stepNumber) {
      case 3:
        return "Vergelijken..."; // Shortened for better look
      default:
        return "Bezig...";
    }
  }, []);

  const getStepName = useCallback((stepNumber) => {
    switch (stepNumber) {
      case 1:
        return "Jouw Situatie";
      case 2:
        return "Jouw Gegevens";
      case 3:
        return "Contactinformatie";
      case 4:
        return "Bedankt";
      default:
        return "Unknown step";
    }
  }, []);

  const handleFirstInteraction = useCallback(() => {
    if (!hasFormStarted) {
      setHasFormStarted(true);
      const startTime = Date.now();
      setFormStartTime(startTime);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_start",
        form_name: "verzilver_je_overwaarde_form",
        step_number: 1,
        step_name: getStepName(1),
      });
    }
  }, [hasFormStarted, getStepName]);

  useEffect(() => {
    if (step > 0 && step <= 3) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_step_view",
        form_name: "verzilver_je_overwaarde_form",
        step_number: step,
        step_name: getStepName(step),
      });
    }
  }, [step, getStepName]);

  const changeStep = useCallback((newStep) => {
    setFadeState("fade-out");
    setIsChangingStep(true);
    setTimeout(() => {
      setStep(newStep);
      setFadeState("fade-in");
      setTimeout(() => {
        setIsChangingStep(false);
      }, 300);
    }, 300);
  }, []);

  const handleFieldInteraction = useCallback(
    (fieldName, currentStepNumber) => {
      if (hasFormStarted) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_field_interaction",
          form_name: "verzilver_je_overwaarde_form",
          step_number: currentStepNumber,
          step_name: getStepName(currentStepNumber),
          field_name: fieldName,
        });
      }
    },
    [hasFormStarted, getStepName]
  );

  const onSubmit = useCallback(
    async (data) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: `form_step_3_complete`,
        form_name: "verzilver_je_overwaarde_form",
        step_number: 3,
        step_name: getStepName(3),
      });

      setIsSubmitting(true);
      setSubmitError(null);

      if (!executeRecaptcha) {
        setSubmitError("reCAPTCHA not ready. Please try again.");
        setIsSubmitting(false);
        return;
      }

      let recaptchaToken;
      try {
        recaptchaToken = await executeRecaptcha("multistep_form_submit");
        if (!recaptchaToken) throw new Error("Failed to get reCAPTCHA token.");
      } catch (e) {
        setSubmitError("reCAPTCHA verification failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      try {
        const payload = { ...data, recaptchaToken };
        const response = await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorResult = await response
            .json()
            .catch(() => ({ message: `Server error ${response.status}` }));
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "form_submission_error",
            form_name: "verzilver_je_overwaarde_form",
            step_number: 3,
            error_message: errorResult.message || `Error ${response.status}`,
          });
          setSubmitError(errorResult.message || `Error ${response.status}`);
          setIsSubmitting(false);
          return;
        }

        const endTime = Date.now();
        const timeSpentInFormSec = Math.round(
          (endTime - (formStartTime || endTime)) / 1000
        );
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submission_success",
          form_name: "verzilver_je_overwaarde_form",
          time_spent_in_form: timeSpentInFormSec,
        });
        setIsSubmitted(true);
        changeStep(4);
      } catch (error) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "form_submission_error",
          form_name: "verzilver_je_overwaarde_form",
          step_number: 3,
          error_message: error.message || "Client-side submission error",
        });
        setSubmitError(error.message || "Failed to submit form.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [executeRecaptcha, formStartTime, changeStep, getStepName]
  );

  const nextStep = useCallback(async () => {
    if (isChangingStep || isSubmitting || methods.formState.isSubmitting)
      return;

    if (step >= 3) return;

    let isValid = false;
    let fieldsToValidate = [];

    if (step === 1) {
      fieldsToValidate = [
        "marketValue",
        "remainingMortgage",
        "equityToWithdraw",
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        "purpose",
        "incomeSource",
        "yearlyIncome",
        "postalCode",
        "houseNumber",
        "street",
        "city",
      ];
      if (methods.watch("hasPartner") === "ja") {
        fieldsToValidate.push("partnerIncome");
        fieldsToValidate.push("partnerBirthDate");
      }
    }

    isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: `form_step_${step}_complete`,
        form_name: "verzilver_je_overwaarde_form",
        step_number: step,
        step_name: getStepName(step),
      });
      changeStep(step + 1);
    } else {
      const errors = methods.formState.errors;
      const failedFields = Object.keys(errors).filter((fieldName) =>
        fieldsToValidate.includes(fieldName)
      );
      window.dataLayer.push({
        event: "form_validation_error",
        form_name: "verzilver_je_overwaarde_form",
        step_number: step,
        step_name: getStepName(step),
        failed_fields:
          failedFields.length > 0 ? failedFields : ["unknown_validation_error"],
      });
    }
  }, [step, isChangingStep, isSubmitting, methods, changeStep, getStepName]);

  const prevStep = () => {
    if (isChangingStep || step <= 1 || isSubmitted) return;
    changeStep(Math.max(step - 1, 1));
  };

  const resetForm = () => {
    methods.reset();
    setIsSubmitted(false);
    setSubmitError(null);
    setHasFormStarted(false);
    setFormStartTime(null);
    changeStep(1);
  };

  const stepImages = {
    1: "/img/vectorimagemultistepform4.png",
    2: "/img/vectorimagemultistepform3.png",
    3: "/img/vectorimagemultistepform6.png",
    4: "/img/vectorimagemultistepform5.png",
  };
  const stepAltTexts = {
    1: "Step 1: Jouw situatie",
    2: "Step 2: Jouw gegevens",
    3: "Step 3: Contactinformatie",
    4: "Bedankt voor je aanvraag",
  };
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
  const currentImageStyle = stepImageStyles[step] || stepImageStyles[1];

  //  *** THE PROBLEMATIC `useEffect` IS NOW DELETED ***

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <MultiStepTwo
            onFirstInteraction={handleFirstInteraction}
            onFieldInteraction={(fieldName) =>
              handleFieldInteraction(fieldName, 1)
            }
          />
        );
      case 2:
        return (
          <MultiStepThree
            onFieldInteraction={(fieldName) =>
              handleFieldInteraction(fieldName, 2)
            }
            onAddressLoadingChange={setIsAddressFetching}
          />
        );
      case 3:
        return (
          <MultiStepFour
            onFieldInteraction={(fieldName) =>
              handleFieldInteraction(fieldName, 3)
            }
          />
        );
      case 4:
        return <MultiStepThankYou resetForm={resetForm} />;
      default:
        return <div>Loading step...</div>;
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 pointer-events-none z-40 ${
          overlayActive ? "opacity-50" : "opacity-0"
        }`}
      />
      <FormProvider {...methods}>
        <form
          ref={formRef}
          onSubmit={methods.handleSubmit(onSubmit)}
          onFocusCapture={handleFormInteract}
          onClick={handleFormInteract}
          className="w-full xl:col-span-7 row-span-1 shadow-lg bg-white mt-10 m-auto rounded-xl relative z-50"
        >
          <div className="p-2">
            <MultiStepProgressbar currentStep={step} totalSteps={4} />
          </div>
          <div className="pb-6 relative">
            <div className="bg-gray-200/50 z-10 pt-3 xl:pt-6 border-gray-300 mx-auto relative">
              <svg width="0" height="0">
                <defs>
                  <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
                    <path d="M 0 0 L 0 1 L 1 1 L 0.35 0 Z" />
                  </clipPath>
                </defs>
              </svg>
              <div
                className="absolute -left-3.5 rotate-35 top-24 lg:top-10 bg-green-700 h-5 w-5"
                style={{ clipPath: "url(#my-clip-path)" }}
              ></div>
              <div className="text-white h-7 bg-accent-50 absolute top-20 -left-4.5 z-20 lg:top-6 px-4">
                <p>Klaar in 2 minuten!</p>
              </div>
              <p className="text-center text-lg xl:text-xl font-bold mb-2">
                {step === 4
                  ? "Bedankt voor je aanvraag!"
                  : "Bereken uw hypotheek mogelijkheden"}
              </p>
              <p className="text-center text-gray-500 text-xs xl:text-sm px-10 -mb-6">
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
                <div className="text-red-600 text-center font-medium mt-2">
                  {submitError}
                </div>
              )}
              {step < 4 && (
                <div className="flex xl:flex-row xl:gap-0 flex-col-reverse gap-4 items-center w-full pt-7">
                  {step > 1 && (
                    <button
                      type="button"
                      className="text-xs xl:text-sm disabled:opacity-50 cursor-pointer"
                      onClick={prevStep}
                      disabled={
                        isChangingStep ||
                        isSubmitting ||
                        methods.formState.isSubmitting
                      }
                    >
                      Ga Terug
                    </button>
                  )}
                  {step < 3 && (
                    <button
                      type="button"
                      className={`bg-accent-50 text-md xl:text-lg font-semibold text-white py-2 px-8 rounded-full flex mx-auto gap-3 cursor-pointer hover:bg-accent-50/70 transition-all duration-300 disabled:opacity-50`}
                      onClick={nextStep}
                      disabled={
                        isChangingStep ||
                        isSubmitting ||
                        methods.formState.isSubmitting
                      }
                    >
                      {getButtonText(step)}{" "}
                      <ArrowLongRightIcon className="w-5" />
                    </button>
                  )}
                  {step === 3 && (
                    <button
                      type="submit"
                      className="bg-accent-50 text-lg font-semibold text-white py-1 px-6 rounded-full flex mx-auto gap-3 cursor-pointer disabled:opacity-50 hover:bg-accent-50/70 transition-all duration-300"
                      disabled={
                        isChangingStep ||
                        isSubmitting ||
                        methods.formState.isSubmitting ||
                        isAddressFetching
                      }
                    >
                      {isSubmitting || methods.formState.isSubmitting
                        ? getSubmittingButtonText(step)
                        : getButtonText(step)}
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
            .grecaptcha-badge {
              visibility: hidden !important;
            }
          `}</style>
        </form>
      </FormProvider>
    </>
  );
}

export default function MultiStepFormWrapper(props) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;
  if (!siteKey) {
    console.error(
      "reCAPTCHA v3 Site Key is not defined. Make sure NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY is in your .env.local"
    );
    return <div>reCAPTCHA configuration error. Form cannot be submitted.</div>;
  }
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <MyMultiStepFormContent {...props} />
    </GoogleReCaptchaProvider>
  );
}
