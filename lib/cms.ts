import {
  PACKAGES,
  GALLERY_IMAGES,
  GALLERY_VIDEOS,
  TESTIMONIALS,
  type Package,
  type Testimonial,
} from "./data";

// Pulls live content from the GSB CRM's public, unauthenticated read API so
// editing a Package/Gallery photo/Testimonial there shows up here without a
// redeploy. Mirrors the resilience pattern already used by app/api/inquiry's
// forwardToCrm: if CRM_API_URL isn't configured, or the CRM is unreachable,
// fall back to the static data in ./data so the site never breaks for a
// visitor over a CRM hiccup.
async function fetchFromCrm<T>(path: string): Promise<T | null> {
  const crmUrl = process.env.CRM_API_URL;
  if (!crmUrl) return null;

  try {
    const res = await fetch(`${crmUrl}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error(`CRM content fetch failed: ${path}`, res.status);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error(`CRM content fetch failed: ${path}`, error);
    return null;
  }
}

export async function getPackages(): Promise<Package[]> {
  const data = await fetchFromCrm<{ packages: Package[] }>("/api/public/packages");
  const packages = data?.packages ?? PACKAGES;
  // The CRM returns packages oldest-first (manual `order`, then createdAt
  // ascending) — reverse so the most recently added package shows first.
  return [...packages].reverse();
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const packages = await getPackages();
  return packages.find((pkg) => pkg.slug === slug) ?? null;
}

export async function getGalleryImages(): Promise<string[]> {
  const data = await fetchFromCrm<{ images: string[] }>("/api/public/gallery");
  return data?.images ?? GALLERY_IMAGES;
}

export async function getGalleryVideos(): Promise<string[]> {
  const data = await fetchFromCrm<{ videos: string[] }>("/api/public/gallery-videos");
  return data?.videos ?? GALLERY_VIDEOS;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchFromCrm<{ testimonials: Testimonial[] }>("/api/public/testimonials");
  return data?.testimonials ?? TESTIMONIALS;
}
