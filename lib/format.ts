/** Title-cases an admin-entered price unit (e.g. "per night" -> "Per Night") for display next to a price. Falls back to "Per Person" when empty, matching the site's original default. */
export function formatPriceUnit(priceUnit: string | undefined | null) {
  const trimmed = priceUnit?.trim();
  if (!trimmed) return "Per Person";
  return trimmed
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
