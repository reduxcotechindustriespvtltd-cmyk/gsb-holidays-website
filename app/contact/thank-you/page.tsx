import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/data";
import { formatDateTime } from "@/lib/date";

export const metadata: Metadata = {
  title: `Thank You - ${SITE.name}`,
  description: `Thank you for your inquiry with ${SITE.name}.`,
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; package?: string; at?: string }>;
}) {
  const { id, package: packageName, at } = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Thank You"
        title="Your Inquiry Is In!"
        description="We usually respond within a few hours."
        image="https://images.unsplash.com/photo-1487730116645-74489c95b41b?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-2xl px-6 py-20">
        <GlassCard variant="light" className="p-8 text-center sm:p-10">
          {id ? (
            <>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-gold-300">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold text-brand-950">
                Thanks for reaching out!
              </h2>
              <p className="mt-2 text-sm text-brand-900/70">
                We&apos;ve received your inquiry and will get back to you shortly.
              </p>

              <dl className="mt-8 grid gap-4 rounded-2xl border border-brand-900/10 bg-white/60 p-6 text-left text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-medium text-brand-900/60">Inquiry ID</dt>
                  <dd className="font-semibold text-brand-950">{id}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-medium text-brand-900/60">Package</dt>
                  <dd className="font-semibold text-brand-950">{packageName ?? "Not selected"}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-medium text-brand-900/60">Submitted</dt>
                  <dd className="font-semibold text-brand-950">
                    {at ? formatDateTime(new Date(at)) : "—"}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <h2 className="font-display text-2xl font-semibold text-brand-950">
                No inquiry found
              </h2>
              <p className="mt-2 text-sm text-brand-900/70">
                We couldn&apos;t find a recent inquiry. Please submit the contact form to get in
                touch with us.
              </p>
            </>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-brand-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-brand-900/20 px-6 py-2.5 text-sm font-semibold text-brand-950 transition hover:bg-brand-900/5"
            >
              Send Another Inquiry
            </Link>
          </div>
        </GlassCard>
      </section>
    </>
  );
}
