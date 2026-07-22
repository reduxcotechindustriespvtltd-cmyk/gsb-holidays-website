import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, IndianRupee } from "lucide-react";
import PageHero from "@/components/PageHero";
import GlassCard from "@/components/GlassCard";
import { SITE } from "@/lib/data";
import { formatDate, formatDateTime } from "@/lib/date";
import { getPackageBySlug } from "@/lib/cms";

export const metadata: Metadata = {
  title: `Thank You - ${SITE.name}`,
  description: `Thank you for your inquiry with ${SITE.name}.`,
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{
    id?: string;
    package?: string;
    at?: string;
    name?: string;
    phone?: string;
    email?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    guestsAdults?: string;
    guestsKids?: string;
    guestsInfants?: string;
  }>;
}) {
  const {
    id,
    package: packageSlug,
    at,
    name,
    phone,
    email,
    checkIn,
    checkOut,
    guests,
    guestsAdults,
    guestsKids,
    guestsInfants,
  } = await searchParams;

  const pkg = packageSlug ? await getPackageBySlug(packageSlug) : null;
  const adults = Number(guestsAdults) || 0;
  const kids = Number(guestsKids) || 0;
  const infants = Number(guestsInfants) || 0;
  const hasBreakdown = adults + kids + infants > 0;
  const guestCount = hasBreakdown ? adults + kids + infants : Number(guests) > 0 ? Number(guests) : 1;
  // Infants stay free — only adults and kids count toward the per-person rate.
  const billableGuests = hasBreakdown ? Math.max(1, adults + kids) : guestCount;
  const subtotal = pkg ? pkg.price * billableGuests : 0;
  const total = subtotal;

  return (
    <>
      <PageHero
        eyebrow="Thank You"
        title="Your Inquiry Is In!"
        description="We usually respond within a few hours."
        image="https://images.unsplash.com/photo-1487730116645-74489c95b41b?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:py-20">
        <GlassCard variant="light" className="p-6 text-center sm:p-10">
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
                  <dt className="font-medium text-brand-900/60">Submitted</dt>
                  <dd className="font-semibold text-brand-950">
                    {at ? formatDateTime(new Date(at)) : "—"}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 rounded-2xl border border-brand-900/10 bg-white/60 p-6 text-left">
                <h3 className="font-display text-lg font-semibold text-brand-950">
                  Guest Details
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-xs sm:text-sm">
                  <div className="col-span-2">
                    <dt className="font-medium text-brand-900/60">Full Name</dt>
                    <dd className="truncate font-semibold text-brand-950">{name || "—"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-900/60">Phone</dt>
                    <dd className="truncate font-semibold text-brand-950">{phone || "—"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-900/60">Guests</dt>
                    <dd className="font-semibold text-brand-950">
                      {hasBreakdown
                        ? [
                            adults > 0 ? `${adults} Adult${adults > 1 ? "s" : ""}` : null,
                            kids > 0 ? `${kids} Kid${kids > 1 ? "s" : ""}` : null,
                            infants > 0 ? `${infants} Infant${infants > 1 ? "s" : ""}` : null,
                          ]
                            .filter(Boolean)
                            .join(", ")
                        : guestCount}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-medium text-brand-900/60">Email</dt>
                    <dd className="truncate font-semibold text-brand-950">{email || "—"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-900/60">Check-in</dt>
                    <dd className="font-semibold text-brand-950">
                      {checkIn ? formatDate(new Date(checkIn)) : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-brand-900/60">Check-out</dt>
                    <dd className="font-semibold text-brand-950">
                      {checkOut ? formatDate(new Date(checkOut)) : "—"}
                    </dd>
                  </div>
                </dl>
              </div>

              {pkg && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-brand-900/10 bg-white/60 text-left">
                  <div className="flex gap-4 p-6">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
                      <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                        {pkg.type}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-brand-950">
                        {pkg.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-brand-900/70">
                        {pkg.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-brand-900/10 p-6">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-900/60">
                      Amount Summary
                    </h4>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-brand-900/70">
                          {billableGuests} Guest{billableGuests > 1 ? "s" : ""} × ₹
                          {pkg.price.toLocaleString("en-IN")}
                        </span>
                        <span className="font-medium text-brand-950">
                          ₹{subtotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                      {hasBreakdown && infants > 0 && (
                        <p className="text-xs text-brand-900/50">
                          Infants travel free and aren&apos;t included in the guest count above.
                        </p>
                      )}
                      <div className="flex items-center justify-between border-t border-dashed border-brand-900/15 pt-2">
                        <span className="text-brand-900/70">Subtotal</span>
                        <span className="font-medium text-brand-950">
                          ₹{subtotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-brand-900/15 pt-3">
                      <span className="text-base font-bold text-brand-950">Total Amount</span>
                      <span className="flex items-center text-xl font-bold text-brand-950">
                        <IndianRupee className="h-4 w-4" />
                        {total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
