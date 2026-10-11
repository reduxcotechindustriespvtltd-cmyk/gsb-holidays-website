import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { getBranding, getDestinations, getPackages } from "@/lib/cms";
import { SITE, packageMatchesDestination } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GSB Holidays - Lakeside Camping & Resort",
    template: `%s | ${SITE.name}`,
  },
  description:
    "GSB Holidays offers luxury lakeside camping, villas, cottages and glamping tents with adventure activities and unforgettable holiday experiences.",
  keywords: [
    "GSB Holidays",
    "lakeside camping resort",
    "luxury glamping",
    "villa rental",
    "cottage booking",
    "adventure holiday",
  ],
  robots: { index: true, follow: true },
};

// Unset until real tracking IDs are provided — the tags simply don't render
// in that case, so analytics wiring is a no-op until configured.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
// Independent of the direct gtag.js snippet above — GTM is a separate
// container script some teams use to manage tags from the GTM web UI
// instead of code changes. If GTM is configured to ALSO fire GA4/Ads config
// calls for the same IDs as above, don't enable both at once — that double-
// fires pageviews/conversions. Pick one path per tag.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full.png`,
  image: `${SITE_URL}/logo-full.png`,
  telephone: SITE.phone,
  email: SITE.email,
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
  sameAs: [SITE.social.instagram, SITE.social.facebook],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ logoUrl }, destinations, packages] = await Promise.all([
    getBranding(),
    getDestinations(),
    getPackages(),
  ]);
  // Only show destinations in the nav that at least one package is tagged
  // with — an empty destination would just dead-end at "no stays here yet".
  const navDestinations = destinations.filter((destination) =>
    packages.some((pkg) => packageMatchesDestination(pkg, destination.slug))
  );

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-sand-50 text-brand-950">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {GTM_ID && (
          <Script id="gtm-init" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
                ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
              `}
            </Script>
          </>
        )}
        <Navbar logoUrl={logoUrl} destinations={navDestinations} />
        <main className="flex-1">{children}</main>
        <Footer logoUrl={logoUrl} />
        <FloatingContactButtons />
      </body>
    </html>
  );
}
