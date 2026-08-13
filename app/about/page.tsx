import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import { SITE } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About GSB Holidays | Villas, Resorts & Holiday Stays",
  description:
    "Learn about GSB Holidays, a trusted holiday stay platform offering villas, resorts, farmhouses, cottages, glamping and camping experiences across popular destinations.",
  keywords: [
    "GSB Holidays",
    "about GSB Holidays",
    "holiday stays near Mumbai",
    "villas near Mumbai",
    "resorts near Mumbai",
    "farmhouses near Mumbai",
    "cottages near Mumbai",
    "camping near Mumbai",
    "glamping near Mumbai",
    "Lonavala holiday stays",
    "Pawna Lake stays",
    "weekend getaway company",
  ],
  path: "/about",
  absolute: true,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={`About ${SITE.name}`}
        description="GSB Holidays offers handpicked villas, resorts, farmhouses, cottages, camping and glamping stays for memorable getaways. From peaceful nature escapes and lakeside camping to comfortable villas and group-friendly farmhouses, we help guests find the right stay for their holiday."
        image="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=2000&auto=format&fit=crop"
      />
      <About />
      <Activities />
    </>
  );
}
