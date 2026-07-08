"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Users, X } from "lucide-react";

type GuestSelectorProps = {
  label?: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  variant?: "dark" | "light";
};

export default function GuestSelector({
  label = "Guests",
  value,
  onChange,
  min = 1,
  max = 10,
  variant = "dark",
}: GuestSelectorProps) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";
  const canUseDom = typeof document !== "undefined";

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left ${
          isDark ? "text-white" : "text-brand-950"
        }`}
      >
        <Users
          className={`h-4 w-4 shrink-0 ${isDark ? "text-white/50" : "text-brand-900/50"}`}
        />
        <span className="flex flex-col">
          <span
            className={`text-[10px] uppercase tracking-wide ${
              isDark ? "text-white/50" : "text-brand-900/50"
            }`}
          >
            {label}
          </span>
          <span className="text-sm">
            {value} {value === 1 ? "Adult" : "Adults"}
          </span>
        </span>
      </button>

      {canUseDom &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-brand-950/70 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ duration: 0.2 }}
                  className={`glass-sheen relative z-10 w-full max-w-sm rounded-3xl p-5 shadow-2xl ${
                    isDark ? "glass-strong" : "glass-light"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                        isDark ? "text-gold-300" : "text-gold-600"
                      }`}
                    >
                      {label}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                      className={`rounded-full p-1.5 transition ${
                        isDark
                          ? "text-white hover:bg-white/10"
                          : "text-brand-950 hover:bg-brand-900/10"
                      }`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p
                        className={`text-sm font-semibold ${isDark ? "text-white" : "text-brand-950"}`}
                      >
                        Adults
                      </p>
                      <p className={`text-xs ${isDark ? "text-white/50" : "text-brand-900/50"}`}>
                        Ages 13+
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => onChange(Math.max(min, value - 1))}
                        disabled={value <= min}
                        aria-label="Decrease adults"
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-30 ${
                          isDark
                            ? "border-white/25 text-white hover:bg-white/10"
                            : "border-brand-900/25 text-brand-950 hover:bg-brand-900/10"
                        }`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span
                        className={`w-5 text-center text-base font-semibold ${
                          isDark ? "text-white" : "text-brand-950"
                        }`}
                      >
                        {value}
                      </span>
                      <button
                        type="button"
                        onClick={() => onChange(Math.min(max, value + 1))}
                        disabled={value >= max}
                        aria-label="Increase adults"
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-30 ${
                          isDark
                            ? "border-white/25 text-white hover:bg-white/10"
                            : "border-brand-900/25 text-brand-950 hover:bg-brand-900/10"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-6 w-full rounded-full bg-gold-400 py-2.5 text-sm font-semibold text-brand-950 transition hover:bg-gold-300"
                  >
                    Done
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
