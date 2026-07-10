"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  alt = "GSB Holidays photo",
}: {
  images: string[];
  activeIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  alt?: string;
}) {
  useEffect(() => {
    if (activeIndex === null) return;

    document.body.style.overflow = "hidden";
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/10 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative h-[80vh] w-[88vw] sm:w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={images[activeIndex]} alt={alt} fill sizes="90vw" className="object-contain" priority />
          </motion.div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Next image"
              className="absolute right-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/10 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
