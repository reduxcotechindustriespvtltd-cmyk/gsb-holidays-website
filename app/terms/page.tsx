import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/data";
import { LegalSections, type LegalSection } from "@/lib/richText";

export const metadata: Metadata = {
  title: `Terms & Conditions - ${SITE.name}`,
  description: `Terms and conditions for booking and staying at ${SITE.name}.`,
};

const SECTIONS: LegalSection[] = [
  {
    title: "Booking & Payment",
    blocks: [
      {
        type: "p",
        text: "A **40% advance payment** is required to confirm any booking. The remaining **60% balance amount** must be paid at the time of check-in. A booking will be considered confirmed only after the advance payment has been successfully received.",
      },
    ],
  },
  {
    title: "Guest Conduct",
    blocks: [
      {
        type: "p",
        text: "All guests must present a valid **Government-issued Photo ID** at the time of check-in.",
      },
      {
        type: "p",
        text: "Guests are expected to respect the property, fellow guests, staff, and the surrounding environment. Any illegal activities, misconduct, or behavior that disturbs other guests is strictly prohibited.",
      },
      {
        type: "p",
        text: "**Weed (Ganja), Drugs, Hookah, or any other prohibited substances are strictly not allowed inside the property premises.**",
      },
      {
        type: "ul",
        items: [
          "**Smoking & Alcohol Policy:** Guests must follow the property's smoking and alcohol guidelines. Smoking or alcohol consumption that causes inconvenience or disturbance to other guests is strictly prohibited.",
          "**Loud Music & Noise:** Guests are requested to maintain a peaceful environment. Loud music, shouting, or any activity that disturbs other guests, especially during late hours, is not allowed.",
          "**Fire Safety:** Use of fireworks, dangerous materials, or creating fire hazards inside the property premises is strictly prohibited.",
          "**Swimming Pool & Activity Safety:** Guests must follow all safety instructions while using swimming pools, boating, kayaking, and other recreational activities. Parents are responsible for the safety of children at all times.",
          "**Cleanliness & Property Care:** Guests are requested to keep the property clean and avoid littering. Guests must dispose of waste only in designated areas.",
        ],
      },
      {
        type: "p",
        text: "Any damage caused to the property due to negligence or improper use will be charged to the responsible guest.",
      },
      {
        type: "p",
        text: "Management reserves the right to take appropriate action if any of these rules are violated. In serious cases, the guest's stay may be cancelled without any refund.",
      },
    ],
  },
  {
    title: "Liability",
    blocks: [
      {
        type: "p",
        text: `${SITE.name} shall not be responsible for any loss, theft, or damage to guests' personal belongings.`,
      },
      {
        type: "p",
        text: "Guests participate in swimming pools, lakes, boating, kayaking, and other recreational or adventure activities entirely at their own risk and must follow all safety instructions provided by the staff.",
      },
    ],
  },
  {
    title: "Property Damage",
    blocks: [
      {
        type: "p",
        text: "Guests will be held responsible for any damage caused to the resort, villa, farmhouse, campsite, cottage, furniture, electronic appliances, or any other property during their stay.",
      },
      {
        type: "p",
        text: "The cost of repair or replacement will be charged to the responsible guest.",
      },
    ],
  },
  {
    title: "Changes to Terms",
    blocks: [
      {
        type: "p",
        text: `${SITE.name} reserves the right to modify or update these Terms & Conditions at any time without prior notice.`,
      },
      {
        type: "p",
        text: "Continued use of our services constitutes acceptance of the latest Terms & Conditions.",
      },
    ],
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
          <LegalSections sections={SECTIONS} />
        </GlassCard>
      </section>
    </>
  );
}
