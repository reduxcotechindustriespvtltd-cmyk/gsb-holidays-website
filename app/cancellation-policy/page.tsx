import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: `Cancellation Policy - ${SITE.name}`,
  description: `Cancellation and refund policy for ${SITE.name} bookings.`,
};

const SECTIONS = [
  {
    title: "Cancellations by Guest",
    body: "Cancellations made 7+ days before check-in receive a full refund minus processing fees. Cancellations within 3-6 days receive a 50% refund. Cancellations within 48 hours of check-in are non-refundable.",
  },
  {
    title: "Rescheduling",
    body: "Bookings can be rescheduled once, free of charge, if requested at least 3 days before the original check-in date, subject to availability.",
  },
  {
    title: "No-Shows",
    body: "Guests who do not arrive on the scheduled check-in date without prior notice will not be eligible for a refund.",
  },
  {
    title: "Cancellations by GSB Holidays",
    body: "In the rare event we need to cancel a confirmed booking due to unforeseen circumstances, guests will receive a full refund or the option to reschedule at no extra cost.",
  },
];

export default function CancellationPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cancellation & Refund Policy"
        description={`Our policy on cancellations, rescheduling and refunds at ${SITE.name}.`}
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
      />
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:py-20">
        <GlassCard variant="light" className="space-y-8 p-8 sm:p-10" hoverGlow={false}>
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-lg font-semibold text-brand-950">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-900/75">
                {section.body}
              </p>
            </div>
          ))}
        </GlassCard>
      </section>
    </>
  );
}
