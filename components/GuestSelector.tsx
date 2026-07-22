"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Users, X } from "lucide-react";

export type GuestCounts = {
  adults: number;
  kids: number;
  infants: number;
};

export const DEFAULT_GUESTS: GuestCounts = { adults: 2, kids: 0, infants: 0 };

type Tier = {
  key: keyof GuestCounts;
  title: string;
  subtitle: string;
  min: number;
};

const TIERS: Tier[] = [
  { key: "adults", title: "Adults", subtitle: "Ages 10+", min: 1 },
  { key: "kids", title: "Kids", subtitle: "Ages 5-10", min: 0 },
  { key: "infants", title: "Infants", subtitle: "Ages 0-5", min: 0 },
];

const MAX_PER_TIER = 10;

export function guestSummary(value: GuestCounts) {
  const parts: string[] = [`${value.adults} ${value.adults === 1 ? "Adult" : "Adults"}`];
  if (value.kids > 0) parts.push(`${value.kids} ${value.kids === 1 ? "Kid" : "Kids"}`);
  if (value.infants > 0) {
    parts.push(`${value.infants} ${value.infants === 1 ? "Infant" : "Infants"}`);
  }
  return parts.join(", ");
}

type GuestSelectorProps = {
  label?: string;
  value: GuestCounts;
  onChange: (v: GuestCounts) => void;
  variant?: "dark" | "light";
};

export default function GuestSelector({
  label = "Guests",
  value,
  onChange,
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

  function update(key: keyof GuestCounts, delta: number, min: number) {
    const next = Math.max(min, Math.min(MAX_PER_TIER, value[key] + delta));
    onChange({ ...value, [key]: next });
  }

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
          <span className="truncate text-sm">{guestSummary(value)}</span>
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

                  <div className="mt-5 space-y-5">
                    {TIERS.map((tier) => (
                      <div key={tier.key} className="flex items-center justify-between">
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              isDark ? "text-white" : "text-brand-950"
                            }`}
                          >
                            {tier.title}
                          </p>
                          <p className={`text-xs ${isDark ? "text-white/50" : "text-brand-900/50"}`}>
                            {tier.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => update(tier.key, -1, tier.min)}
                            disabled={value[tier.key] <= tier.min}
                            aria-label={`Decrease ${tier.title.toLowerCase()}`}
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
                            {value[tier.key]}
                          </span>
                          <button
                            type="button"
                            onClick={() => update(tier.key, 1, tier.min)}
                            disabled={value[tier.key] >= MAX_PER_TIER}
                            aria-label={`Increase ${tier.title.toLowerCase()}`}
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
                    ))}
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
