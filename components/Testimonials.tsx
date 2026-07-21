"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import type { Testimonial } from "@/lib/data";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  if (!testimonial) return null;

  return (
    <section className="relative overflow-hidden bg-brand-950 py-14 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-400/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="What Our Guests Say" light />
        </Reveal>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="glass-sheen glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition hover:text-gold-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="relative min-h-[240px] flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="glass-sheen glass-strong rounded-3xl p-8 text-center"
              >
                <Quote className="mx-auto h-7 w-7 text-gold-300" />
                <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
                  “{testimonial.quote}”
                </p>
                <div className="mt-5 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-gold-400 text-gold-400"
                          : "text-white/25"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-3 font-display text-sm font-semibold text-white">
                  {testimonial.name}
                </p>
                <p className="text-xs text-white/60">{testimonial.location}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="glass-sheen glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition hover:text-gold-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-gold-400" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
