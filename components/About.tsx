import { Compass, HeartHandshake, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import { SITE } from "@/lib/data";

const PILLARS = [
  {
    icon: Compass,
    title: "Our Story",
    body: `${SITE.name} began as a small lakeside camp and grew into a full resort experience, built on a love for the outdoors and honest hospitality.`,
  },
  {
    icon: Sparkles,
    title: "Our Mission",
    body: "To give every guest a comfortable, memorable escape into nature, without compromising on service or safety.",
  },
  {
    icon: HeartHandshake,
    title: "Our Vision",
    body: "To be the most trusted name in lakeside holidays across Maharashtra, one happy guest at a time.",
  },
];

export default function About() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeading
          eyebrow="About Us"
          title={`Why Guests Choose ${SITE.name}`}
          description="Every decision we make is focused on creating memorable moments for our guests, right at the water's edge."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.12}>
            <GlassCard variant="light" className="h-full p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-gold-300">
                <pillar.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-brand-950">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-900/75">
                {pillar.body}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
