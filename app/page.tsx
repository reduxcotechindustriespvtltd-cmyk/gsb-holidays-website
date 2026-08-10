import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
// import ExploreLocations from "@/components/ExploreLocations";
import Packages from "@/components/Packages";
import Activities from "@/components/Activities";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import InstagramShowcase from "@/components/InstagramShowcase";
import { getGalleryImages, getPackages, getTestimonials } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Lakeside Camping, Villas & Resort Stays",
  description:
    "GSB Holidays offers luxury lakeside camping, villas, cottages and glamping tents with adventure activities and unforgettable holiday experiences across Karjat, Lonavala, Alibag and Panvel.",
  path: "/",
});

export default async function Home() {
  const [packages, images, testimonials] = await Promise.all([
    getPackages(),
    getGalleryImages(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Packages packages={packages} />
      {/* <ExploreLocations /> */}
      <Activities />
      <Gallery images={images} limit={6} />
      <Testimonials testimonials={testimonials} />
      <InstagramShowcase images={images} />
    </>
  );
}
