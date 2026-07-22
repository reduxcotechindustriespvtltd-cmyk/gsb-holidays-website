import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SocialIcon from "./SocialIcon";
import { SITE } from "@/lib/data";

// Instagram doesn't allow auto-fetching a public account's posts without a
// Business/Creator account linked to a Meta Developer app (access token +
// review). Until that's set up, this showcases the handle prominently with
// a follow CTA, using existing gallery photos as post-style tiles.
export default function InstagramShowcase({ images }: { images: string[] }) {
  const handle = SITE.social.instagram.split("/").filter(Boolean).pop() ?? "gsbholidays";
  const tiles = images.slice(0, 6);

  if (tiles.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:py-24">
      <Reveal>
        <SectionHeading
          eyebrow="Follow Along"
          title={`@${handle} on Instagram`}
          description="Real stays, real sunsets — straight from our guests' feeds."
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {tiles.map((src, i) => (
          <Reveal key={src} delay={i * 0.06}>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt="GSB Holidays on Instagram"
                fill
                sizes="(min-width: 768px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-brand-950/0 opacity-0 transition group-hover:bg-brand-950/50 group-hover:opacity-100">
                <SocialIcon kind="instagram" className="h-6 w-6 text-white" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex justify-center">
        <a
          href={SITE.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-brand-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          <SocialIcon kind="instagram" className="h-4 w-4" />
          Follow @{handle}
        </a>
      </Reveal>
    </section>
  );
}
