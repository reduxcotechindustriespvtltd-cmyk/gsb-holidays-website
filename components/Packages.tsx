import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import PackageBrowser from "./PackageBrowser";
import Reveal from "./Reveal";
import type { Package } from "@/lib/data";

export default function Packages({ packages }: { packages: Package[] }) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Stay With Us"
          title="Villas • Farmhouses • Resorts • Cottages • Camping • Glamping"
          description="A Collection of Unique Stays Crafted for Comfort, Nature & Unforgettable Moments"
        />
      </Reveal>

      <div className="mt-14">
        <PackageBrowser packages={packages} />
      </div>

      <Reveal delay={0.2} className="mt-12 flex justify-center">
        <Link
          href="/packages"
          className="group inline-flex items-center gap-2 rounded-full bg-brand-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          View All Packages
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
