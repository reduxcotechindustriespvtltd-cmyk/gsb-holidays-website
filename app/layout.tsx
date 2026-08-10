import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { getBranding } from "@/lib/cms";
import { SITE } from "@/lib/data";
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
  const { logoUrl } = await getBranding();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-sand-50 text-brand-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar logoUrl={logoUrl} />
        <main className="flex-1">{children}</main>
        <Footer logoUrl={logoUrl} />
        <FloatingContactButtons />
      </body>
    </html>
  );
}
