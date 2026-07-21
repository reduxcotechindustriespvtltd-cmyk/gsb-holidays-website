import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
      <footer className="relative overflow-hidden border-t border-white/20 bg-brand-950 text-white">
        <div
          className="pointer-events-none absolute top-0 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl"
          aria-hidden="true"
        />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="glass-sheen glass rounded-3xl p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link href="/" className="inline-flex items-center">
                <span className="inline-flex items-center rounded-xl bg-white/95 px-3 py-2 shadow-sm">
                  <Image
                    src="/logo-full.png"
                    alt={SITE.name}
                    width={808}
                    height={282}
                    className="h-11 w-auto"
                  />
                </span>
              </Link>
              <p className="mt-4 max-w-sm text-sm text-white/70">
                {SITE.footerDescription}
              </p>
              <div className="mt-5 flex gap-3">
                {(["instagram", "facebook", "whatsapp"] as const).map((kind) => (
                  <a
                    key={kind}
                    href={
                      kind === "instagram"
                        ? SITE.social.instagram
                        : kind === "facebook"
                          ? SITE.social.facebook
                          : SITE.social.whatsapp
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-border-glow flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:text-gold-300"
                    aria-label={kind}
                  >
                    <SocialIcon kind={kind} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold-300">
                Explore
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition hover:text-gold-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/terms" className="transition hover:text-gold-300">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition hover:text-gold-300">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cancellation-policy"
                    className="transition hover:text-gold-300"
                  >
                    Cancellation Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold-300">
                Get in Touch
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <span>{SITE.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-gold-300" />
                  <span className="flex flex-col">
                    <a href={`tel:${SITE.phone}`} className="hover:text-gold-300">
                      {SITE.phone}
                    </a>
                    <a href={`tel:${SITE.phoneSecondary}`} className="hover:text-gold-300">
                      {SITE.phoneSecondary}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-gold-300" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-gold-300">
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/10 pt-6 text-center text-xs text-white/50">
            <span>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </span>
            <span>
              Developed by{" "}
              <a
                href="https://grayfoxtechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/70 transition hover:text-gold-300"
              >
                GrayFoxTech
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
