import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Activities from "@/components/Activities";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: `About Us - ${SITE.name}`,
  description: `Learn about ${SITE.name}, the premier lakeside camping resort at ${SITE.location}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={`The Story Behind ${SITE.name}`}
        description={`A lakeside escape built around comfort, adventure and genuine hospitality at ${SITE.location}.`}
        image="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=2000&auto=format&fit=crop"
      />
      <About />
      <Activities />
    </>
  );
}
