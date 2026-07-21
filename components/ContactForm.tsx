"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import DatePicker from "./DatePicker";
import GuestSelector from "./GuestSelector";
import { addDays, toISODate } from "@/lib/date";
import { validateInquiry, type InquiryErrors } from "@/lib/validation";
import type { Package } from "@/lib/data";

type Status = "idle" | "loading" | "error";

export default function ContactForm({
  defaultPackage,
  packages,
}: {
  defaultPackage?: string;
  packages: Package[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [errors, setErrors] = useState<InquiryErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Capture the form element synchronously — `e.currentTarget` is only
    // valid during the event's dispatch phase and becomes null once we
    // resume after the `await` below, so reading it later throws.
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      ...Object.fromEntries(form.entries()),
      checkIn: checkIn ? toISODate(checkIn) : "",
      checkOut: checkOut ? toISODate(checkOut) : "",
      guests: String(guests),
    } as Record<string, string>;

    const fieldErrors = validateInquiry(payload);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        throw new Error("Request failed");
      }

      const selectedPackage = packages.find((pkg) => pkg.slug === payload.package);
      const params = new URLSearchParams({
        id: data.inquiryId,
        package: selectedPackage?.name ?? "Not selected",
        at: data.submittedAt,
      });
      router.push(`/contact/thank-you?${params.toString()}`);
    } catch (error) {
      console.error("Inquiry submission failed:", error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-1">
        <span className="mb-1.5 block text-xs font-medium text-brand-900/70">Full Name</span>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          className="w-full rounded-xl border border-brand-900/15 bg-white/70 px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-gold-500"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </label>
      <label className="sm:col-span-1">
        <span className="mb-1.5 block text-xs font-medium text-brand-900/70">Phone Number</span>
        <input
          name="phone"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="10-digit mobile number"
          className="w-full rounded-xl border border-brand-900/15 bg-white/70 px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-gold-500"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
      </label>
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-brand-900/70">Email Address</span>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-brand-900/15 bg-white/70 px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-gold-500"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
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
          <option value="" disabled>
            Select a package
          </option>
          {packages.map((pkg) => (
            <option key={pkg.slug} value={pkg.slug}>
              {pkg.name}
            </option>
          ))}
        </select>
        {errors.package && <p className="mt-1 text-xs text-red-600">{errors.package}</p>}
      </label>
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-brand-900/70">Message</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your trip..."
          className="w-full resize-none rounded-xl border border-brand-900/15 bg-white/70 px-4 py-2.5 text-sm text-brand-950 outline-none transition focus:border-gold-500"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
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

      {status === "error" && (
        <p className="text-sm font-medium text-red-600 sm:col-span-2">
          Something went wrong. Please try again or reach us on WhatsApp.
        </p>
      )}
    </form>
  );
}
