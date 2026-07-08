import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { EXPLORE_LOCATIONS } from "@/lib/data";

export default function ExploreLocations() {
  return (
    <section className="relative bg-brand-950 py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Around the Lake"
            title="Things to Explore Near Pawna Lake"
            light
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {EXPLORE_LOCATIONS.map((loc, i) => (
            <Reveal key={loc.name} delay={i * 0.12}>
              <div className="glass-sheen glass-border-glow group relative h-80 overflow-hidden rounded-3xl border border-white/15">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
                <div className="glass-light absolute inset-x-4 bottom-4 rounded-2xl p-4">
                  <h3 className="font-display text-lg font-semibold text-brand-950">
                    {loc.name}
                  </h3>
                  <p className="mt-1 text-xs text-brand-900/75">{loc.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
