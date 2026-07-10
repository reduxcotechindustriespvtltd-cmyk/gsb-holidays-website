import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="relative flex h-[46vh] min-h-[320px] items-center justify-center overflow-hidden pt-20">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/75 via-brand-950/60 to-brand-950/90" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
          {eyebrow}
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-sm text-white/80 sm:text-base">{description}</p>
        )}
      </div>
    </section>
  );
}
