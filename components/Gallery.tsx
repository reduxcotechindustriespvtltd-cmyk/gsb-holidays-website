import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Expand } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { GALLERY_IMAGES } from "@/lib/data";

export default function Gallery({
  limit,
  showHeading = true,
  showCta = true,
}: {
  limit?: number;
  showHeading?: boolean;
  showCta?: boolean;
}) {
  const images = limit ? GALLERY_IMAGES.slice(0, limit) : GALLERY_IMAGES;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      {showHeading && (
        <Reveal>
          <SectionHeading
            eyebrow="Our Gallery"
            title="A Glimpse Into GSB Holidays"
            description="Sunrises over the lake, bonfire evenings and every moment in between."
          />
        </Reveal>
      )}

      <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((src, i) => (
          <Reveal key={src} delay={(i % 3) * 0.08} className="break-inside-avoid">
            <div className="glass-sheen glass-border-glow group relative overflow-hidden rounded-2xl border border-brand-900/10">
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
            </div>
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
    </section>
  );
}
