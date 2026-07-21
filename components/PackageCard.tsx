import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ImagesIcon, IndianRupee, PlayCircle } from "lucide-react";
import GlassCard from "./GlassCard";
import type { Package } from "@/lib/data";

export default function PackageCard({ pkg }: { pkg: Package }) {
  const photoCount = 1 + (pkg.images?.length ?? 0);

  return (
    <GlassCard variant="light" className="flex h-full flex-col">
      <Link href={`/packages/${pkg.slug}`} className="relative block h-52 w-full">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="glass-strong absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-300">
          {pkg.type}
        </span>
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {pkg.video && (
            <span className="glass-strong flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white">
              <PlayCircle className="h-3.5 w-3.5" />
              Video
            </span>
          )}
          {photoCount > 1 && (
            <span className="glass-strong flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white">
              <ImagesIcon className="h-3.5 w-3.5" />
              {photoCount}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <Link href={`/packages/${pkg.slug}`}>
          <h3 className="font-display text-xl font-semibold text-brand-950 transition hover:text-brand-700">
            {pkg.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-brand-900/70">{pkg.description}</p>

        <ul className="mt-4 space-y-1.5">
          {pkg.amenities.slice(0, 3).map((a) => (
            <li key={a} className="flex items-center gap-2 text-xs text-brand-900/75">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-700" />
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-baseline border-t border-brand-900/10 pt-4 text-brand-950">
          <IndianRupee className="h-4 w-4" />
          <span className="text-xl font-bold">{pkg.price.toLocaleString("en-IN")}</span>
          <span className="text-xs text-brand-900/60">/Per Person</span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-900/20 px-5 py-2.5 text-sm font-semibold text-brand-950 transition hover:bg-brand-900/5"
          >
            View Details
          </Link>
          <Link
            href={`/contact?package=${pkg.slug}`}
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Book Now
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
