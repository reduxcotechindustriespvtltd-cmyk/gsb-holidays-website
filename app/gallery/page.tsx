import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: `Gallery - ${SITE.name}`,
  description: `Photo gallery of ${SITE.name}, the lakeside camping resort at ${SITE.location}.`,
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={`Photo Gallery of ${SITE.name}`}
        description="Sunrises, bonfires, water sports and everything in between."
        image="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000&auto=format&fit=crop"
      />
      <Gallery showHeading={false} showCta={false} />
    </>
  );
}
