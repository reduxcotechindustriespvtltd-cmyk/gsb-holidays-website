import Hero from "@/components/Hero";
import About from "@/components/About";
import ExploreLocations from "@/components/ExploreLocations";
import Packages from "@/components/Packages";
import Activities from "@/components/Activities";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ExploreLocations />
      <Packages />
      <Activities />
      <Gallery limit={6} />
      <Testimonials />
    </>
  );
}
