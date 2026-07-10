import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PackageCard from "@/components/PackageCard";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/data";
import { getPackages } from "@/lib/cms";
import { packageGridColsClass } from "@/lib/grid";

export const metadata: Metadata = {
  title: `Holiday Packages - ${SITE.name}`,
  description: `Browse villas, cottages, glamping tents and camping packages at ${SITE.name}.`,
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Villas, Cottages, Tents & Glamping"
        description="Choose the stay that matches your holiday — from private villas to riverside camp tents."
        image="https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className={`grid gap-6 sm:grid-cols-2 ${packageGridColsClass(packages.length)}`}>
          {packages.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={i * 0.1}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
