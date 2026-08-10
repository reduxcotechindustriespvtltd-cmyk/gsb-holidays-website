import type { MetadataRoute } from "next";
import { getPackages } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/packages", changeFrequency: "weekly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cancellation-policy", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const packages = await getPackages();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...packages.map((pkg) => ({
      url: `${SITE_URL}/packages/${pkg.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
