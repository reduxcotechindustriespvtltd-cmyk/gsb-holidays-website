import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, IndianRupee, Users } from "lucide-react";
import GlassCard from "./GlassCard";
import type { Package } from "@/lib/data";

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <GlassCard variant="light" className="flex h-full flex-col">
      <div className="relative h-52 w-full">
        <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
        <span className="glass-strong absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-300">
          {pkg.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-brand-950">
          {pkg.name}
        </h3>
        <p className="mt-2 flex-1 text-sm text-brand-900/70">{pkg.description}</p>

        <ul className="mt-4 space-y-1.5">
          {pkg.amenities.slice(0, 3).map((a) => (
            <li key={a} className="flex items-center gap-2 text-xs text-brand-900/75">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-700" />
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-brand-900/10 pt-4">
          <div>
            <div className="flex items-center text-brand-950">
              <IndianRupee className="h-4 w-4" />
              <span className="font-display text-xl font-semibold">
                {pkg.price.toLocaleString("en-IN")}
              </span>
            </div>
            <span className="text-xs text-brand-900/60">{pkg.priceUnit}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-brand-900/60">
            <Users className="h-3.5 w-3.5" /> up to {pkg.maxGuests}
          </div>
        </div>

        <Link
          href={`/contact?package=${pkg.slug}`}
          className="group mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          Book Now
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </GlassCard>
  );
}
