import { CheckCircleIcon } from "@heroicons/react/24/solid";

function MultiStepThankYou({ resetForm }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <CheckCircleIcon className="w-16 h-16 text-green-600 mb-4" />
      <h2 className="text-2xl font-bold mb-3">Bedankt voor je aanvraag!</h2>
      <p className="text-center text-gray-700 mb-6">
        We hebben je gegevens ontvangen en opgeslagen in onze database. We nemen
        spoedig contact met je op.
      </p>
      <button
        type="button"
        onClick={resetForm}
        className="bg-accent-50 text-lg font-semibold text-white py-1 px-6 rounded-full"
      >
        Nieuwe aanvraag
      </button>
    </div>
  );
}

export default MultiStepThankYou;
