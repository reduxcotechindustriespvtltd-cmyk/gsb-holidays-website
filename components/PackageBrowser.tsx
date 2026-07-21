"use client";

import { useState } from "react";
import PackageCard from "./PackageCard";
import Reveal from "./Reveal";
import { PACKAGE_CATEGORIES, categoryForType, type Package } from "@/lib/data";
import { packageGridColsClass } from "@/lib/grid";

const FILTERS = ["All", ...PACKAGE_CATEGORIES];

export default function PackageBrowser({ packages }: { packages: Package[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? packages : packages.filter((pkg) => categoryForType(pkg.type) === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
              active === filter
                ? "bg-brand-950 text-white"
                : "border border-brand-900/15 text-brand-900/70 hover:border-brand-900/30 hover:text-brand-950"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-brand-900/60">
          No stays in this category yet — check back soon.
        </p>
      ) : (
        <div className={`mt-10 grid gap-6 sm:grid-cols-2 ${packageGridColsClass(filtered.length)}`}>
          {filtered.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={i * 0.1}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
