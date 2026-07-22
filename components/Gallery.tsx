"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Expand } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";

export default function Gallery({
  images: allImages,
  limit,
  showHeading = true,
  showCta = true,
}: {
  images: string[];
  limit?: number;
  showHeading?: boolean;
  showCta?: boolean;
}) {
  const images = limit ? allImages.slice(0, limit) : allImages;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  return (
    <section
      className={`relative mx-auto max-w-6xl px-6 ${
        showHeading ? "py-14 sm:py-20 lg:py-24" : "pt-6 pb-14 sm:pb-20 lg:pb-24"
      }`}
    >
      {showHeading && (
        <Reveal>
          <SectionHeading
            eyebrow="Our Gallery"
            title="A Glimpse Into GSB Holidays"
            description="Sunrises over the lake, bonfire evenings and every moment in between."
          />
        </Reveal>
      )}

      <div
        className={`${showHeading ? "mt-14" : ""} columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4`}
      >
        {images.map((src, i) => (
          <Reveal key={src} delay={(i % 3) * 0.08} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label="Open image preview"
              className="glass-sheen glass-border-glow group relative block w-full overflow-hidden rounded-2xl border border-brand-900/10 text-left"
            >
              <Image
                src={src}
                alt="GSB Holidays gallery photo"
                width={800}
                height={i % 2 === 0 ? 1000 : 700}
                className="h-auto w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-brand-950/0 opacity-0 transition group-hover:bg-brand-950/30 group-hover:opacity-100">
                <Expand className="h-6 w-6 text-white" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {showCta && limit && (
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}

      <Lightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={showPrev}
        onNext={showNext}
        alt="GSB Holidays gallery photo"
      />
    </section>
  );
}
