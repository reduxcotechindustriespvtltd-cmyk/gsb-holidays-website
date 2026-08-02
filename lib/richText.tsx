// Renders `**bold**` segments inside otherwise plain legal-copy strings.
export function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-brand-950">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export type LegalBlock = { type: "p"; text: string } | { type: "ul"; items: string[] };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="font-display text-lg font-semibold text-brand-950">{section.title}</h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-brand-900/75">
            {section.blocks.map((block, i) =>
              block.type === "ul" ? (
                <ul key={i} className="list-disc space-y-1.5 pl-5">
                  {block.items.map((item, j) => (
                    <li key={j}>{renderBold(item)}</li>
                  ))}
                </ul>
              ) : (
                <p key={i} className="whitespace-pre-line">
                  {renderBold(block.text)}
                </p>
              ),
            )}
          </div>
        </div>
      ))}
    </>
  );
}
