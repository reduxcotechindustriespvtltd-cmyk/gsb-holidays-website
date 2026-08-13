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
  title: "GSB Holidays | Villas, Resorts, Farmhouses & Camping",
  description:
    "Discover villas, resorts, farmhouses, cottages, glamping and camping stays in Lonavala, Karjat, Alibag and Panvel. Book your perfect getaway with GSB Holidays.",
  keywords: [
    "GSB Holidays",
    "villas near Mumbai",
    "resorts near Mumbai",
    "farmhouses near Mumbai",
    "cottages near Mumbai",
    "glamping near Mumbai",
    "camping near Mumbai",
    "Lonavala resorts",
    "Lonavala villas",
    "Lonavala cottages",
    "Pawna Lake camping",
    "Karjat farmhouse",
    "Alibag camping",
    "Panvel farmhouse",
    "weekend getaway near Mumbai",
    "weekend getaway near Pune",
  ],
  path: "/",
  absolute: true,
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
