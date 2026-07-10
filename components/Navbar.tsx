"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Tent, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`glass-sheen w-full max-w-6xl rounded-2xl transition-all duration-500 ${
          scrolled ? "nav-scrolled" : "glass"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400/90 text-brand-950">
              <Tent className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold tracking-wide">
              {SITE.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
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
            {NAV_LINKS.map((link) => (
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
