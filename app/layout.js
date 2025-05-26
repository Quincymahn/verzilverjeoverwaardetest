import CookieConsentBanner from "./_components/CookieConsentBanner";
import Header from "./_components/Header";
import "./globals.css";
import { Lato, Poppins } from "next/font/google";
import Script from "next/script";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"], // Adjust weights as needed
  variable: "--font-body", // Matches your CSS variable
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

// GTM ID
const GTM_ID = "GTM-NKR8PMTQ";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${poppins.variable}`}>
      <head>
        {/* Use Next.js Script component for client-side script loading */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body>
        {/* GTM noscript iframe for browsers with JavaScript disabled */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKR8PMTQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Header />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
