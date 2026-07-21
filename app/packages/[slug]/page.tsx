import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, IndianRupee } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Reveal from "@/components/Reveal";
import PackageGallery from "@/components/PackageGallery";
import PackageHeroSlideshow from "@/components/PackageHeroSlideshow";
import VideoEmbed from "@/components/VideoEmbed";
import { SITE } from "@/lib/data";
import { getPackageBySlug, getPackages } from "@/lib/cms";

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return { title: `Package Not Found - ${SITE.name}` };

  return {
    title: `${pkg.name} - ${SITE.name}`,
    description: pkg.description,
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const galleryImages = [pkg.image, ...(pkg.images ?? [])];

  return (
    <>
      <section className="relative h-[56vh] min-h-[420px] w-full overflow-hidden pt-20">
        <PackageHeroSlideshow images={galleryImages} alt={pkg.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/40 to-brand-950/70" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12">
          <div className="mx-auto w-full max-w-5xl">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Packages
            </Link>
            <span className="glass-strong mt-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-300">
              {pkg.type}
            </span>
            <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-5xl">
              {pkg.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 sm:py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-semibold text-brand-950">
                About this stay
              </h2>
              <p className="mt-3 text-base leading-relaxed text-brand-900/75">
                {pkg.description}
              </p>

              {pkg.amenities.length > 0 && (
                <>
                  <h3 className="mt-10 font-display text-lg font-semibold text-brand-950">
                    What&apos;s included
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {pkg.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="flex items-center gap-2 text-sm text-brand-900/80"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-700" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-10">
                <PackageGallery images={galleryImages} alt={pkg.name} />
              </div>

              {pkg.video && (
                <div className="mt-10">
                  <h3 className="font-display text-lg font-semibold text-brand-950">Video</h3>
                  <div className="mt-4">
                    <VideoEmbed url={pkg.video} />
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard variant="light" className="lg:sticky lg:top-24 p-6 sm:p-8">
              <div className="flex items-baseline text-brand-950">
                <IndianRupee className="h-5 w-5" />
                <span className="text-3xl font-bold">{pkg.price.toLocaleString("en-IN")}</span>
                <span className="text-sm text-brand-900/60">/Per Person</span>
              </div>

              <Link
                href={`/contact?package=${pkg.slug}`}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                Book This Package
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </>
  );
}
