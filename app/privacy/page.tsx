import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/data";
import { LegalSections, type LegalSection } from "@/lib/richText";

export const metadata: Metadata = {
  title: `Privacy Policy - ${SITE.name}`,
  description: `Privacy policy explaining how ${SITE.name} collects and uses your information.`,
};

const INTRO = `At ${SITE.name}, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect and use your information when you visit our website, make an enquiry, or book our services.`;

const SECTIONS: LegalSection[] = [
  {
    title: "Information We Collect",
    blocks: [
      { type: "p", text: "We may collect:" },
      {
        type: "ul",
        items: [
          "Full Name",
          "Email Address",
          "Phone Number",
          "Booking Details",
          "Travel & Stay Preferences",
          "Payment Information (processed securely through authorized payment providers)",
        ],
      },
    ],
  },
  {
    title: "How We Use Your Information",
    blocks: [
      { type: "p", text: "Your information is used to:" },
      {
        type: "ul",
        items: [
          "Process and confirm your bookings.",
          "Contact you regarding enquiries and reservations.",
          "Provide customer support.",
          "Improve our services and website experience.",
          "Send booking confirmations and important updates.",
        ],
      },
      {
        type: "p",
        text: "We do not sell, rent, or share your personal information with third parties for marketing purposes.",
      },
    ],
  },
  {
    title: "Cookies",
    blocks: [
      {
        type: "p",
        text: "Our website may use cookies to improve your browsing experience, analyze website traffic, and enhance our services.",
      },
    ],
  },
  {
    title: "Data Security",
    blocks: [
      {
        type: "p",
        text: "We take appropriate security measures to protect your personal information from unauthorized access, misuse, or disclosure.",
      },
    ],
  },
  {
    title: "Updates to This Policy",
    blocks: [
      {
        type: "p",
        text: `${SITE.name} may update this Privacy Policy from time to time. Any changes will be posted on this page.`,
      },
    ],
  },
  {
    title: "Contact Us",
    blocks: [
      {
        type: "p",
        text: `${SITE.name}\nEmail: ${SITE.email}\nPhone: ${SITE.phone}`,
      },
    ],
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
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:py-20">
        <GlassCard variant="light" className="space-y-8 p-8 sm:p-10" hoverGlow={false}>
          <p className="text-sm leading-relaxed text-brand-900/75">{INTRO}</p>
          <LegalSections sections={SECTIONS} />
        </GlassCard>
      </section>
    </>
  );
}
