import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { EXPLORE_DESTINATIONS } from "@/lib/data";

export default function ExploreLocations() {
  return (
    <section className="relative bg-brand-950 py-14 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Explore" title="Explore Destinations" light />
        </Reveal>

        <div className="mt-14 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {EXPLORE_DESTINATIONS.map((dest, i) => (
            <Reveal
              key={dest.slug}
              delay={i * 0.12}
              className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[32%]"
            >
              <div className="glass-sheen glass-border-glow group relative h-96 overflow-hidden rounded-3xl border border-white/15">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 80vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
                <div className="glass-light absolute inset-x-4 bottom-4 rounded-2xl p-4">
                  <h3 className="font-display text-lg font-semibold text-brand-950">
                    {dest.name}
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {dest.attractions.map((attraction) => (
                      <li
                        key={attraction}
                        className="flex items-center gap-2 text-xs text-brand-900/75"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-700" />
                        {attraction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
