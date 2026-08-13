import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PackageBrowser from "@/components/PackageBrowser";
import { packageMatchesDestination } from "@/lib/data";
import { getDestinations, getPackages } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

// SEO + hero copy for each destination's filtered view of this page
// (/packages?location=<slug>). Keyed by Destination.slug — add an entry here
// when a new destination is added so it gets a tailored page instead of
// falling back to the generic "Packages in <name>" copy.
const DESTINATION_CONTENT: Record<
  string,
  { metaTitle: string; metaDescription: string; keywords: string[]; heroTitle: string; heroDescription: string }
> = {
  lonavala: {
    metaTitle: "Lonavala Resorts, Cottages & Camping | GSB Holidays",
    metaDescription:
      "Book resorts, cottages, villas and lakeside camping in Lonavala near Pawna Lake. Enjoy nature stays, activities, meals and memorable getaways with GSB Holidays.",
    keywords: [
      "Lonavala resorts",
      "resorts in Lonavala",
      "Lonavala cottages",
      "cottages in Lonavala",
      "Lonavala villas",
      "villas in Lonavala",
      "Lonavala camping",
      "camping in Lonavala",
      "Pawna Lake camping",
      "Pawna Lake resorts",
      "Pawna Lake cottages",
      "lakeside camping Lonavala",
      "Lonavala weekend getaway",
      "Lonavala stay",
      "Lonavala resort near Mumbai",
      "Lonavala resort near Pune",
    ],
    heroTitle: "Lonavala Resorts, Cottages, Villas & Lakeside Camping",
    heroDescription:
      "Experience a memorable getaway in Lonavala with comfortable resorts, cottages, villas and lakeside camping near Pawna Lake. Enjoy beautiful surroundings, delicious meals, entertainment, bonfire, indoor and outdoor activities and relaxing nature stays for couples, families and groups.",
  },
  karjat: {
    metaTitle: "Karjat Farmhouses, Resorts & Villas | GSB Holidays",
    metaDescription:
      "Book farmhouses, resorts, villas and cottages in Karjat for a peaceful nature getaway. Enjoy activities, meals and memorable stays with GSB Holidays near Mumbai and Pune.",
    keywords: [
      "Karjat farmhouse",
      "farmhouse in Karjat",
      "Karjat resorts",
      "resorts in Karjat",
      "Karjat villas",
      "villas in Karjat",
      "Karjat cottages",
      "cottages in Karjat",
      "Karjat weekend getaway",
      "Karjat stay",
      "Karjat farmhouse near Mumbai",
      "Karjat resort near Pune",
      "Karjat nature stay",
      "Karjat group getaway",
    ],
    heroTitle: "Karjat Farmhouses, Resorts & Villas",
    heroDescription:
      "Enjoy a refreshing getaway in Karjat with spacious farmhouses, resorts and villas surrounded by nature. Perfect for family gatherings, group trips and weekend escapes with delicious meals, bonfire nights and fun outdoor activities.",
  },
  alibag: {
    metaTitle: "Alibag Villas, Resorts & Camping | GSB Holidays",
    metaDescription:
      "Book villas, resorts, cottages and beachside camping in Alibag for a relaxing coastal getaway. Enjoy comfortable stays, meals and memorable experiences with GSB Holidays.",
    keywords: [
      "Alibag villas",
      "villas in Alibag",
      "Alibag resorts",
      "resorts in Alibag",
      "Alibag camping",
      "camping in Alibag",
      "Alibag cottages",
      "cottages in Alibag",
      "Alibag beach stay",
      "Alibag weekend getaway",
      "Alibag stay near Mumbai",
      "Alibag resort near Pune",
      "Alibag beach camping",
      "Alibag couple getaway",
    ],
    heroTitle: "Alibag Villas, Resorts & Beachside Camping",
    heroDescription:
      "Unwind in Alibag with beautiful villas, resorts and beachside camping just a short drive from Mumbai. Enjoy the coastal breeze, delicious meals, bonfire evenings and fun activities for couples, families and groups.",
  },
  panvel: {
    metaTitle: "Panvel Farmhouses, Resorts & Villas | GSB Holidays",
    metaDescription:
      "Book farmhouses, resorts, villas and cottages in Panvel for a quick weekend getaway near Mumbai. Enjoy comfortable stays, meals and memorable experiences with GSB Holidays.",
    keywords: [
      "Panvel farmhouse",
      "farmhouse in Panvel",
      "Panvel resorts",
      "resorts in Panvel",
      "Panvel villas",
      "villas in Panvel",
      "Panvel cottages",
      "cottages in Panvel",
      "Panvel weekend getaway",
      "Panvel stay near Mumbai",
      "Panvel resort near Pune",
      "Panvel group getaway",
      "Panvel family stay",
    ],
    heroTitle: "Panvel Farmhouses, Resorts & Villas",
    heroDescription:
      "Escape to Panvel for a quick and comfortable getaway with well-appointed farmhouses, resorts and villas. Ideal for family outings, group trips and weekend plans with delicious meals, bonfire nights and engaging activities.",
  },
};

const GENERIC_META_TITLE = "Holiday Packages | Villas, Resorts, Cottages & Camping";
const GENERIC_META_DESCRIPTION =
  "Explore holiday packages from GSB Holidays including villas, resorts, farmhouses, cottages, camping and glamping stays across Lonavala, Karjat, Alibag and Panvel.";
const GENERIC_KEYWORDS = [
  "holiday packages",
  "weekend packages near Mumbai",
  "holiday packages near Pune",
  "Lonavala packages",
  "Lonavala resort packages",
  "Pawna Lake camping packages",
  "Karjat farmhouse packages",
  "Alibag camping packages",
  "villa packages",
  "resort packages",
  "cottage packages",
  "camping packages",
  "glamping packages",
  "family holiday packages",
  "group holiday packages",
  "couple getaway packages",
];
const GENERIC_HERO_TITLE = "Holiday Packages for Every Getaway";
const GENERIC_HERO_DESCRIPTION =
  "Choose from handpicked villas, resorts, farmhouses, cottages, camping and glamping packages for couples, families, friends and groups. Find your perfect stay across Lonavala, Karjat, Alibag and Panvel.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}): Promise<Metadata> {
  const [{ location }, destinations] = await Promise.all([searchParams, getDestinations()]);
  const destination = destinations.find((d) => d.slug === location);
  const content = destination ? DESTINATION_CONTENT[destination.slug] : undefined;

  return pageMetadata({
    title: content ? content.metaTitle : destination ? `Packages in ${destination.name}` : GENERIC_META_TITLE,
    description: content
      ? content.metaDescription
      : destination
        ? `Browse handpicked villas, farmhouses, resorts, cottages, camping and glamping packages around ${destination.name}.`
        : GENERIC_META_DESCRIPTION,
    keywords: content ? content.keywords : destination ? undefined : GENERIC_KEYWORDS,
    path: destination ? `/packages?location=${destination.slug}` : "/packages",
    absolute: Boolean(content),
  });
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  const [{ location }, allPackages, destinations] = await Promise.all([
    searchParams,
    getPackages(),
    getDestinations(),
  ]);

  const destination = destinations.find((d) => d.slug === location);
  const content = destination ? DESTINATION_CONTENT[destination.slug] : undefined;
  const locationMatches = destination
    ? allPackages.filter((pkg) => packageMatchesDestination(pkg, destination.slug))
    : allPackages;
  // Not every package has been tagged with a destination yet — rather than
  // show a dead-end empty page for a destination link in the main nav, fall
  // back to the full list so there's always something to browse.
  const noTaggedMatches = destination && locationMatches.length === 0;
  const packages = noTaggedMatches ? allPackages : locationMatches;

  return (
    <>
      <PageHero
        eyebrow="Packages"
        title={
          content
            ? content.heroTitle
            : destination
              ? `Packages in ${destination.name}`
              : GENERIC_HERO_TITLE
        }
        description={
          destination
            ? noTaggedMatches
              ? `We're still tagging packages for ${destination.name} — here's our full collection for now.`
              : content
                ? content.heroDescription
                : `Handpicked stays we recommend around ${destination.name}.`
            : GENERIC_HERO_DESCRIPTION
        }
        image="https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=2000&auto=format&fit=crop"
      />

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
        <PackageBrowser key={location ?? "all"} packages={packages} />
      </section>
    </>
  );
}
