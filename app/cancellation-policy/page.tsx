import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/data";
import { LegalSections, type LegalSection } from "@/lib/richText";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cancellation Policy",
  description: `Cancellation and refund policy for ${SITE.name} bookings.`,
  path: "/cancellation-policy",
});

const SECTIONS: LegalSection[] = [
  {
    title: "Guest Cancellations",
    blocks: [
      {
        type: "ul",
        items: [
          "**30 days or more before the check-in date:** Guests are eligible for a **100% refund** of the advance booking amount.",
          "**20 to 29 days before the check-in date:** Guests are eligible for a **50% refund** of the advance booking amount.",
          "**15 to 19 days before the check-in date:** Guests are eligible for a **25% refund** of the advance booking amount.",
          "**7 to 14 days before the check-in date:** Guests are eligible for a **15% refund** of the advance booking amount.",
          "**Less than 7 days before the check-in date:** **No refund** will be provided. The advance booking amount will be non-refundable.",
        ],
      },
    ],
  },
  {
    title: "Refunds",
    blocks: [
      {
        type: "p",
        text: "Approved refunds will be processed within **7 to 10 business days** using the original payment method.",
      },
    ],
  },
  {
    title: "Booking Modifications",
    blocks: [
      {
        type: "p",
        text: "Any changes to the booking date, number of guests, or accommodation type are subject to availability. Additional charges may apply.",
      },
    ],
  },
  {
    title: "Booking Date Modification & Postponement Policy",
    blocks: [
      {
        type: "ul",
        items: [
          "Guests may modify their confirmed booking date **a maximum of 2 times**.",
          "A request to postpone the booking must be communicated **at least 5 days before the original Check-in date**. Any Postponement Request made **2 days before Check-in or on the Check-in date** will not be accepted.",
          "All date modification requests are **subject to availability**. If the requested date is unavailable, the guest will need to select an alternative available date.",
          "The new postponed booking date must be **within 2 months from the original Check-in date**. Any date beyond this two-month period cannot be accommodated under the existing booking.",
          "If there is any difference in the applicable package or room rate for the new date, the **additional amount must be paid by the guest**.",
          "If the booking is moved to a date with a lower applicable rate, **the difference in amount will not be refunded**.",
          "If the booking is postponed to a **Weekend, Public Holiday, or Special Occasion**, the applicable rates and availability for the new date will apply.",
          "After **2 date modifications**, no further changes to the booking date will be permitted.",
          "If the guest wishes to change the date again after two modifications, they will be required to **make a new booking**. The new booking will be subject to the availability and prevailing rates applicable at that time.",
          "If the date modification results in any changes to the booking terms, package, or rates, the **terms and rates applicable to the new date will be considered final**.",
        ],
      },
    ],
  },
  {
    title: "No-Show",
    blocks: [
      {
        type: "p",
        text: "Guests who fail to arrive on the scheduled check-in date without prior notice will not be eligible for any refund.",
      },
    ],
  },
  {
    title: "Early Check-Out",
    blocks: [
      {
        type: "p",
        text: "Guests who check out before their scheduled departure date will not be eligible for any refund for the unused portion of their stay.",
      },
    ],
  },
  {
    title: "Force Majeure",
    blocks: [
      {
        type: "p",
        text: "GSB Holidays shall not be held responsible for cancellations or interruptions caused by natural disasters, extreme weather conditions, government restrictions, pandemics, road closures, or any other circumstances beyond our control. In such cases, **rescheduling may be offered or a refund may be provided depending on the situation and management decision.**",
      },
    ],
  },
  {
    title: "Cancellations by GSB Holidays",
    blocks: [
      {
        type: "p",
        text: "If GSB Holidays cancels a confirmed booking due to unforeseen or unavoidable circumstances, the guest will receive a **100% refund of the amount paid, with no deductions.**",
      },
    ],
  },
  {
    title: "Policy Updates",
    blocks: [
      {
        type: "p",
        text: "GSB Holidays reserves the right to modify or update this Cancellation Policy at any time. However, the policy in effect at the time of booking will apply to that booking.",
      },
    ],
  },
];

export default function CancellationPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cancellation Policy"
        description={`Our policy on cancellations, refunds and booking changes at ${SITE.name}.`}
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
      />
      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:py-20">
        <GlassCard variant="light" className="space-y-8 p-8 sm:p-10" hoverGlow={false}>
          <LegalSections sections={SECTIONS} />
        </GlassCard>
      </section>
    </>
  );
}
