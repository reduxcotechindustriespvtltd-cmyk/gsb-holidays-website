import type { Metadata } from "next";
import { SITE } from "./data";

// Canonical production origin (no trailing slash) — falls back to the live
// Vercel domain if NEXT_PUBLIC_SITE_URL isn't set for a given deployment.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.gsbholiday.com";

/**
 * Builds a page's `title`/`description` plus matching Open Graph, Twitter
 * card, and canonical URL metadata — every page on the site wants the same
 * shape, just with different copy and path. `title` is the bare page title
 * (e.g. "About Us") — the root layout's title template appends "| GSB
 * Holidays" for the <title> tag, but Open Graph/Twitter fields don't inherit
 * that template, so they get the full "Title | Site Name" form explicitly.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_IN",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
