"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import Lightbox from "./Lightbox";

export default function PackageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  if (images.length <= 1) return null;

  return (
    <div>
      <h3 className="font-display text-lg font-semibold text-brand-950">Photos</h3>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label="Open image preview"
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 640px) 20vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-brand-950/0 opacity-0 transition group-hover:bg-brand-950/30 group-hover:opacity-100">
              <Expand className="h-5 w-5 text-white" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={showPrev}
        onNext={showNext}
        alt={alt}
      />
    </div>
  );
}
