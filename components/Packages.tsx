import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import PackageCard from "./PackageCard";
import Reveal from "./Reveal";
import type { Package } from "@/lib/data";
import { packageGridColsClass } from "@/lib/grid";

export default function Packages({ packages }: { packages: Package[] }) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Stay With Us"
          title="Villas, Cottages, Tents & Glamping"
          description="Every stay type is designed around the lake, with its own character and pace."
        />
      </Reveal>

      <div className={`mt-14 grid gap-6 sm:grid-cols-2 ${packageGridColsClass(packages.length)}`}>
        {packages.map((pkg, i) => (
          <Reveal key={pkg.slug} delay={i * 0.1}>
            <PackageCard pkg={pkg} />
          </Reveal>
        ))}
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
