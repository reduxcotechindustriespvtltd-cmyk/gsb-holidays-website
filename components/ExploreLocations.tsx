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
          <SectionHeading eyebrow="Explore" title="Things to Explore Nearby" light />
        </Reveal>

        <div className="mt-14 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {EXPLORE_LOCATIONS.map((loc, i) => (
            <Reveal
              key={loc.name}
              delay={i * 0.12}
              className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[32%]"
            >
              <div className="glass-sheen glass-border-glow group relative h-80 overflow-hidden rounded-3xl border border-white/15">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 80vw"
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
