"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";
import DatePicker from "./DatePicker";
import GuestSelector from "./GuestSelector";
import { addDays, toISODate } from "@/lib/date";
import { PACKAGES } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({ defaultPackage }: { defaultPackage?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(form.entries()),
      checkIn: checkIn ? toISODate(checkIn) : "",
      checkOut: checkOut ? toISODate(checkOut) : "",
      guests: String(guests),
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      e.currentTarget.reset();
      setCheckIn(null);
      setCheckOut(null);
      setGuests(2);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-1">
        <span className="mb-1.5 block text-xs font-medium text-brand-900/70">Full Name</span>
        <input
          required
          name="name"
          type="text"
          placeholder="Your name"
          className="w-full rounded-xl border border-brand-900/15 bg-white/70 px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-gold-500"
        />
      </label>
      <label className="sm:col-span-1">
        <span className="mb-1.5 block text-xs font-medium text-brand-900/70">Phone Number</span>
        <input
          required
          name="phone"
          type="tel"
          placeholder="10-digit mobile number"
          className="w-full rounded-xl border border-brand-900/15 bg-white/70 px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-gold-500"
        />
      </label>
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-brand-900/70">Email Address</span>
        <input
          required
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-brand-900/15 bg-white/70 px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-gold-500"
        />
      </label>
      <div className="rounded-xl border border-brand-900/15 bg-white/70 transition focus-within:border-gold-500">
        <DatePicker label="Check-in" value={checkIn} onChange={setCheckIn} variant="light" />
      </div>
      <div className="rounded-xl border border-brand-900/15 bg-white/70 transition focus-within:border-gold-500">
        <DatePicker
          label="Check-out"
          value={checkOut}
          onChange={setCheckOut}
          minDate={addDays(checkIn ?? new Date(), 1)}
          variant="light"
        />
      </div>
      <div className="rounded-xl border border-brand-900/15 bg-white/70 transition focus-within:border-gold-500">
        <GuestSelector value={guests} onChange={setGuests} variant="light" />
      </div>
      <label>
        <span className="mb-1.5 block text-xs font-medium text-brand-900/70">Package</span>
        <select
          name="package"
          defaultValue={defaultPackage ?? ""}
          className="w-full rounded-xl border border-brand-900/15 bg-white/70 px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-gold-500"
        >
          <option value="">Not sure yet</option>
          {PACKAGES.map((pkg) => (
            <option key={pkg.slug} value={pkg.slug}>
              {pkg.name}
            </option>
          ))}
        </select>
      </label>
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-brand-900/70">Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your trip..."
          className="w-full resize-none rounded-xl border border-brand-900/15 bg-white/70 px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-gold-500"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4 transition group-hover:translate-x-1" />
        )}
        Send Inquiry
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-brand-700 sm:col-span-2">
          Thanks! We&apos;ve received your inquiry and will get back to you shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600 sm:col-span-2">
          Something went wrong. Please try again or reach us on WhatsApp.
        </p>
      )}
    </form>
  );
}
