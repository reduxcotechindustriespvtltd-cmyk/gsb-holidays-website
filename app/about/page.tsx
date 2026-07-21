import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: `About Us - ${SITE.name}`,
  description: `Learn about ${SITE.name}, your trusted partner for handpicked stays across Maharashtra's top destinations.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={`The Story Behind ${SITE.name}`}
        description="A trusted name in handpicked stays — villas, farmhouses, resorts, camping and cottages — across Maharashtra's top destinations."
        image="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=2000&auto=format&fit=crop"
      />
      <About />
      <Activities />
    </>
  );
}
