import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: `Terms & Conditions - ${SITE.name}`,
  description: `Terms and conditions for booking and staying at ${SITE.name}.`,
};

const SECTIONS = [
  {
    title: "Booking & Payment",
    body: "A minimum advance payment is required to confirm any booking. Full payment must be made before check-in unless otherwise agreed in writing.",
  },
  {
    title: "Check-in / Check-out",
    body: "Standard check-in is from 12:00 PM and check-out is by 11:00 AM. Early check-in and late check-out are subject to availability and may incur additional charges.",
  },
  {
    title: "Guest Conduct",
    body: "Guests must present valid ID proof at check-in. Guests are expected to respect the property, other guests, and the natural surroundings at all times.",
  },
  {
    title: "Liability",
    body: `${SITE.name} is not responsible for loss, theft, or damage to personal belongings. Adventure activities are undertaken at the guest's own risk and following staff guidance.`,
  },
  {
    title: "Changes to Terms",
    body: "These terms may be updated from time to time. Continued use of our services constitutes acceptance of the current terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description={`Please read these terms carefully before booking with ${SITE.name}.`}
        image="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=2000&auto=format&fit=crop"
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
