import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20 text-center">
      <div className="glass-sheen glass-light flex size-16 items-center justify-center rounded-full">
        <Compass className="h-7 w-7 text-brand-700" />
      </div>
      <span className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
        404
      </span>
      <h1 className="mt-3 font-display text-3xl font-semibold text-brand-950 sm:text-4xl">
        This page has wandered off the trail
      </h1>
      <p className="mt-3 max-w-md text-sm text-brand-900/70 sm:text-base">
        We couldn&apos;t find what you were looking for. It may have been moved or no
        longer exists.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/packages"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-900/20 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-brand-900/5"
        >
          Browse Packages
        </Link>
        <Link
          href="/"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          Back to Home
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
