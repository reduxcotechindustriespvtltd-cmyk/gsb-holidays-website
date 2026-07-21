import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/data";
import { getPackages } from "@/lib/cms";

export const metadata: Metadata = {
  title: `Contact Us - ${SITE.name}`,
  description: `Get in touch with ${SITE.name} to plan your lakeside holiday.`,
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const [{ package: pkg }, packages] = await Promise.all([searchParams, getPackages()]);

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Plan Your Stay"
        description="Send us your dates and we'll help you pick the perfect stay."
        image="https://images.unsplash.com/photo-1487730116645-74489c95b41b?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <GlassCard variant="light" className="p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-brand-950">
              Send an Inquiry
            </h2>
            <p className="mt-1 text-sm text-brand-900/70">
              We usually respond within a few hours.
            </p>
            <div className="mt-6">
              <ContactForm defaultPackage={pkg} packages={packages} />
            </div>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard variant="light" className="p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-brand-950">
                Reach Us Directly
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-brand-900/75">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
                  <span>{SITE.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-brand-700" />
                  <span className="flex flex-col">
                    <a href={`tel:${SITE.phone}`} className="hover:text-brand-700">
                      {SITE.phone}
                    </a>
                    <a href={`tel:${SITE.phoneSecondary}`} className="hover:text-brand-700">
                      {SITE.phoneSecondary}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-brand-700" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-brand-700">
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </GlassCard>

            <GlassCard variant="light" className="overflow-hidden">
              <iframe
                title="Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  SITE.mapEmbedQuery,
                )}&output=embed`}
                className="h-64 w-full border-0"
                loading="lazy"
              />
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}
