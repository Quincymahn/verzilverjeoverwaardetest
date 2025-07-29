"use client";

import { useEffect } from "react";

export default function CookieBotLoader() {
  useEffect(() => {
    if (document.getElementsById("Cookiebot")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "Cookiebot";
    script.src = "https://consent.cookiebot.com/uc.js";
    script.setAttribute("data-cbid", "31fc550f-5e04-4b25-90dc-c14dcdf3d847");
    script.setAttribute("data-blockingmode", "auto");
    script.type = "text/javascript";

    document.head.appendChild(script);

    const initGTM = () => {
      if (
        typeof window.Cookiebot !== "undefined" &&
        window.Cookiebot.consent.statistics
      ) {
        if (!window.gtmInitialized) {
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, "script", "dataLayer", "GTM-P4LX2DS8");
          window.gtmInitialized = true;
        }
      }
    };

    const handleCookiebotLoad = () => {
      initGTM();
      window.addEventListener("CookiebotOnAccept", initGTM);
    };

    if (typeof window.Cookiebot !== "undefined") {
      handleCookiebotLoad();
    } else {
      script.addEventListener("load", handleCookiebotLoad);
    }

    return () => {
      script.removeEventListener("load", handleCookiebotLoad);
    };
  }, []);
  return null;
}
