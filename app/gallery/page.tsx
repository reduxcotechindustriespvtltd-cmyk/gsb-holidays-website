import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryTabs from "@/components/GalleryTabs";
import { SITE } from "@/lib/data";
import { getGalleryImages, getGalleryVideos } from "@/lib/cms";

export const metadata: Metadata = {
  title: `Gallery - ${SITE.name}`,
  description: `Photo and video gallery of ${SITE.name} — handpicked villas, farmhouses, resorts, camping and cottages.`,
};

export default async function GalleryPage() {
  const [images, videos] = await Promise.all([getGalleryImages(), getGalleryVideos()]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={`Photo Gallery of ${SITE.name}`}
        description="Sunrises, bonfires, water sports and everything in between."
        image="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2000&auto=format&fit=crop"
      />
      <GalleryTabs images={images} videos={videos} />
    </>
  );
}
