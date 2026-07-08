"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "./DatePicker";
import GuestSelector from "./GuestSelector";
import { addDays, toISODate } from "@/lib/date";

export default function BookingBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", toISODate(checkIn));
    if (checkOut) params.set("checkOut", toISODate(checkOut));
    params.set("guests", String(guests));
    router.push(`/packages?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-center sm:gap-1"
    >
      <div className="sm:border-r sm:border-white/10">
        <DatePicker label="Check-in" value={checkIn} onChange={setCheckIn} />
      </div>
      <div className="sm:border-r sm:border-white/10">
        <DatePicker
          label="Check-out"
          value={checkOut}
          onChange={setCheckOut}
          minDate={addDays(checkIn ?? new Date(), 1)}
        />
      </div>
      <GuestSelector value={guests} onChange={setGuests} />
      <button
        type="submit"
        className="rounded-xl bg-gold-400 px-5 py-2.5 text-sm font-semibold text-brand-950 transition hover:bg-gold-300"
      >
        Check Stays
      </button>
    </form>
  );
}
