"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

// Main Cookie Consent Banner Component
export default function CookieConsentBanner() {
  // State for tracking if consent is given and modal visibility
  const [isClient, setIsClient] = useState(false);
  const [consentGiven, setConsentGiven] = useState(true); // Default to true to prevent flash
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  });
  // State for debugging and testing
  const [debugInfo, setDebugInfo] = useState({
    gtmInitialized: false,
    lastConsentAction: "",
    dataLayerEvents: [],
  });

  // GTM ID - should match the one in your layout
  const GTM_ID = "GTM-NKR8PMTQ";

  // Check for existing consent on component mount (client-side only)
  useEffect(() => {
    // Mark that we're now client-side
    setIsClient(true);

    const storedConsent = localStorage.getItem("cookieConsent");

    if (!storedConsent) {
      // No consent stored, show the banner
      setConsentGiven(false);
      setShowBanner(true);
    } else {
      // Load saved preferences
      try {
        const preferences = JSON.parse(storedConsent);
        setCookiePreferences(preferences);

        // Check if analytics was previously accepted
        if (preferences.analytics) {
          // We don't need to initialize GTM here since it's in the layout
          // Just update our debug state
          setDebugInfo((prev) => ({ ...prev, gtmInitialized: true }));
        }
      } catch (e) {
        console.error("Error parsing stored cookie preferences");
      }
    }
  }, []);

  // Handlers for consent actions
  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };

    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    setCookiePreferences(allAccepted);
    setConsentGiven(true);
    setShowBanner(false);
    setShowPreferencesModal(false);
    setDebugInfo((prev) => ({
      ...prev,
      gtmInitialized: true,
      lastConsentAction: "Accepted All Cookies",
    }));

    // Push consent to dataLayer
    pushConsentToDataLayer(allAccepted);
  };

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };

    localStorage.setItem("cookieConsent", JSON.stringify(onlyNecessary));
    setCookiePreferences(onlyNecessary);
    setConsentGiven(true);
    setShowBanner(false);
    setShowPreferencesModal(false);
    setDebugInfo((prev) => ({
      ...prev,
      lastConsentAction: "Declined All Cookies",
    }));

    // Push consent to dataLayer
    pushConsentToDataLayer(onlyNecessary);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(cookiePreferences));
    setConsentGiven(true);
    setShowBanner(false);
    setShowPreferencesModal(false);
    setDebugInfo((prev) => ({
      ...prev,
      gtmInitialized: cookiePreferences.analytics,
      lastConsentAction: "Saved Custom Preferences",
    }));

    // Push consent to dataLayer
    pushConsentToDataLayer(cookiePreferences);
  };

  const handlePreferenceChange = (category) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const openPreferences = () => {
    setShowPreferencesModal(true);
  };

  // Push consent data to dataLayer
  const pushConsentToDataLayer = (preferences) => {
    if (window.dataLayer) {
      // Push consent event
      window.dataLayer.push({
        event: "userConsentUpdate",
        consent: {
          analytics: preferences.analytics,
          marketing: preferences.marketing,
          preferences: preferences.preferences,
        },
      });

      setDebugInfo((prev) => ({
        ...prev,
        dataLayerEvents: [...prev.dataLayerEvents, "Consent Updated"],
      }));
    }
  };

  // Test function to simulate a page view event
  const simulatePageView = () => {
    if (window.dataLayer && cookiePreferences.analytics) {
      window.dataLayer.push({
        event: "pageView",
        page: {
          title: "Test Page",
          path: "/test-page",
        },
      });

      setDebugInfo((prev) => ({
        ...prev,
        dataLayerEvents: [...prev.dataLayerEvents, "Page View Tracked"],
      }));
    } else {
      setDebugInfo((prev) => ({
        ...prev,
        dataLayerEvents: [
          ...prev.dataLayerEvents,
          "Page View Blocked (No Consent)",
        ],
      }));
    }
  };

  // Don't render anything during server-side rendering
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Debug panel for testing */}
      {/* <div className="fixed top-4 right-4 z-40 bg-white p-4 shadow-lg rounded-lg border border-gray-200 w-64">
        <h3 className="font-bold text-sm mb-2">Debug Panel</h3>
        <div className="text-xs space-y-2">
          <div className="flex justify-between">
            <span>GTM Initialized:</span>
            <span
              className={
                debugInfo.gtmInitialized
                  ? "text-green-600 font-bold"
                  : "text-red-600"
              }
            >
              {debugInfo.gtmInitialized ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Analytics Consent:</span>
            <span
              className={
                cookiePreferences.analytics
                  ? "text-green-600 font-bold"
                  : "text-red-600"
              }
            >
              {cookiePreferences.analytics ? "Granted" : "Denied"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Marketing Consent:</span>
            <span
              className={
                cookiePreferences.marketing
                  ? "text-green-600 font-bold"
                  : "text-red-600"
              }
            >
              {cookiePreferences.marketing ? "Granted" : "Denied"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Last Action:</span>
            <span className="font-medium">
              {debugInfo.lastConsentAction || "None"}
            </span>
          </div>

          <div className="mt-2">
            <button
              onClick={simulatePageView}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded"
            >
              Test Page View Event
            </button>
          </div>

          <div className="mt-2">
            <h4 className="font-medium text-xs mb-1">DataLayer Events:</h4>
            <div className="bg-gray-100 p-1 rounded h-24 overflow-y-auto">
              {debugInfo.dataLayerEvents.length === 0 ? (
                <span className="text-gray-500 text-xs">No events yet</span>
              ) : (
                <ul className="text-xs">
                  {debugInfo.dataLayerEvents.map((event, index) => (
                    <li
                      key={index}
                      className="border-b border-gray-200 pb-1 mb-1 last:border-b-0"
                    >
                      {event}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div> */}

      {/* Cookie preferences button (always visible after initial consent) */}
      {consentGiven && (
        <div className="fixed bottom-4 left-4 z-40">
          <button
            onClick={openPreferences}
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg shadow-lg flex items-center text-sm"
          >
            <span className="mr-2">🍪</span>
            Cookie Voorkeuren
          </button>
        </div>
      )}

      {/* Cookie consent banner */}
      {showBanner && !consentGiven && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 md:flex md:items-center md:justify-between md:py-4">
            <div className="md:flex-1 md:flex md:items-center">
              <p className="text-sm text-gray-700">
                <span className="font-semibold mr-1">🍪 Cookie-melding:</span>
                <span>
                  Deze website gebruikt cookies om uw ervaring te verbeteren. U
                  kunt deze accepteren of aanpassen volgens uw voorkeuren.
                </span>
              </p>
            </div>
            <div className="mt-3 flex flex-shrink-0 items-center justify-end space-x-3 md:mt-0">
              <button
                type="button"
                onClick={() => openPreferences()}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                Voorkeuren
              </button>
              <button
                type="button"
                onClick={handleDeclineAll}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                Weigeren
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences modal */}
      {showPreferencesModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-auto overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 p-4 sm:p-6">
              <h2 className="text-white text-xl sm:text-2xl font-bold">
                Cookie Voorkeuren
              </h2>
              <p className="text-blue-100 mt-1 text-sm">
                Pas aan welke cookies u wilt toestaan
              </p>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <p className="text-gray-700 mb-6 text-sm">
                Wij gebruiken cookies om uw gebruikservaring te verbeteren,
                gepersonaliseerde advertenties weer te geven, websiteverkeer te
                analyseren en inzicht te krijgen in waar onze bezoekers vandaan
                komen.
              </p>

              {/* Cookie categories */}
              <div className="space-y-4 mb-6">
                {/* Necessary cookies - always enabled */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      Noodzakelijke cookies
                    </h3>
                    <p className="text-xs text-gray-600">
                      Deze cookies zijn nodig om de website te laten werken.
                    </p>
                  </div>
                  <div className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-xs font-medium">
                    Vereist
                  </div>
                </div>

                {/* Analytics cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      Analytische cookies
                    </h3>
                    <p className="text-xs text-gray-600">
                      Helpen ons te begrijpen hoe bezoekers onze website
                      gebruiken.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={cookiePreferences.analytics}
                      onChange={() => handlePreferenceChange("analytics")}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Marketing cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      Marketing cookies
                    </h3>
                    <p className="text-xs text-gray-600">
                      Worden gebruikt voor gepersonaliseerde advertenties.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={cookiePreferences.marketing}
                      onChange={() => handlePreferenceChange("marketing")}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Preferences cookies */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      Voorkeurscookies
                    </h3>
                    <p className="text-xs text-gray-600">
                      Onthouden uw voorkeuren voor een betere ervaring.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={cookiePreferences.preferences}
                      onChange={() => handlePreferenceChange("preferences")}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* Legal and privacy links */}
              <div className="text-xs text-gray-500 mb-4">
                <p>Voor meer informatie over hoe wij met uw gegevens omgaan:</p>
                <div className="mt-1 space-x-3">
                  <a
                    href="#privacybeleid"
                    className="text-blue-600 hover:underline"
                  >
                    Privacybeleid
                  </a>
                  <a
                    href="#cookiebeleid"
                    className="text-blue-600 hover:underline"
                  >
                    Cookiebeleid
                  </a>
                </div>
              </div>
            </div>

            {/* Footer with buttons */}
            <div className="bg-gray-50 p-4 flex flex-col sm:flex-row gap-2 justify-between">
              <button
                onClick={handleDeclineAll}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-700 transition-colors"
              >
                Alleen noodzakelijk
              </button>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setShowPreferencesModal(false)}
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  Annuleren
                </button>

                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                >
                  Voorkeuren opslaan
                </button>

                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Alles accepteren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
