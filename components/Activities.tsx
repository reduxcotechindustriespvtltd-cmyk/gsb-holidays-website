import { Flame, Moon, Mountain, Music, Sailboat, Waves } from "lucide-react";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";
import { ACTIVITIES, type Activity } from "@/lib/data";

const ICONS: Record<Activity["icon"], typeof Waves> = {
  kayak: Sailboat,
  bonfire: Flame,
  stars: Moon,
  trek: Mountain,
  water: Waves,
  music: Music,
};

export default function Activities() {
  return (
    <section className="relative overflow-hidden bg-brand-900 py-14 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Adventure Activities"
            title="Immerse Yourself in Adventure & Relaxation"
            light
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((activity, i) => {
            const Icon = ICONS[activity.icon];
            return (
              <Reveal key={activity.name} delay={i * 0.08}>
                <GlassCard variant="dark" className="flex h-full items-start gap-4 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-400/90 text-brand-950">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {activity.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/70">
                      {activity.description}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
