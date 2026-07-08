type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span
        className={`text-xs font-semibold uppercase tracking-[0.25em] ${
          light ? "text-gold-300" : "text-gold-600"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 font-display text-3xl font-semibold sm:text-4xl ${
          light ? "text-white" : "text-brand-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm sm:text-base ${
            light ? "text-white/75" : "text-brand-900/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
