import CookieConsentBanner from "./_components/CookieConsentBanner";
import Header from "./_components/Header";
import "./globals.css";
import { Lato, Poppins } from "next/font/google";
import Script from "next/script"; // Make sure this import is present

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

        <Script
          id="gtm-base-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
            `,
          }}
        />
      </head>
      <body className="min-w-0 overflow-x-hidden">
        {/* Google Tag Manager noscript fallback */}
        {/* Ensure this also uses the correct GTM_CONTAINER_ID */}
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
        <CookieConsentBanner />{" "}
        {/* This should ideally manage consent for GTM_CONTAINER_ID */}
      </body>
    </html>
  );
}
