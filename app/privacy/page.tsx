import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: `Privacy Policy - ${SITE.name}`,
  description: `Privacy policy explaining how ${SITE.name} collects and uses your information.`,
};

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "We collect personal details (name, email, phone, address) that you provide when making an inquiry or booking, along with stay preferences and payment details for processing bookings.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to confirm bookings, communicate about your stay, and improve our services. We do not sell your personal information to third parties.",
  },
  {
    title: "Data Security",
    body: "We take reasonable technical and organizational measures to protect your data from unauthorized access, loss, or misuse.",
  },
  {
    title: "Contact Us",
    body: `For any privacy-related concerns, please contact us at ${SITE.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle and protect your personal information."
        image="https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?q=80&w=2000&auto=format&fit=crop"
      />
      <section className="mx-auto max-w-3xl px-6 py-20">
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
