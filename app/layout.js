import CookieConsentBanner from "./_components/CookieConsentBanner";
import Header from "./_components/Header";
import "./globals.css";
import { Lato, Poppins } from "next/font/google";
import Script from "next/script";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

const GTM_CONTAINER_ID = "GTM-P4LX2DS8";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${poppins.variable}`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>Verzilver je overwaarde</title>

        {/* Load Cookiebot first */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="31fc550f-5e04-4b25-90dc-c14dcdf3d847"
          data-blockingmode="auto"
          type="text/javascript"
          suppressHydrationWarning={true}
        ></script>
      </head>
      <body className="min-w-0 overflow-x-hidden">
        {/* GTM Script - loaded after Cookiebot with proper timing */}
        <Script
          id="gtm-initialization"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize dataLayer
              window.dataLayer = window.dataLayer || [];
              
              function initGTM() {
                if (!window.gtmInitialized && typeof window.Cookiebot !== 'undefined' && window.Cookiebot.consent.statistics) {
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
                  window.gtmInitialized = true;
                }
              }
              
              // Wait for Cookiebot to be ready
              function waitForCookiebot() {
                if (typeof window.Cookiebot !== 'undefined' && window.Cookiebot.consent) {
                  // Cookiebot is ready, check consent
                  initGTM();
                  
                  // Listen for future consent changes
                  window.addEventListener('CookiebotOnAccept', initGTM);
                  window.addEventListener('CookiebotOnDecline', function() {
                    // Handle decline if needed
                  });
                } else {
                  // Cookiebot not ready yet, wait a bit more
                  setTimeout(waitForCookiebot, 100);
                }
              }
              
              // Start waiting for Cookiebot
              waitForCookiebot();
            `,
          }}
        />

        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Header />
        <main className="w-full min-w-0">{children}</main>
      </body>
    </html>
  );
}
