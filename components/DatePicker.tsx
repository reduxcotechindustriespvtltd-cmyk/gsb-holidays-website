"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { formatDate, isSameDay, startOfDay } from "@/lib/date";

type DatePickerProps = {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  variant?: "dark" | "light";
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function DatePicker({
  label,
  value,
  onChange,
  minDate,
  variant = "dark",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => {
    const base = value ?? minDate ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
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

  const min = minDate ? startOfDay(minDate) : startOfDay(new Date());
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = firstDay.getDay();

  const cells: (Date | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left ${
          isDark ? "text-white" : "text-brand-950"
        }`}
      >
        <Calendar
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
          <span className="text-sm">{value ? formatDate(value) : "Add date"}</span>
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

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setViewMonth(new Date(year, month - 1, 1))}
                      className={`rounded-full p-1.5 transition ${
                        isDark
                          ? "text-white hover:bg-white/10"
                          : "text-brand-950 hover:bg-brand-900/10"
                      }`}
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span
                      className={`text-sm font-semibold ${isDark ? "text-white" : "text-brand-950"}`}
                    >
                      {viewMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={() => setViewMonth(new Date(year, month + 1, 1))}
                      className={`rounded-full p-1.5 transition ${
                        isDark
                          ? "text-white hover:bg-white/10"
                          : "text-brand-950 hover:bg-brand-900/10"
                      }`}
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div
                    className={`mt-4 grid grid-cols-7 gap-1 text-center text-[11px] ${
                      isDark ? "text-white/50" : "text-brand-900/50"
                    }`}
                  >
                    {WEEKDAYS.map((w) => (
                      <span key={w}>{w}</span>
                    ))}
                  </div>

                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {cells.map((date, i) => {
                      if (!date) return <span key={`empty-${i}`} />;
                      const disabled = startOfDay(date) < min;
                      const selected = isSameDay(date, value);
                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          disabled={disabled}
                          onClick={() => {
                            onChange(date);
                            setOpen(false);
                          }}
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs transition ${
                            selected
                              ? "bg-gold-400 font-semibold text-brand-950"
                              : disabled
                                ? `cursor-not-allowed ${isDark ? "text-white/20" : "text-brand-900/20"}`
                                : isDark
                                  ? "text-white/85 hover:bg-white/10"
                                  : "text-brand-950 hover:bg-brand-900/10"
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
