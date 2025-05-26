import { useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) {
  const modalRef = useRef(null);

  // Define size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[90%] h-[90%]",
  };

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    // Add event listener when modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center">
        {/* Modal Backdrop */}
        <div className="fixed inset-0 bg-black opacity-50 transition-opacity" />

        {/* Modal Panel */}
        <div
          ref={modalRef}
          className={`relative z-10 inline-block transform rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle ${sizeClasses[size]}`}
        >
          <div className="bg-white  rounded-lg">
            <div className="flex items-start justify-between bg-linear-to-r rounded-tl-lg rounded-tr-lg from-primary-700 to bg-primary-800 px-4 pb-4 pt-5">
              <h3 className="text-xl font-bold leading-6 text-gray-200">
                {title}
              </h3>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="rounded-md text-gray-200 hover:text-gray-400 focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
