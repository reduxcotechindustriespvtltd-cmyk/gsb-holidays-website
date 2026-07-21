import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PackageBrowser from "@/components/PackageBrowser";
import { DESTINATIONS, SITE } from "@/lib/data";
import { getPackages } from "@/lib/cms";

export const metadata: Metadata = {
  title: `Holiday Packages - ${SITE.name}`,
  description: `Browse villas, farmhouses, resorts, cottages, camping and glamping packages at ${SITE.name}.`,
};

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const [{ location }, allPackages] = await Promise.all([searchParams, getPackages()]);

  const destination = DESTINATIONS.find((d) => d.slug === location);
  const locationMatches = destination
    ? allPackages.filter((pkg) => pkg.location === destination.slug)
    : allPackages;
  // Packages aren't always tagged with a destination yet (e.g. the CRM's
  // records don't carry `location` at all) — rather than show a dead-end
  // empty page for a destination link in the main nav, fall back to the
  // full list so there's always something to browse.
  const noTaggedMatches = destination && locationMatches.length === 0;
  const packages = noTaggedMatches ? allPackages : locationMatches;

  return (
    <>
      <PageHero
        eyebrow="Packages"
        title={destination ? `Packages in ${destination.name}` : "Villas • Farmhouses • Resorts • Cottages • Camping • Glamping"}
        description={
          destination
            ? noTaggedMatches
              ? `We're still tagging packages for ${destination.name} — here's our full collection for now.`
              : `Handpicked stays we recommend around ${destination.name}.`
            : "Choose the stay that matches your holiday — from private villas to riverside camp tents."
        }
        image="https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
        <PackageBrowser packages={packages} />
      </section>
    </>
  );
}
