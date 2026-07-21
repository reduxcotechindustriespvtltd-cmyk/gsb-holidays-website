"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { DESTINATIONS, NAV_LINKS, SITE } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setDestinationsOpen(false);
    setMobileDestinationsOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isPackagesPath = pathname === "/packages";

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`glass-sheen w-full max-w-6xl rounded-2xl transition-all duration-500 ${
          scrolled || open ? "nav-scrolled" : "glass"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <Image src="/logo-icon.png" alt="" fill sizes="36px" className="object-cover" />
            </span>
            <span className="font-display text-lg font-semibold tracking-wide">
              {SITE.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors ${
                pathname === "/" ? "text-gold-300" : "text-white/85 hover:text-gold-300"
              }`}
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setDestinationsOpen(true)}
              onMouseLeave={() => setDestinationsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDestinationsOpen((v) => !v)}
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
                  isPackagesPath ? "text-gold-300" : "text-white/85 hover:text-gold-300"
                }`}
              >
                Destinations
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${destinationsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {destinationsOpen && (
                // The visual gap below the button is `pt` on this outer box
                // (not a `mt` on the card) so the gap stays part of the
                // hoverable area — a margin gap is dead space the pointer
                // exits through, closing the menu before it reaches an item.
                <div className="absolute left-0 top-full z-50 w-52 pt-5">
                  <div
                    className="rounded-2xl border border-white/10 bg-brand-950 p-2"
                    style={{ boxShadow: "0 24px 48px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)" }}
                  >
                    {DESTINATIONS.map((dest) => (
                      <Link
                        key={dest.slug}
                        href={`/packages?location=${dest.slug}`}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-gold-300"
                      >
                        {dest.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-gold-300"
                    : "text-white/85 hover:text-gold-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-brand-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-300"
            >
              Book Now
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden flex flex-col gap-1 px-5 pb-5">
            <Link
              href="/"
              className={`rounded-xl px-3 py-2 text-sm font-medium ${
                pathname === "/" ? "bg-white/10 text-gold-300" : "text-white/85 hover:bg-white/10"
              }`}
            >
              Home
            </Link>

            <button
              type="button"
              onClick={() => setMobileDestinationsOpen((v) => !v)}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium ${
                isPackagesPath ? "bg-white/10 text-gold-300" : "text-white/85 hover:bg-white/10"
              }`}
            >
              Destinations
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileDestinationsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileDestinationsOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                {DESTINATIONS.map((dest) => (
                  <Link
                    key={dest.slug}
                    href={`/packages?location=${dest.slug}`}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10"
                  >
                    {dest.name}
                  </Link>
                ))}
              </div>
            )}

            {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-2 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-white/10 text-gold-300"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 rounded-full bg-gold-400 px-5 py-2 text-center text-sm font-semibold text-brand-950"
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
