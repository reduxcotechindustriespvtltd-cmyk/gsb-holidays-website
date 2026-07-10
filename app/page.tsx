import Hero from "@/components/Hero";
import About from "@/components/About";
import ExploreLocations from "@/components/ExploreLocations";
import Packages from "@/components/Packages";
import Activities from "@/components/Activities";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import { getGalleryImages, getPackages, getTestimonials } from "@/lib/cms";

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
      <ExploreLocations />
      <Packages packages={packages} />
      <Activities />
      <Gallery images={images} limit={6} />
      <Testimonials testimonials={testimonials} />
    </>
  );
}
